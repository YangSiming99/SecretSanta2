import React, { useState, useMemo } from 'react';
import io from 'socket.io-client';
import './App.css';

import SocketTest from './socketTest/socketTest';
import Rooms from './rooms/rooms';
import RoomList from './roomList/roomList';

import { SocketProvider } from './socketContext';
import { RoomProvider } from './roomContext'; 

const socket = io()

const App = () => {
  const [joinedRoom, setJoinedRoom] = useState('');
  const [host, setHost] = useState(false);

  const roomValue = useMemo(() => ({
    joinedRoom,
    setJoinedRoom,
    host,
    setHost
  }), [joinedRoom])

  return(
    <SocketProvider value={socket}>
      <RoomProvider value={roomValue}>
        <Rooms />
        {joinedRoom === ''
          ? <></>
          : <RoomList />
        }
      </RoomProvider>
    </SocketProvider>
  )
}

export default App;

