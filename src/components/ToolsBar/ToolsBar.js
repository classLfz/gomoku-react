import React from 'react';

// styles
import styles from './styles.css';

export default class ToolsBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleFirstChange = this.handleFirstChange.bind(this);
    this.restart = this.restart.bind(this);
  }

  handleModelChange(event) {
    this.props.onModelChange(event.target.value);
    event.preventDefault();
  }

  handleFirstChange(event) {
    this.props.onFirstChange(event.target.value);
    event.preventDefault();
  }

  restart(event) {
    this.props.onRestart();
    event.preventDefault();
  }

  render() {
    return (
      <div className={styles.toolsBar}>
        <div>
          <h3>模式：</h3>
          <select
            className={styles.select}
            value={this.props.model}
            onChange={this.handleModelChange}>
            <option value="pve">人机对战</option>
            <option value="pvp">双人对战</option>
          </select>
        </div>

        <div>
          <h3>先手：</h3>
          <select
            className={styles.select}
            value={this.props.first}
            onChange={this.handleFirstChange}>
            <option value="human">玩家先行</option>
            <option value="computer">电脑先行</option>
          </select>
        </div>

        <button className={styles.btn} onClick={this.restart}>开始游戏</button>
      </div>
    );
  }
}