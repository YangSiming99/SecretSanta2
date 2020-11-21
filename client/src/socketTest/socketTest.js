import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const SocketTest = () => {
  const [socket, setSocket] = useState()
  useEffect(() => {
    setSocket(io('http://localhost:8000', {
      withCredentials: true
    }));
  }, [])
  
  return ( 
    <div>
      <h1>SOCKET TEST</h1>
    </div>
   );
}
 
export default SocketTest;