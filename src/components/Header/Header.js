import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

import { endGame } from '../../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countNum: 60,
      count: 60,
      countId: 0
    };
  }

  /**
   * 读秒
   */
  counting() {
    if (this.props.gameOver) {
      this.setState({count: this.state.countNum});
      return;
    }
    if (this.state.count <= 0) {
      this.props.dispatch(endGame())
    }
    this.state.countId = setTimeout(() => {
      let count = this.state.count - 1;
      this.setState({count: count});
      this.counting();
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeUser !== this.props.activeUser ||
     prevProps.mode !== this.props.mode) {
      clearTimeout(this.state.countId);
      this.setState({count: this.state.countNum});
      this.counting();
    }
  }

  render() {
    const { activeUser, mode, gameOver } = this.props;
    const countdown = activeUser === 'black' ? '黑方' : '白方';
    let countdownEl;
    if (!gameOver) {
      countdownEl = (<div className={this.state.count <= 10 ? styles.danger : ''}>
        <span>{countdown}</span>读秒：
        <span>
          {this.state.count}
        </span>秒
      </div>);
    } else {
      countdownEl = (<span></span>);
    }
    return (
      <div className={styles.toolbar}>
        <h1>Gomoku</h1>
        {countdownEl}
        <div className={styles.tools}>
          <h3>Made by classlfz</h3>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeUser: state.gameState.activeUser,
    mode: state.gameState.mode,
    gameOver: state.gameState.gameOver
  }
}

export default connect(mapStateToProps)(Header);