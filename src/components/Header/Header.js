import React from 'react';
import styles from './styles.css';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.toolbar}>
        <h1>Gomoku</h1>

        <div className={styles.tools}>
          <h3>当前：{this.props.activeUser === 'white' ? '白棋' : '黑棋'}</h3>
        </div>
      </div>
    );
  }
}