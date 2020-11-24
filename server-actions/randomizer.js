let test = [
  {name: 'test1', giftAmount: 1, socketId: "test1" },
  {name: 'test2', giftAmount: 2, socketId: "test2" },
  {name: 'test3', giftAmount: 2, socketId: "test3" },
  {name: 'test4', giftAmount: 1, socketId: "test4" },
]

const mainRandomizerFunc = (list) => {
  let good = false;
  let count = 0;
  while (!good) {
    let rand = randomizer(list);
    if(rand.tempRecList.indexOf(undefined) === -1){
      return rand.formattedList
    }
    count ++;
    if(count > 5){
      throw "this is impossible";
    }
  }
}

const randomizer = (list) => {
// {name '' socketid '' receiver []}
  let {sender, receiver}= createList(list);
  let tempSenderList = [];
  let tempRecList = [];
  let formattedList = {};
  let validList = false;
  let count = 0;
  for(let i in sender){
    let validReceivers = receiver.filter((val) => val !== sender[i].name);
    let randInt = getRandomInt(validReceivers.length)
    let randomRecepient = validReceivers[randInt];
    if(tempSenderList.indexOf(sender[i].name) === -1){
      tempSenderList.push(sender[i].name);
      tempRecList.push(randomRecepient)
      formattedList[sender[i].name] = {
        name: sender[i].name,
        socketId: sender[i].socketId,
        receiver: [randomRecepient]
      }
      receiver.splice(receiver.indexOf(randomRecepient), 1);
    }
    else{
      tempRecList.push(randomRecepient)
      formattedList[sender[i].name].receiver.push(randomRecepient)
      receiver.splice(receiver.indexOf(randomRecepient), 1)
    }
  }
  if(count === 5) {
    validList = true;
  }
  return { formattedList , tempRecList };
}

const createList = (list) => {
  let format = {sender: [], receiver: []};
  for(let i in list){
    for(let j = 0; j < list[i].giftAmount; j++){
      format.sender.push({
        name: list[i].name,
        socketId: list[i].socketId
      })
      format.receiver.push(list[i].name)
    } 
  }
  return format
}

const getRandomInt = (max) =>{
  return Math.floor(Math.random() * max);
}

//mainRandomizerFunc(test)

module.exports = {
  mainRandomizerFunc
}