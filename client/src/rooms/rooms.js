import React, { useState, useEffect, useContext } from 'react';

import CreateRoom from './createRoom/createRoom';

import SocketContext from '../socketContext';

const Rooms = () => {
  const socket = useContext(SocketContext);
  const [roomList, setRoomList] = useState([]);
  const [createWindow, setCreateWindow] = useState(false);
  useEffect(() => {
    socket.emit('get rooms');
  }, [])

  socket.on('send rooms',  data => {
    console.log("hello")
    setRoomList(data.roomList);
  })

  return ( 
    <div>
      <table>
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Host</th>
            <th>Participants</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {roomList.map((val, key) => (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.people[0]}</td>
              <td>{val.people.length}</td>
              <td><button>Join</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setCreateWindow(!createWindow)}>Create New</button>
      {createWindow
        ? <CreateRoom setCreateWindow={setCreateWindow} />
        : <></>
      }
    </div>
   );
}
 
export default Rooms;