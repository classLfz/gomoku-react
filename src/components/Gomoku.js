import React from 'react';

// components
import ItemList from './ItemList/ItemList';
import Header from './Header/Header';
import StatusBar from './StatusBar/StatusBar';
import ToolsBar from './ToolsBar/ToolsBar';
import Justicer from './Justicer';

// AI
import Footprint from './Footprint';

// styles
import styles from './Gomoku.css';

class Gomoku extends React.Component {
  constructor(props) {
    super(props);

    // 全局变量
    window.isOver = false;

    this.handleClick = this.handleClick.bind(this);
    this.restart = this.restart.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleFirstChange = this.handleFirstChange.bind(this);

    // 初始化状态
    let listArray = this.initListArray();
    this.state = {
      listArray: listArray,
      activeUser: 'black',
      model: 'pve',
      first: 'human',
      nextStatus: {
        model: 'pve',
        first: 'human'
      }
    }
  }

  initListArray() {
    let listArray = new Array;
    for (let i = 0; i < 19; i++) {
      let subList = new Array;
      for (var j = 0; j < 19; j++) {
        let piece = {
          piece: 'none'
        };
        subList.push(piece);
      }
      listArray.push(subList);
    }

    return listArray;
  }

  handleClick(event) {
    let x = event.x;
    let y = event.y;
    let active = this.state.activeUser;
    const model = this.state.model;
    const first = this.state.first;

    // 判断是否为AI下棋期间
    if (model === 'pve') {
      if (first === 'human' && active === 'white') {
        return;
      }

      if (first === 'computer' && active === 'black') {
        return;
      }
    }

    this.play(x, y, active);

    if (model === 'pve' && !window.isOver) {
      let newActiveUser = this.state.activeUser === 'black' ? 'white': 'black';
      let {x, y} = Footprint(this.state.listArray, newActiveUser);
      this.play(x, y, newActiveUser);
    }
  }

  // 下棋
  play(x, y, active) {
    let newListArray = this.state.listArray;
    newListArray[x][y]['piece'] = active;

    this.setState({
      listArray: newListArray
    }, function() {
      this.justice(x, y);

      // 交换棋权
      let newActiveUser = active === 'black' ? 'white' : 'black';
      this.setState({
        activeUser: newActiveUser
      });
    });
  }

  // 判断是否胜利
  justice(x, y) {
    let activeUser = this.state.activeUser;
    let listArray = this.state.listArray;

    let isWin = Justicer(
      {
        x: x,
        y: y
      },
      activeUser,
      listArray
    );

    if (isWin) {
      alert(`游戏结束！胜利方为${this.state.activeUser}!`);
      window.isOver = true;
    }
  }

  // 开始游戏
  restart() {
    // 重置阵列
    let listArray = this.initListArray();
    this.setState({
      listArray: listArray,
      activeUser: 'black'
    }, function() {
      // 设置状态
      let nextStatus = this.state.nextStatus;
      this.setState({
        model: nextStatus['model'],
        first: nextStatus['first']
      }, function() {
        window.isOver = false;
      });
    });
  }

  handleModelChange(status) {
    let newStatus = this.state.nextStatus;
    newStatus['model'] = status;

    this.setState({
      nextStatus: newStatus
    });
  }

  handleFirstChange(status) {
    let newStatus = this.state.nextStatus;
    newStatus['first'] = status;

    this.setState({
      nextStatus: newStatus
    });
  }

  render() {
    const itemList = this.state.listArray.map((item, index) =>
      <div key={index}>
        <ItemList list={item} onClick={this.handleClick} listNumber={index}/>
      </div>
    );
    return (
      <div className={styles.container}>
        <Header activeUser={this.state.activeUser}/>
        <div className={styles.main}>
          <StatusBar
            model={this.state.model}
            first={this.state.first}/>
          <div className={styles.chessboard}>
            {itemList}
          </div>
          <ToolsBar
            onRestart={this.restart}
            onModelChange={this.handleModelChange}
            onFirstChange={this.handleFirstChange}/>
        </div>
      </div>
    );
  }
}

export default Gomoku;