import React, { useReducer, useState, useEffect, useContext } from 'react';
import { Socket } from 'socket.io';
import SocketContext from '../../socketContext';

const initialState = {
  roomName : "",
  hostName : ""
}

const reducer = (state, action) => {
  switch(action.field){
    case "roomName" : return {...state, roomName: action.value};
    case "hostName" : return {...state, hostName: action.value};
  }
}

const CreateRoom = ({setCreateWindow}) => {
  const [info, dispatchInfo] = useReducer(reducer, initialState);
  const socket = useContext(SocketContext);

  const confirm = () => {
    socket.emit('create room', {...info})
    setCreateWindow(false);
  }

  return ( 
    <div>
      <h1>Create Room</h1>
      <label htmlFor={"roomName"}>Room Name: </label>
      <br />
      <input 
        type="text" 
        id={"roomName"}
        onChange={e => dispatchInfo({value: e.target.value, field: 'roomName'})}
      />
      <br />
      <label htmlFor={"hostName"}>Host Name: </label>
      <br />
      <input 
        type="text" 
        id={"hostName"}
        onChange={e => dispatchInfo({value: e.target.value, field: 'hostName'})}
      />
      <br />
      <button onClick={confirm}>
        Confirm
      </button>
    </div>
   );
}
 
export default CreateRoom;