/**
 * @file 签到有礼页面
 */
import React from 'react';
import {Flex, WingBlank, Modal } from 'antd-mobile';
import './style.less';

import YunImg from '../../images/yun.png'
import GiftImg from '../../images/signin/gift.png'
import BannerImg from '../../images/signin/banner.png'
import ResultYunImg from '../../images/signin/result-yun.png'

import { getFetch } from '../../service/request'
import API from '../../service/api'
import {openURL} from "../../common/bridge";

export default class WalletDetail extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      isSign: false,
      index: 0,
      rewards: [],
      name: '',
      num: '',
      type:'',
      gift:'',
    }
  }
  componentDidMount(){
    this.getSignList()
  }
  onShowModal() {
    this.setState({
      modal: true
    })
  }
  onCloseModal() {
    this.setState({
      modal: false
    })
  }
  getSignList() {
    getFetch(API.getSignList).then((res) => {
      this.setState({
        isSign: res.isSign,
        index: res.index-1,
        rewards: res.rewards
      })
    }).catch((err) => {

    })
  }
  sign() {
    if (this.state.isSign) return
    getFetch(API.signin).then((res) => {
      this.setState({
        name: res.gift.name,
        num: res.gift.num,
        type:res.type,
        gift:res.gift,
      });
      this.onShowModal();
      this.getSignList();
    }).catch((err) => {
      this.alert(err.message)
    })
  }
  alert = (message)=>{
    Modal.alert('', message,[{
      text: '确定'
    }])
  }
  openSessionList() {
    openURL("r_message")
  }
  render() {
    const { index, isSign, rewards } = this.state
    return (
      <div className="siginin-view">
        <div className="head">
          <img src={BannerImg} alt='' />
        </div>
        <WingBlank size="md">
          <div className="content">
            <h3>每日签到</h3>
            <div className="check">
              <Flex>
                {[0,1,2].map((item, idx) => {
                  if(rewards.length > item) {
                    if(index > item){
                        const active = true
                        return (
                            <Flex.Item className={"tc item " + (active ? 'active' : '')} key={idx}>
                                <img src={rewards[item] ? YunImg : GiftImg} alt='' /> {rewards[item] || '礼包'}
                                <p>{idx + 1}天</p>
                                {active && (
                                    <span className='tag'>已领取</span>
                                )}
                            </Flex.Item>
                        )
                    }else if(index === item) {
                        const active = true
                        return (
                            <Flex.Item className={"tc item " + (active ? 'active' : '')} key={idx}>
                                <img src={rewards[item] ? YunImg : GiftImg} alt='' /> {rewards[item] || '礼包'}
                                <p>{idx + 1}天</p>
                                {active && isSign && (
                                    <span className='tag'>已领取</span>
                                )}
                            </Flex.Item>
                        )
                    }else {
                        const active = false
                        return (
                            <Flex.Item className={"tc item " + (active ? 'active' : '')} key={idx}>
                                <img src={rewards[item] ? YunImg : GiftImg} alt='' /> {rewards[item] || '礼包'}
                                <p>{idx + 1}天</p>
                                {active && (
                                    <span className='tag'>已领取</span>
                                )}
                            </Flex.Item>
                        )
                    }
                  } else {
                    return null
                  }
                })}
              </Flex>
              <Flex>
                {[3,4,5].map((item, idx) => {
                  if(rewards.length > item) {
                      if(index > item){
                          const active = true
                          return (
                              <Flex.Item className={"tc item " + (active ? 'active' : '')} key={idx}>
                                  <img src={rewards[item] ? YunImg : GiftImg} alt='' /> {rewards[item] || '礼包'}
                                  <p>{idx + 4}天</p>
                                  {active && (
                                      <span className='tag'>已领取</span>
                                  )}
                              </Flex.Item>
                          )
                      }else if(index === item) {
                          const active = true
                          return (
                              <Flex.Item className={"tc item " + (active ? 'active' : '')} key={idx}>
                                  <img src={rewards[item] ? YunImg : GiftImg} alt='' /> {rewards[item] || '礼包'}
                                  <p>{idx + 4}天</p>
                                  {active && isSign && (
                                      <span className='tag'>已领取</span>
                                  )}
                              </Flex.Item>
                          )
                      }else {
                          const active = false
                          return (
                              <Flex.Item className={"tc item " + (active ? 'active' : '')} key={idx}>
                                  <img src={rewards[item] ? YunImg : GiftImg} alt='' /> {rewards[item] || '礼包'}
                                  <p>{idx + 4}天</p>
                                  {active && (
                                      <span className='tag'>已领取</span>
                                  )}
                              </Flex.Item>
                          )
                      }
                  } else {
                    return null
                  }
                })}
              </Flex>
              <Flex>
                  <Flex.Item className={"tc item " + (index === 6 ? 'active' : '')}>
                  <img src={rewards[6] ? YunImg : GiftImg} alt='' /> {rewards[6] || "礼包"}
                  <p>7天</p>
                    {(index === 6) && isSign && (
                        <span className='tag'>已领取</span>
                    )}
                </Flex.Item>
              </Flex>
              <button onClick = {this.sign.bind(this)} className={isSign ? 'disabled' : ''}>{ isSign ? "已领取" : "领取奖励"}</button>
              <div className='notice'>
                <h4>奖励规则</h4>
                <p>1、每日签到，即可获得奖励。连续签到，可得更多奖励。</p>
                <p> 2、如中断签到，需重新开始。</p>
              </div>
            </div>
          </div>
        </WingBlank>
        <Modal
          popup
          visible={this.state.modal}
          onClose={this.onCloseModal.bind(this)}
          animationType="slide-up"
        >
          <div className="signin-modal">
            <img src={ResultYunImg} alt='' />
            {this.state.type === 'NORMAL' && (
                <p className="tc">恭喜获得{this.state.gift}钻石奖励</p>
            )}
            {this.state.type === 'RANDOM' && (
                <p className="tc">恭喜获得{this.state.name}x{this.state.num}奖励</p>
            )}
            <p className="snote">奖励已自动发放至钱包</p>
            <button onClick={this.openSessionList.bind(this)}>去倾聊</button>
          </div>
        </Modal>
      </div>
    )
  }
}
