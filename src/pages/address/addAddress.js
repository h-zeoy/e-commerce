import React, { Component } from 'react';
import './addAddress.less';
import Picker from '../../../components/plugins/picker';

class AddAddress extends Component {
  render() {
    return (
      <div>
        新增收货地址
        <Picker />
      </div>
    );
  }
}
export default AddAddress;
