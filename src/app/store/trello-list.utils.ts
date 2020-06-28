export const addCard = (state, payload) => {
  const { listID, newCard } = payload;

  return {
    lists: state.lists.map(list => {
      if (list.id === listID) {
        return {
          ...list,
          cards: [...list.cards, newCard]
        };
      }

      return list;
    })
  };
};

export const deleteCard = (state, payload) => {
  const { listID, cardID } = payload;
  const newState = deepCopy(state);
  const { lists } = newState;

  const listIndex = lists.findIndex(list => list.id === listID);
  const cardIndex = lists[listIndex].cards.findIndex(card => card.id === cardID);
  lists[listIndex].cards.splice(cardIndex, 1);

  return newState;
};

export const updateCard = (state, payload) => {
  const { listID, cardID, title, text } = payload;
  const newState = deepCopy(state);
  const { lists } = newState;

  const listIndex = lists.findIndex(list => list.id === listID);
  const cardIndex = lists[listIndex].cards.findIndex(card => card.id === cardID);
  lists[listIndex].cards[cardIndex] = { id: cardID, title, text };
  return newState;
};

export const dragCard = (state, payload) => {
  const newState = deepCopy(state);
  const { lists } = newState;
  const { droppableIdStart, droppableIdEnd } = payload;

  if (droppableIdStart === droppableIdEnd) {
    dragInsideSameList(lists, payload);
  } else {
    dragBetweenLists(lists, payload);
  }

  return newState;
};

const dragInsideSameList = (lists, payload) => {
  const {
    droppableIdStart,
    droppableIndexStart,
    droppableIndexEnd
  } = payload;

  const list = getListByID(lists, droppableIdStart);
  const card = list.cards.splice(droppableIndexStart, 1);
  list.cards.splice(droppableIndexEnd, 0, ...card);
};

const dragBetweenLists = (lists, payload) => {
  const {
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd
  } = payload;

  const listStart = getListByID(lists, droppableIdStart);
  const card = listStart.cards.splice(droppableIndexStart, 1);
  const listEnd = getListByID(lists, droppableIdEnd);
  listEnd.cards.splice(droppableIndexEnd, 0, ...card);
};

const getListByID = (lists, listID) => {
  return lists.find(list => listID === list.id);
};

const deepCopy = (object) => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  const newObject = Array.isArray(object) ? [] : {};
  const keys = Object.keys(object);

  for (const key of keys) {
    const value = object[key];
    const isObject = (typeof value === 'object' && value !== null);
    newObject[key] = isObject ? deepCopy(value) : value;
  }

  return newObject;
};
