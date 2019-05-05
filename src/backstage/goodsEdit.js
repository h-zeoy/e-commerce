import React, { Component } from 'react';
import './goodsEdit.less';
// import { ImagePicker } from 'antd-mobile';
import ImagePicker from './ImagePicker'; // 加载 JS

class goodsEdit extends Component {
  render() {
    return (
      <div className="dataGoods">
        <h3>添加数据</h3>
        <form action="form_action.asp" method="get">
          <p> 商品名称: <input type="text" name="fname" /> </p>
          <p> 商品编号: <input type="text" name="lname" /> </p>
          <div> 商品缩略图: <ImagePicker />
          </div>

          <p> 商品创建时间: <input type="text" name="lname" /> </p>
          <p> 商品下架时间: <input type="text" name="lname" /> </p>
          <p> 商品价格: <input type="text" name="lname" /> </p>
          <p> 商品原价格: <input type="text" name="lname" /> </p>
          <p> 商品渠道: <input type="text" name="lname" /> </p>
          <p> 商品库存: <input type="text" name="lname" /> </p>
          {/* <p> 服务: <input type="text" name="lname" value="全场包邮· 平台保价· 正品保证· 7天包退" /> </p> */}
          <input type="button" value="添加商品" className="button" />
        </form>
      </div>
    );
  }
}
export default goodsEdit;
