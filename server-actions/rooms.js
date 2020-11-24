let roomList = []

const findRoom = (roomName) => {
  for(let i in roomList){
    if(roomList[i].name === roomName){
      return i;
    }
  }
  return 'does not exist';
}

module.exports = {
  roomList,
  findRoom
}