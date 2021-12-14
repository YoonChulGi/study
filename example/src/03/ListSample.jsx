import React, { Component } from 'react';

class ListSample extends Component {
  render() {
    const itemNameList = ['책상', '의자', '선반', '탁자'];
    const priceList = [10000, 20000, 30000, 40000];
    const itemNames = itemNameList.map((name) => <div>상품명: {name}</div>);
    const prices = priceList.map((price) => <div>가격: {price}</div>);
    return (
      <div>
        <span>
          <label>상품목록</label>
          {itemNames} {prices}
        </span>
      </div>
    );
  }
}

export default ListSample;
