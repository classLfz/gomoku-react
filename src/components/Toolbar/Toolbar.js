import React from 'react';
import styles from './styles.css';

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.restart = this.restart.bind(this);
  }

  restart(event) {
    // console.log(this.props);
    this.props.onRestart();
    event.preventDefault();
  }

  render() {
    return (
      <div className={styles.toolbar}>
        <h1>Gomoku</h1>

        <div className={styles.tools}>
          <button className={styles.btn} onClick={this.restart}>重新开始</button>
          <h3>当前：{this.props.activeUser === 'white' ? '白棋' : '黑棋'}</h3>
        </div>
      </div>
    );
  }
}