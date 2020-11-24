import React, { useState, useContext, useEffect } from 'react';

import Results from '../results/results';

import SocketContext from '../socketContext';
import RoomContext from '../roomContext';

const RoomList = () => {
  const socket = useContext(SocketContext);
  const {joinedRoom, setJoinedRoom, host} = useContext(RoomContext);
  const [roomInfo, setRoominfo] = useState({name: '', people: []});
  const [results, setResults] = useState();

  useEffect(() => {
    socket.emit('get people', {joinedRoom})
  }, [])

  socket.on('send people', data => {
    setRoominfo(data.roomList)
  })

  socket.on('results', data => {
    // console.log(data)
    if(results === undefined){
      setResults(data.recepient)
    }
  })

  const startRandomizer = () => {
    socket.emit('start randomizer', {joinedRoom})
  }

  return ( 
    <div>
      <h1>RoomList</h1>
      <h2>{roomInfo.name}</h2>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Gift Amount</td>
          </tr>
        </thead>
        <tbody>
          {
            roomInfo.people.map((val, key) => (
              <tr key={key}>
                <td>{val.name}</td>
                <td>{val.giftAmount}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {host ? <button onClick={()=>startRandomizer()}>Start</button> : <></>}
      {results !== undefined ? <Results results={results}/> :<></>}
    </div> 
  );
}
 
export default RoomList;