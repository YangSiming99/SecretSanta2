import React, { useState, useEffect, useContext } from 'react';

import CreateRoom from './createRoom/createRoom';

import SocketContext from '../socketContext';
import RoomContext from '../roomContext';

const Rooms = () => {
  const socket = useContext(SocketContext);
  const {joinedRoom} = useContext(RoomContext);
  const [roomList, setRoomList] = useState([]);
  const [createWindow, setCreateWindow] = useState(false);
  const [roomName, setRoomName] = useState();
  
  useEffect(() => {
    socket.emit('get rooms');
  }, [])

  socket.on('send rooms',  data => {
    setRoomList(data.roomList);
  });

  const openWindow = (roomName) => {
    setRoomName(roomName);
    setCreateWindow(!createWindow)
  }

  return ( 
    <div>
      <table>
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Host Name</th>
            <th>Participants</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {roomList.map((val, key) => (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.people[0].name}</td>
              <td>{val.people.length}</td>
              <td>
                <button 
                  disabled={joinedRoom === '' ? false : true} 
                  onClick={() => openWindow(val.name)}>
                    Join
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
        disabled={joinedRoom === '' ? false : true } 
        onClick={() => openWindow()}>
          Create New
      </button>

      {createWindow
        ? <CreateRoom roomName={roomName} setCreateWindow={setCreateWindow} />
        : <></>
      }
    </div>
   );
}
 
export default Rooms;