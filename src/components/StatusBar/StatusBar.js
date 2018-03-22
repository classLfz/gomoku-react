import React from 'react';

// styles
import styles from './styles.css';

export default class StatusBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const mode = this.props.mode;
    if (mode === 'pvp') {
      const itemClass = this.props.activeUser === 'black' ? styles.black : styles.white;

      return (
        <div className={styles.statusBar}>
          <h3>无禁手</h3>

          <div className={styles.players}>
            下棋方：
            <div className={itemClass}></div>
          </div>
        </div>
      )
    }
    const humanClass = this.props.first === 'human' ? styles.black : styles.white;
    const computerClass = this.props.first === 'computer' ? styles.black : styles.white;

    return (
      <div className={styles.statusBar}>
        <h3>无禁手</h3>

        <div className={styles.players}>
          玩家：
          <div className={humanClass}></div>
          电脑：
          <div className={computerClass}></div>
        </div>
      </div>
    );
  }
}