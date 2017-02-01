import React from 'react';
// components
import Item from '../Item/Item';
// styles
import styles from './styles.css';

export default class ItemList extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onClick(event);
  }

  render() {
    const list = this.props.list.map((item, index) =>
      <div key={index} className={styles.list}>
        <Item
          piece={item.piece}
          listNumber={this.props.listNumber}
          sequenceNumber={index}
          onClick={this.handleClick}/>
      </div>
    );

    return (
      <div>
        {list}
      </div>
    );
  }
}