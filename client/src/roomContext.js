import React from 'react';

const RoomContext = React.createContext();

export const RoomProvider = RoomContext.Provider;
export const RoomConsumer = RoomContext.Consumer;

export default RoomContext;