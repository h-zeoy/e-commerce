import React from 'react';
import List from 'antd-mobile/lib/list'; // 加载 JS
import 'antd-mobile/lib/list/style/css'; // 加载 CSS
import Picker from 'antd-mobile/lib/picker'; // 加载 JS
import 'antd-mobile/lib/picker/style/css'; // 加载 CSS
import { createForm } from 'rc-form';
import arrayTreeFilter from 'array-tree-filter';
import { district, provinceLite } from 'antd-mobile-demo-data';


class Test extends React.Component {
  state = {
    data: [],
    cols: 1,
    pickerValue: [],
    asyncValue: [],
    sValue: ['2013', '春'],
    visible: false,
    colorValue: ['#00FF00'],
  };

  onClick = () => {
    setTimeout(() => {
      this.setState({
        data: provinceLite,
      });
    }, 120);
  };

  onPickerChange = (val) => {
    console.log(val);
    let colNum = 1;
    const data = this.state;
    const d = [...data];
    const asyncValue = [...val];
    if (val[0] === 'zj') {
      d.forEach((i) => {
        if (i.value === 'zj') {
          colNum = 2;
          if (!i.children) {
            i.children = [{
              value: 'zj-nb',
              label: '宁波',
            }, {
              value: 'zj-hz',
              label: '杭州',
            }];
            asyncValue.push('zj-nb');
          } else if (val[1] === 'zj-hz') {
            i.children.forEach((j) => {
              if (j.value === 'zj-hz') {
                j.children = [{
                  value: 'zj-hz-xh',
                  label: '西湖区',
                }];
                asyncValue.push('zj-hz-xh');
              }
            });
            colNum = 3;
          }
        }
      });
    } else {
      colNum = 1;
    }
    this.setState({
      data: d,
      cols: colNum,
      asyncValue,
    });
  };

  getSel() {
    const { pickerValue } = this.state;
    if (!pickerValue.value) {
      return '';
    }
    const treeChildren = arrayTreeFilter(district, (c, level) => c.pickerValue.value === pickerValue.value[level]);
    return treeChildren.map(v => v.pickerValue.label).join(',');
  }
  // setVal() {
  //   this.props.form.setFieldsValue({
  //     district: ['340000', '340800', '340822'],
  //   });
  // },

  onChangeColor = (color) => {
    this.setState({
      colorValue: color,
    });
  };

  render() {
    const { form } = this.props;
    return (
      <div>
        <List style={{ backgroundColor: 'white' }} className="picker-list">
          <Picker
            extra="请选择(可选)"
            data={district}
            title="Areas"
            {...form.getFieldProps('district', {
              initialValue: ['340000', '341500', '341502'],
            })}
            onOk={e => console.log('ok', e)}
            onDismiss={e => console.log('dismiss', e)}
          >
            <List.Item arrow="horizontal">选择地址</List.Item>
          </Picker>
        </List>
      </div>
    );
  }
}

const TestWrapper = createForm()(Test);
export default TestWrapper;
