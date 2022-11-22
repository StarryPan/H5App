/**
 * @createdAt 2021-01-17
 * @file 排行榜
 */
import React from 'react';
import {WingBlank, Flex, Modal, Toast} from 'antd-mobile';
import './style.less';

import API from '../../service/api';
import {getFetch} from '../../service/request';
import {openURL} from "../../common/bridge";

export default class RankingMale extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      activeTab: 1,
      today: [],
      yesterday: [],
      hour: [],
    }
  }
  componentDidMount(){
    this.getData()
  }
  getData() {
    getFetch(API.rankIndex, {
      type:'FEMALE',
   }).then((res) => {
      this.setState({
        today:res.today,
        yesterday: res.yesterday,
        hour: res.hour,
      })
      console.log(this.state.today)
    }).catch((err) => {

    })
  }
  alert = (message)=>{
    Modal.alert('', message,[{
      text: '确定'
    }])
  }
  onBack() {
    this.props.history.goBack()
  }
  changeTab(tab) {
    if(tab === this.state.activeTab) return
    this.setState({
      activeTab: tab
    }, ()=>{
      this.getData()
    })
  }
  openUserInfo(uid) {
    // openURL("r_userinfo?uid="+uid)
  }
  render(){
    const { activeTab, today, yesterday, hour } = this.state
    var topone
    var toptwo
    var topthree
    if (activeTab === 1) {
       topone = today[0];
      toptwo = today[1];
      topthree = today[2];
    } else if (activeTab === 2) {
      topone = hour[0];
      toptwo = hour[1];
      topthree = hour[2];
    } else {
      topone = yesterday[0];
      toptwo = yesterday[1];
      topthree = yesterday[2];
    }
    // const topone = activeTab === 1 ? today[0] : yesterday[0], toptwo = activeTab === 1 ? today[1] : yesterday[1], topthree = activeTab === 1 ? today[2] : yesterday[2]
    return (
        <div>
          <div className="ranking-view">
            <div className="tab">
              <div className="view">
              <span onClick={()=>{
                this.changeTab(1)
              }} className={activeTab === 1 ? 'left active' : 'left'}>今日女神</span>
                <span onClick={()=>{
                  this.changeTab(2)
                }} className={activeTab === 2 ? 'right active' : 'right'}>当前小时</span>
                <span onClick={()=>{
                  this.changeTab(3)
                }} className={activeTab === 3 ? 'right active' : 'right'}>昨日女神</span>
              </div>
            </div>
            <div className="topview">
              {topone && (
                  <div className="top1">
                    <div className="imgview">
                      <img src={topone.head_image} alt="" onClick={()=>{
                        this.openUserInfo(topone.uid)
                      }}/>
                    </div>
                    <p className="name">{topone.nick_name}</p>
                    <p className="desc">魅力{topone.score}</p>
                  </div>
              )}
              {toptwo && (
                  <div className="top2">
                    <div className="imgview">
                      <img src={toptwo.head_image} alt="" onClick={()=>{
                        this.openUserInfo(toptwo.uid)
                      }}/>
                    </div>
                    <p className="name">{toptwo.nick_name}</p>
                    <p className="desc">魅力{toptwo.score}</p>
                  </div>
              )}
              {topthree && (
                  <div className="top3">
                    <div className="imgview">
                      <img src={topthree.head_image} alt="" onClick={()=>{
                        this.openUserInfo(topthree.uid)
                      }}/>
                    </div>
                    <p className="name">{topthree.nick_name}</p>
                    <p className="desc">魅力{topthree.score}</p>
                  </div>
              )}
            </div>
            <WingBlank size="lg" >
              <ul className="list">
                {(activeTab === 1 ? today : (activeTab === 2 ? hour : yesterday)).map((item, index) => {
                  if(index < 3) return null
                  return (
                      <li key={index}>
                        <Flex>
                          <span className="pm">{index + 1}</span>
                          <img src={item.head_image} alt="" onClick={()=>{
                            this.openUserInfo(item.uid)
                          }}/>
                          <span className="name">{item.nick_name}</span>
                          <Flex.Item>
                            <div className="tr">
                              魅力{item.score}
                            </div>
                          </Flex.Item>
                        </Flex>
                      </li>
                  )
                })}
              </ul>
            </WingBlank>
          </div>
        </div>
    )
  }
}