import React from 'react';

// styles
import styles from './styles.css';

export default class ToolsBar extends React.Component {
  constructor(props) {
    super(props);

    this.restart = this.restart.bind(this);
  }

  restart(event) {
    const model = this.refs.modelSelect.value;
    const first = this.refs.firstSelect.value;
    this.props.onRestart({
      model: model,
      first: first
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className={styles.toolsBar}>
        <div>
          <h3>模式：</h3>
          <select
            ref="modelSelect"
            className={styles.select}>
            <option value="pve">人机对战</option>
            <option value="pvp">双人对战</option>
          </select>
        </div>

        <div>
          <h3>先手：</h3>
          <select
            ref="firstSelect"
            className={styles.select}>
            <option value="human">玩家先行</option>
            <option value="computer">电脑先行</option>
          </select>
        </div>

        <button className={styles.btn} onClick={this.restart}>开始游戏</button>
      </div>
    );
  }
}