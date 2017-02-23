import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import ItemList from '../components/ItemList/ItemList';
import StatusBar from '../components/StatusBar/StatusBar';
import ToolsBar from '../components/ToolsBar/ToolsBar';

import { initGame, playGame } from '../actions';

// styles
import styles from './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    window.isOver = false;
    this.play = this.play.bind(this);
  }

  play(coord) {
    const { dispatch } = this.props;
    if (isOver) {
      return;
    }
    return dispatch(playGame(coord));
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
            first={gameState.first}/>
          <div className={styles.chessboard}>
            {itemList}
          </div>
          <ToolsBar onRestart={(nextStatus) => dispatch(initGame(nextStatus))}/>
        </div>
      </div>
    )
  }
}

// App.PropTypes = {
//   model: PropTypes.string.isRequired,
//   first: PropTypes.string.isRequired
// };

function mapStateToProps(state) {
  return {
    gameState: state.gameState
  };
}

export default connect(mapStateToProps)(App);