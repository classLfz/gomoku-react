import React from 'react';
import './styles.css';

export default class Notification extends React.Component {
  render() {
    const notification = !this.props.gameOver ?
      (<div styles="display: none;"></div>) :
      (<div className='notificationWrapper'>
        <div className='notificationBg'></div>
        <div className='notificationContent'>
          <h1>游戏结束!</h1>
          <h3>胜利方为：{this.props.winner === 'black' ? '执黑方' : '执白方'}</h3>
        </div>
      </div>);

    return notification;
  }
}