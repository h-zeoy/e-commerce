import React from 'react';
import './componentList.less';
import ComponentItem from '../componentItem/componentItem';

class CompomemtListBig extends React.Component {
  constructor(props) {
    super(props);
    const { listData } = this.props;
    this.state = {
      data: listData,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { listData } = this.props;
    const { data } = this.state;
    console.log(listData);
    if (nextProps.listData !== listData) {
      this.setState({
        data: [...nextProps.listData],
      });
    }
  }

  render() {
    const { data } = this.state;
    const { type } = this.props;
    if (type === 'big' || type === 'order' || type === 'address') {
      return (
        <div className="list-item1-wrap">
          {
            data.map((item) => {
              return (
                <ComponentItem item={item} type={type} key={Math.random()} />
              );
            })
          }
        </div>
      );
    } else {
      return (
        <div className="list-item2-wrap">
          {
            data.map((item) => {
              return (
                <ComponentItem item={item} type={type} key={Math.random()} />
              );
            })
          }
        </div>
      );
    }
  }
}
export default CompomemtListBig;
