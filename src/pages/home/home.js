import React, { Component } from 'react';
import { SwiperComponent } from '../../../components/plugins/swiper';
import ComponentNav from '../../../components/componentNav/componentNav';
import ComponentList from '../../../components/componentList/componentList';
import Tabbar from '../../../components/componentTabbar/componentTabbar';
import './home.less';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: ['../../../static/image/banner/banner1.jpg', '../../../static/image/banner/banner2.jpg', '../../../static/image/banner/banner3.jpg', '../../../static/image/banner/banner4.jpg'],
      navData: {
        default: 1,
        list: [{ index: 1, title: '今日特卖' }, { index: 2, title: '童装' }, { index: 3, title: '母婴' }, { index: 4, title: '居家' },
          { index: 5, title: '美食' }, { index: 6, title: '女装' }, { index: 7, title: '鞋包' }, { index: 8, title: '美妆' },
          { index: 9, title: '进口' }],
      },
      navIndex: 1,
      listData: [{ title: '【夏日微醺体验】8瓶装RIO锐澳微醺鸡尾酒', price: '39.9' }, { title: '【夏日微醺体验】8瓶装RIO锐澳微醺鸡尾酒', price: '39.9' }, { title: '【夏日微醺体验】8瓶装RIO锐澳微醺鸡尾酒', price: '59.9' }],
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    SwiperComponent('.swiper-container-banner', '.swiper-pagination', true);
  }

  homeNavClick(item) {
    this.setState({
      navIndex: item.index,
    }, () => {
      console.log(item.index);
    });
  }

  render() {
    const { imgUrl, navData, listData } = this.state;
    return (
      <div className="wrap">
        <aside className="swiper-container swiper-container-banner">
          <ul className="swiper-wrapper">
            {
              imgUrl.map((it) => {
                return (
                  <li className="swiper-slide" key={Math.random()}>
                    <img src={it} alt="" />
                  </li>
                );
              })
            }
          </ul>
          <div className="swiper-pagination" />
        </aside>
        <ul className="jieshao">
          <li><img src="../../../static/image/home/h1.png" alt="限时抢购" /></li>
          <li><img src="../../../static/image/home/h2.png" alt="9.9包邮" /></li>
          <li><img src="../../../static/image/home/h3.png" alt="新品特惠" /></li>
        </ul>
        <ComponentNav navData={navData} comNav={this.homeNavClick.bind(this)} />
        <p className="home-list-header"> 每天9点准时上新 </p>
        <ComponentList listData={listData} type="big" />
        <p className="bian" />
        <Tabbar />
      </div>

    );
  }
}
export default Home;
