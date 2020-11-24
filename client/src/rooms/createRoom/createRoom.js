import React, { useReducer, useState, useEffect, useContext } from 'react';
import SocketContext from '../../socketContext';
import RoomContext from '../../roomContext';

const reducer = (state, action) => {
  switch(action.field){
    case "roomName" : return {...state, roomName: action.value};
    case "Name" : return {...state, Name: action.value};
    case "giftAmount" : return {...state, giftAmount: action.value};
  }
}

const CreateRoom = ({roomName, setCreateWindow}) => {

  const initialState = {
    roomName : roomName === undefined ? "" : roomName,
    Name : "",
    giftAmount: "1"
  }

  const [info, dispatchInfo] = useReducer(reducer, initialState);
  const socket = useContext(SocketContext);
  const {joinedRoom, setJoinedRoom, setHost} = useContext(RoomContext);

  const confirm = () => {
    if(roomName === undefined){
      socket.emit('create room', {...info})
      setJoinedRoom(info.roomName);
      setHost(true);
      setCreateWindow(false);
    }
    else {
      socket.emit('join room', {...info})
      setJoinedRoom(info.roomName)
      setCreateWindow(false)
    }
  }

  return ( 
    <div>
      {roomName === undefined
        ? <h1>Create Room</h1>
        : <h1>Join Room</h1>
      }
      {roomName === undefined
        ? (      
        <div>
          <label htmlFor={"roomName"}>Room Name: </label>
          <br />
          <input 
            type="text" 
            id={"roomName"}
            onChange={e => dispatchInfo({value: e.target.value, field: 'roomName'})}
          />
        <br />
        </div>
        )
        : <></>
      }
      <div>
      <label htmlFor={"Name"}>Name: </label>
      <br />
      <input 
        type="text" 
        id={"Name"}
        onChange={e => dispatchInfo({value: e.target.value, field: 'Name'})}
      />
      <br />
      </div>
      <div>
      <label htmlFor={"giftAmount"}># of Gifts </label>
      <br />
      <input 
        type="text" 
        id={"giftAmount"}
        value={info.giftAmount}
        onChange={e => dispatchInfo({value: e.target.value, field: 'giftAmount'})}
      />
      <br />
      </div>
      <button onClick={confirm}>
        Confirm
      </button>
    </div>
   );
}
 
export default CreateRoom;