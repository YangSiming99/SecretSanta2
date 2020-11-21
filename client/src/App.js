import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

import SocketTest from './socketTest/socketTest';
import Rooms from './rooms/rooms';

import  { SocketProvider } from './socketContext';

const socket = io()

const App = () => {
  return(
    <SocketProvider value={socket}>
      <Rooms />
    </SocketProvider>
  )
}

export default App;

