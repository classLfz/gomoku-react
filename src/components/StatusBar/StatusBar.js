import React from 'react';

// styles
import './styles.css';

export default class StatusBar extends React.Component {
  render() {
    const mode = this.props.mode;
    if (mode === 'pvp') {
      const itemClass = this.props.activeUser === 'black' ? 'black' : 'white';

      return (
        <div className='statusBar'>
          <h3>无禁手</h3>

          <div className='players'>
            下棋方：
            <div className={itemClass}></div>
          </div>
        </div>
      )
    }
    const humanClass = this.props.first === 'human' ? 'black' : 'white';
    const computerClass = this.props.first === 'computer' ? 'black' : 'white';

    return (
      <div className='statusBar'>
        <h3>无禁手</h3>

        <div className='players'>
          玩家：
          <div className={humanClass}></div>
          电脑：
          <div className={computerClass}></div>
        </div>
      </div>
    );
  }
}