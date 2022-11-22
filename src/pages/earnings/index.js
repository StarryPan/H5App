/**
 * @file 邀请任务页面
 */
import React from 'react'
import {Flex, List, WingBlank, Modal, Toast } from 'antd-mobile'
import './style.less'
import StarImg from '../../images/star.png'
import YunImg from '../../images/yun.png'
import BannerImg from '../../images/earnings/banner.png'

import API from '../../service/api'
import {getFetch, postFetch} from '../../service/request'

const Item = List.Item
const Brief = Item.Brief


export default class WalletDetail extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showTopHeader: false,
      taskList: [],
      earnings: {

      }
    }
  }
  componentDidMount(){
    window.addEventListener('scroll', this.onScroll.bind(this))
    this.getData()
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll.bind(this))
  }
  onScroll() {
    const scrollTop = document.documentElement.scrollTop
    const { showTopHeader } = this.state
    if (scrollTop > 350) {
      !showTopHeader && this.setState({
        showTopHeader: true
      })
    } else {
      showTopHeader && this.setState({
        showTopHeader: false
      })
    }
  }
  onBack(){

  }
  getData() {
    getFetch(API.getTaskList).then((data) => {
      this.setState({
        taskList: data.tasks || [],
        earnings: {
          gift: data.gift, //钻石
          balance: data.balance, // 积分
          cash: data.cash, // 金币
          gender: data.gender
        }
      })
    }).catch((err) => {

    })
  }
  rewardTask(data) {
    postFetch(API.rewardTask, {
      task_id: data.id,
    }).then((res) => {
      Toast.show("领取成功")
      this.getData()
    }).catch((err) => {
      this.alert(err.message || '网络不给力，请稍后再试')
    })
  }
  alert = (message)=>{
    Modal.alert('', message,[{
      text: '确定'
    }])
  }
  render() {
    const { taskList, earnings, balance, gift } = this.state
      console.log(this.state)
    return (
      <div className="earnings-view">
        {/* {showTopHeader && (
          <HeaderView
            title={ earnings.gender === 'MALE' ? "任务列表" : "收益明细"}
            onBack = {this.onBack.bind(this)}
            fixed
          />
        )} */}
        <div className="head">
          <img src={BannerImg} alt='' />
        </div>
        <div className="content">
          <WingBlank size="lg">
            {earnings.gender === 'FEMALE' && (
              <div className="info">
                <Flex>
                  <Flex.Item>
                    <div className="item br">
                      <p className="num">{earnings.balance}</p>
                      <div>
                        <img src={StarImg} alt=''/>积分
                      </div>
                    </div>
                  </Flex.Item>
                  <Flex.Item>
                    <div className="item">
                      <p className="num">{earnings.gift}</p>
                      <div>
                        <img src={YunImg} alt='' />钻石
                      </div>
                    </div>
                  </Flex.Item>
                </Flex>
                {/*<div className="tc">*/}
                  {/*<button className="tx">立即提现</button>*/}
                {/*</div>*/}
              </div>
            )}
            <List className="task-list">
              {taskList.map((item, index) => {
                return (
                  <Item key={index}>
                    {item.title}<span className="tag">（+{item.num}<img src={YunImg} alt='' />）</span>
                    <Brief>{item.subtitle}</Brief>
                    {item.status === -1 && (
                      <div className="btn">
                        <span>去完成</span>
                      </div>
                    )}
                    {item.status === 0 && (
                      <div className="btn success" onClick={() => this.rewardTask(item)}>
                        <span>领奖励</span>
                      </div>
                    )}
                    {item.status === 1 && (
                      <div className="btn finish">
                        <span>已完成</span>
                      </div>
                    )}
                  </Item>
                )
              })}
            </List>
          </WingBlank>
        </div>
      </div>
    )
  }
}
