import React from 'react';
import './Item.css';

export default class Item extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (this.props.piece !== 'none') {
      return;
    }

    this.props.onClick({
      x: this.props.listNumber,
      y: this.props.sequenceNumber
    });
    event.preventDefault();
  }

  handleItemClassName(x, y) {
    // 左上角
    if (x === 0 && y === 0) {
      return 'itemLeftTop';
    }
    // 右上角
    if (x === 18 && y === 0) {
      return 'itemRightTop';
    }
    // 右下角
    if (x === 18 && y === 18) {
      return 'itemRightBottom';
    }
    // 左下角
    if (x === 0 && y === 18) {
      return 'itemLeftBottom';
    }
    // 上侧边
    if (y === 0) {
      return 'itemTop';
    }
    // 右侧边
    if (x === 18) {
      return 'itemRight';
    }
    // 下侧边
    if (y === 18) {
      return 'itemBottom';
    }
    // 左侧边
    if (x === 0) {
      return 'itemLeft';
    }
    // 指标位置
    if ((x === 9 && y === 9) ||
        (x === 3 && (y === 3 || y === 9 || y === 15)) ||
        (y === 3 && (x === 3 || x === 9 || x === 15)) ||
        (x === 15 && (y === 9 || y === 15)) ||
        (x === 9 && y === 15)
      ) {
      return 'itemPoint';
    }
    // 其他
    return 'itemNormal';
  }

  render() {
    const piece = this.props.piece;
    const x = this.props.listNumber;
    const y = this.props.sequenceNumber;
    let itemClassName = null,
        spanClassName = null;

    // 背景样式
    itemClassName = this.handleItemClassName(x, y);
    // 棋子样式
    if (piece === 'none') {
      spanClassName = 'spanNone';
    } else if (piece === 'black') {
      spanClassName = 'spanBlack';
    } else {
      spanClassName = 'spanWhite';
    }

    return (
      <div onClick={this.handleClick} className={itemClassName}>
        <div className={spanClassName}></div>
      </div>
    );
  }
}