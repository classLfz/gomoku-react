import { combineReducers } from 'redux';

import {
  INIT_GAME,
  PLAY_GAME,
  END_GAME
} from '../actions';

import Justicer from '../components/Justicer';

// 初始化状态
let initialGameState = {
  listArray: initialListArray(),
  activeUser: 'black',
  mode: 'pve',
  first: 'human',
  winner: '',
  gameOver: false
};

// 初始化数组
function initialListArray() {
  let listArray = new Array;
  for (let i = 0; i < 19; i++) {
    let subList = new Array;
    for (var j = 0; j < 19; j++) {
      let piece = {
        piece: 'none'
      };
      subList.push(piece);
    }
    listArray.push(subList);
  }

  return listArray;
}

// 下棋
function play(state, coord) {
  let x = coord.x;
  let y = coord.y;
  state.listArray[x][y]['piece'] = state.activeUser;
  state.activeUser = state.activeUser === 'black' ? 'white' : 'black';

  return state;
}

// 判断输赢
function justice(state, coord) {
  let gameOver = Justicer({
    x: coord.x,
    y: coord.y
  }, state.activeUser, state.listArray);

  return {
    gameOver: gameOver,
    winner: state.activeUser
  };
}

// 初始化
function init(state, nextStatus) {
  state.mode = nextStatus.mode;
  state.first = nextStatus.first;
  state.activeUser = 'black';
  state.listArray = initialListArray();
  state.gameOver = false;
  state.winner = '';
  return state;
}

function gameState(state = initialGameState, action) {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case INIT_GAME:
      newState = init(newState, action.nextStatus);
      return newState;
      break;
    case PLAY_GAME:
      let result = justice(newState, action.coord);
      if (result.gameOver) {
        newState.gameOver = result.gameOver;
        newState.winner = result.winner;
      }
      newState = play(newState, action.coord);
      return newState;
      break;
    case END_GAME:
      newState.gameOver = true;
      return newState;
      break;
    default:
      return state;
  }
}

const gomokuApp = combineReducers({
  gameState
});

export default gomokuApp;