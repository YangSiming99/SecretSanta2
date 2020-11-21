const express = require('express');
const path = require('path');

const app = express();

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors:{
    origin: 'http://localhost:3000',
    credentials: true
  }
})

let roomList = [
  {
    name: 'room1',
    people: [
      'person1',
      'person2',
      'person3',
    ]
  },
  {
    name: 'room2',
    people: [
      'person4',
      'person5',
      'person6',
    ]
  }
];

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
  console.log("hi there")

  socket.on('get rooms', (data) => {
    socket.emit('send rooms', { roomList })
  })

  socket.on('create room', data => {
    console.log("poggers ", data)
    roomList.push({
      name: data.roomName,
      people: [
        data.hostName
      ]
    })
    io.emit('send rooms', { roomList })
  })

  function sendRooms() {
    socket.emit('send rooms', { roomList })
    console.log("hi")
  }
})

const port = process.env.PORT || 5000;
const socketPort = 8000;
io.listen(socketPort);
app.listen(port);

console.log(`listening on port ${port}`);