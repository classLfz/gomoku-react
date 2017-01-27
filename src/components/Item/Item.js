import React from 'react';
import styles from './Item.css';

export default class Item extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (window.isOver) {
      return;
    }

    if (this.props.piece !== 'none') {
      return;
    }

    this.props.onClick({
      x: this.props.listNumber,
      y: this.props.sequenceNumber
    });
    event.preventDefault();
  }

  render() {
    const piece = this.props.piece;
    const x = this.props.listNumber;
    const y = this.props.sequenceNumber;
    let itemClassName = null,
        spanClassName = null;

    // 背景样式
    if ((x === 0 || x >= 18) && (y === 0 || y >= 18)) {
      itemClassName = styles.itemCorner;
    } else if (x === 0 || y === 0 || x === 18 || y === 18) {
      itemClassName = styles.itemEdge;
    } else if ((x === 9 && y === 9) || (x === 3 && y === 3)) {
      itemClassName = styles.itemPoint;
    } else {
        itemClassName = styles.item;
    }

    if (piece === 'none') {
      spanClassName = styles.spanNone;
    } else if (piece === 'black') {
      spanClassName = styles.spanBlack;
    } else {
      spanClassName = styles.spanWhite;
    }

    return (
      <div onClick={this.handleClick} className={itemClassName}>
        <div className={spanClassName}></div>
      </div>
    );
  }
}