const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);

const rooms = require('./server-actions/rooms');
const rng = require('./server-actions/randomizer');

const io = require('socket.io')(server, {
  cors:{
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"]
  }
})

app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/example', (req, res) => {
  res.json({message: "this was sent from the server"});
});

app.get('/api/rooms', (req, res) => {
  res.json({rooms: roomList});
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'))
});

io.on('connection', socket => {
  console.log('new connection started', socket.id)

  socket.on('get rooms', (data) => {
    let roomList = rooms.roomList
    socket.emit('send rooms', { roomList })
  })

  socket.on('create room', data => {
    console.log("poggers ", data)
    rooms.roomList.push({
      name: data.roomName,
      people: [{
        name: data.Name,
        giftAmount: Number(data.giftAmount),
        socketId: socket.id
      }]
    })
    socket.join(data.roomName);
    let roomList = rooms.roomList;
    io.emit('send rooms', { roomList })
  })

  socket.on('join room', data => {
    let roomPos = rooms.findRoom(data.roomName);
    rooms.roomList[roomPos].people.push({
      name: data.Name,
      giftAmount: Number(data.giftAmount),
      socketId: socket.id
    });
    socket.join(data.roomName);
    let roomList = rooms.roomList;
    io.emit('send rooms', { roomList })
  })

  socket.on('get people', data => {
    console.log(data)
    let roomPos = rooms.findRoom(data.joinedRoom);
    let roomList = rooms.roomList[roomPos]
    io.to(data.joinedRoom).emit("send people", {roomList})
  })

  socket.on('start randomizer', data => {
    console.log(data)
    let roomPos = rooms.findRoom(data.joinedRoom);
    try{
    let rngList = rng.mainRandomizerFunc(rooms.roomList[roomPos].people);
      for(let key in rngList){
        let recepient = rngList[key].receiver
        io.to(rngList[key].socketId).emit("results", {recepient})
      }
    }
    catch(e){
      console.log(e)
    }
  })


  socket.on('disconnect', data => {
    console.log('disconnect', socket.id)
    //TODO: Remove person from room
  })

  // setInterval(() => {
  //   console.log(rooms.roomList
  //     )
  // }, 3000)
})

const port = process.env.PORT || 5000;
const socketPort = 8000;
io.listen(socketPort);
server.listen(port);

console.log(`listening on port ${port}`);