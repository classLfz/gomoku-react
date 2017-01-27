import React from 'react';

// components
import ItemList from './ItemList/ItemList';
import Toolbar from './Toolbar/Toolbar';
import Helper from './Helper';

// styles
import styles from './Gomoku.css';


class Gomoku extends React.Component {
  constructor(props) {
    super(props);

    // 全局变量
    window.isOver = false;

    this.handleClick = this.handleClick.bind(this);
    this.restart = this.restart.bind(this);

    // 初始化状态
    let listArray = this.initListArray();
    this.state = {
      listArray: listArray,
      activeUser: 'black'
    }
  }

  initListArray() {
    let listArray = new Array;
    for (let i = 0; i < 19; i++) {
      let subList = new Array;
      for (var j = 0; j < 19; j++) {
        let piece = {
          id: j,
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

    // 修改阵列
    let newListArray = this.state.listArray;
    newListArray[x][y]['piece'] = this.state.activeUser;
    this.setState({
      listArray: newListArray
    });

    this.justice(x, y);

    // 交换棋权
    let newActiveUser = this.state.activeUser === 'black' ? 'white' : 'black';
    this.setState({
      activeUser: newActiveUser
    });
  }

  // 判断是否胜利
  justice(x, y) {
    let activeUser = this.state.activeUser;
    let listArray = this.state.listArray;

    let isWin = Helper.justicer(
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

  // 重新开始游戏
  restart() {
    let listArray = this.initListArray();

    this.setState({
      listArray: listArray,
      activeUser: 'black'
    });

    window.isOver = false;
  }

  render() {
    const itemList = this.state.listArray.map((item, index) =>
      <div key={index}>
        <ItemList list={item} onClick={this.handleClick} listNumber={index}/>
      </div>
    );
    return (
      <div className={styles.container}>
        <Toolbar activeUser={this.state.activeUser} onRestart={this.restart}/>
        {itemList}
      </div>
    );
  }
}

export default Gomoku;