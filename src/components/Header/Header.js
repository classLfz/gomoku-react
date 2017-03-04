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
          <h3>Made by classlfz</h3>
        </div>
      </div>
    );
  }
}