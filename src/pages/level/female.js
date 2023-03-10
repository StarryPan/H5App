import React from 'react';
import {Flex, WingBlank, Progress } from 'antd-mobile';
import './style.less';

import SpImg from '../../images/my-level/sp.png'
import LtImg from '../../images/my-level/lt.png'
import LwImg from '../../images/my-level/lw.png'
import YpImg from '../../images/my-level/yp.png'
import GIconImg from '../../images/my-level/jficon.png'

import { getFetch } from '../../service/request'
import API from '../../service/api'
import {getAccountInfo} from "../../common/bridge";

export default class MyLevel extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      summer: true,
      nickName: '',
      avatar: '',
      level: 0,
      needNum: 0,
      currentNum: 0,
      totalNum: 100,
      levelList: [{
        level: 0,
        num: 0,
      },{
        level: 1,
        num: 3000,
      },{
        level: 2,
        num: 10000,
      },{
        level: 10,
        num: 25000,
      },{
        level: 15,
        num: 18000000,
      },{
        level: 20,
        num: 65000000,
      },{
        level: 25,
        num: 115000000,
      },{
        level: 35,
        num: 215000000,
      },{
        level: 45,
        num: 315000000,
      },{
        level: 55,
        num: 415000000,
      }]
    }
  }

  async componentDidMount() {
    var info = await getAccountInfo()
    if (info.summer==0) {
      this.state.summer = parseInt(info.summer)
    }

    this.getMyLevelData()
  }

  getMyLevelData() {
    getFetch(API.myLevel).then((res) => {
      this.setState({
        avatar: res.head_image,
        nickName: res.nick_name,
        level: res.level,
        needNum: res.needed,
        currentNum: res.current,
        totalNum: res.total,
        levelList: this.formatLevelList(res.table)
      })
    }).catch((err) => {

    })
  }
  formatLevelList(data) {
    return data.map((item, index) => {
      return {
        level: index,
        num: item
      }
    })
  }
  render() {
    const { levelList, level, needNum, totalNum, currentNum, summer } = this.state;
    return (
      <div className="level-view">
        <div className='shadowview'>
          <div className="head">
            <h2>LV{level}</h2>
            <span className='cur'>??????????????? <strong>{currentNum.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")}</strong></span>
            <span className='next'>???lv{level + 1}?????? <strong>{needNum.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")}</strong></span>
          </div>
          <h3 className="title">??????????????????</h3>
          <p className="notes">??????1????????????1?????????</p>
          <div className="level-box">
            <Flex>
              <Flex.Item>
                <div className="item">
                  <img src={LtImg} alt='' />
                  <p>????????????</p>
                </div>
              </Flex.Item>
              <Flex.Item>
                <div className="item">
                  <img src={SpImg} alt='' />
                  <p>????????????</p>
                </div>
              </Flex.Item>
              <Flex.Item>
                <div className="item">
                  <img src={LwImg} alt='' />
                  <p>????????????</p>
                </div>
              </Flex.Item>
              <Flex.Item>
                <div className="item">
                  <img src={YpImg} alt='' />
                  <p>????????????</p>
                </div>
              </Flex.Item>
            </Flex>
          </div>
        </div>
        <div className='shadowview level-list'>
          <h3>???????????????????????????</h3>
          <ul className=''>
            {levelList.map((item) => {
              return (
                <li key={item.level}>LV{item.level} <span>{item.num} ??????<img src={GIconImg} /></span></li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
