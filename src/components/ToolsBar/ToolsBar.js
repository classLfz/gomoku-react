import React from 'react';

// styles
import './styles.css';

export default class ToolsBar extends React.Component {
  constructor(props) {
    super(props);

    this.restart = this.restart.bind(this);
  }

  /**
   * 重新开启游戏
   * @param {Object} event 点击事件
   */
  restart(event) {
    const mode = this.refs.modeSelect.value;
    const first = this.refs.firstSelect.value;
    this.props.onRestart({
      mode: mode,
      first: first
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className='toolsBar'>
        <div>
          <h3>模式：</h3>
          <select
            ref="modeSelect"
            className='select'>
            <option value="pve">人机对战</option>
            <option value="pvp">双人对战</option>
          </select>
        </div>

        <div>
          <h3>先手：</h3>
          <select
            ref="firstSelect"
            className='select'>
            <option value="human">玩家先行</option>
            <option value="computer">电脑先行</option>
          </select>
        </div>

        <button className='btn' onClick={this.restart}>开始游戏</button>
      </div>
    );
  }
}