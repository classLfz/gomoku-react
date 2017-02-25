import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import ItemList from '../components/ItemList/ItemList';
import StatusBar from '../components/StatusBar/StatusBar';
import ToolsBar from '../components/ToolsBar/ToolsBar';

import { initGame, playGame } from '../actions';

// styles
import styles from './App.css';

// AI
import Footprint from './Footprint';

class App extends Component {
  constructor(props) {
    super(props);
    window.isOver = false;
    this.play = this.play.bind(this);
  }

  // 下棋，派遣修改gameState
  play(coord) {
    const { dispatch } = this.props;
    if (isOver) {
      return;
    }
    return dispatch(playGame(coord));
  }

  // 每次重新渲染以后，判断是否需要ai下棋
  componentDidUpdate() {
    if (window.isOver) {
      return;
    }
    const { dispatch, gameState } = this.props;
    const model = gameState.model;
    const first = gameState.first;
    const activeUser = gameState.activeUser;
    const listArray = gameState.listArray;
    if (model === 'pvp') {
      return;
    }
    const isAiRound = ((first === 'human' && activeUser === 'white') || (first === 'computer' && activeUser === 'black'));
    if (isAiRound) {
      // ai下棋
      let coord = Footprint(listArray, activeUser);
      return dispatch(playGame(coord));
    }
  }

  render() {
    // Injectd by connect() call:
    const { dispatch, gameState } = this.props;
    const itemList = gameState.listArray.map((item, index) =>
      <div key={index}>
        <ItemList list={item} onClick={coord => this.play(coord)} listNumber={index}/>
      </div>
    );

    return (
      <div className={styles.container}>
        <Header activeUser={gameState.activeUser}/>
        <div className={styles.main}>
          <StatusBar
            model={gameState.model}
            first={gameState.first}
            activeUser={gameState.activeUser}
            />
          <div className={styles.chessboard}>
            {itemList}
          </div>
          <ToolsBar onRestart={(nextStatus) => dispatch(initGame(nextStatus))}/>
        </div>
      </div>
    )
  }
}

App.PropTypes = {
  gameState: PropTypes.objectOf(PropTypes.shape({
    listArray: PropTypes.arrayOf(PropTypes.array).isRequired,
    model: PropTypes.string.isRequired,
    first: PropTypes.string.isRequired,
    activeUser: PropTypes.string.isRequired
  })).isRequired
};

function mapStateToProps(state) {
  return {
    gameState: state.gameState
  };
}

export default connect(mapStateToProps)(App);