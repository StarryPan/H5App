/**
 * @file 邀请任务页面
 */
 import React from 'react'
 import {Flex, List, WingBlank, Modal, Toast, Switch } from 'antd-mobile'
 import './style.less'
 import ZsImg from '../../images/my/zsicon.png'
 import JfImg from '../../images/my/jficon.png'
 import GImg from '../../images/my/gicon.png'
 import BackImg from '../../images/my/back.png'
 import HeaderTopPng from '../../images/earnings/head-top.png'
 
 import API from '../../service/api'
 import {getFetch, postFetch} from '../../service/request'
 import {getAccountInfo, openURL} from "../../common/bridge";
 
 
 const Item = List.Item
 const Brief = Item.Brief
 
 
export default class WalletDetail extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showInviteCode: false,
      showTopHeader: false,
      taskList: [],
      dailyTaskList: [],
      income: null,
      earnings: {

      },
      summer: 0,
      incomeShow: 0,
      noticeFlag: false,
      signData: [],
      signDay: 1,
    }
  }
  async componentDidMount() {
    window.addEventListener('scroll', this.onScroll.bind(this))
    var info = await getAccountInfo()
    if (info) {
      this.setState({
        summer: parseInt(info.summer),
        incomeShow: parseInt(info.incomeShow),
      })
    }
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
    getFetch(API.signData).then((data) => {
      this.setState({
        signData: data.info,
        signDay: data.sign_day,
        noticeFlag: data.is_sign_remind,
      })
    }).catch((err) =>{

    })
    getFetch(API.getTaskList).then((data) => {
      this.setState({
        taskList: data.tasks || [],
        dailyTaskList: data.dailyTasks || [],
        earnings: {
          gift: data.gift, //钻石
          balance: data.balance, // 积分
          cash: data.cash, // 金币
          gender: data.gender,
        },
        income: data.w_income,
        showInviteCode: data.show_invite_code
      })
    }).catch((err) => {
      this.alert(err.message || '网络不给力，请稍后再试')
    })
  }
  withdraw() {
    window.location.href = './#/withdraw'
  }
  inviteCode() {
    window.location.href = './#/invite_code'
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
  openUrl(item){
    if (item.status !== -1) return
    openURL(item.router)
  }
  noticeAction() {
    postFetch(API.signRemind, {
      status: this.state.noticeFlag ? 0 : 1,
    }).then((data) => {
      this.setState({
        noticeFlag: !this.state.noticeFlag
      })
      Toast.success('修改成功', 1)
    }).catch((err) => {

    })
  }
  render() {
    const { taskList, dailyTaskList, earnings, income, summer, incomeShow, showInviteCode,  noticeFlag, signData, signDay, } = this.state
    return (
      <div className="earnings-view">
        {/* <div className="head">
          {!summer && showInviteCode && (
            <button className="inviteBtn" onClick={this.inviteCode.bind(this)}>填写邀请码</button>
          )}
        </div> */}
        <div className="headnew">
          {/* <h3>每日签到
            <p>连续签到拿好礼 中断重置签到 <span className="fl"><span  className={noticeFlag && 'checked'}>签到提醒</span><Switch checked={noticeFlag} onClick={this.noticeAction.bind(this)} color='#F03D75' /></span></p>
          </h3> */}
          <div>
            <img src={HeaderTopPng} />
          </div>
          {signData.length > 0 && (
            <ul className='head-list'>
              {signData.map((item) => {
                return (
                  <li key={item.day} className={`${item.day === 7 ? 'b ' : ''}${item.day === signDay ? 'active' : ''}`}>
                    <p className='tit'>第{item.day}天</p>
                    <img src={item.image_url} />
                    <p className='g'>{item.text}</p>
                  </li>
                )
              })}
            </ul>
          )}
          <div className='tr sign'><span className={noticeFlag ? 'checked' : ''}>签到提醒</span><Switch checked={noticeFlag} onClick={this.noticeAction.bind(this)} color='#8840F6' /></div>
        </div>
        <div className="content">
          {taskList.length > 0 && (
            <div className='tc'>
              <h3 className="taskTitle">注册任务<span>完成任务可得奖励</span></h3>
            </div>
          )}
          <ul className="task-list">
            {taskList.map((item, index) => {
              // 测试
              const logoView = item.icon ? (
                <img className="logo" src={item.icon} />
              ) : null
              const isDoing = item.status === -1
              return (
                <li
                  key={index}
                  className="task-item"
                  onClick = {()=>{this.openUrl(item)}}
                >
                  {logoView}
                  <strong className='title'>{item.title}</strong>
                  {/* CASH 金币
                  BALANCE 积分
                  GIFT 钻石 */}
                  {item.status === 1 && (
                    <span className='status'>已完成</span>
                  )}
                  {item.status === 0 && (
                  <span className='n' onClick={() => this.rewardTask(item)}>立即领取</span>
                )}
                  <span className={`n${item.status === 1 ? ' dis' : ''}`}>+{item.num}{item.unit === 'GIFT' ? '钻石' : item.unit === 'BALANCE' ? '积分' : item.unit === 'CASH' ? '金币' : ''}</span>
                  {isDoing && [
                  item.unit === 'GIFT' && (
                    <img key={item.unit} className='sicon' src={ZsImg} alt='' />
                  ),
                  item.unit === 'BALANCE' && (
                    <img key={item.unit} className='sicon' src={JfImg} alt='' />
                  ),
                  item.unit === 'CASH' && (
                    <img key={item.unit} className='sicon' src={GImg} alt='' />
                  ),
                  <img key="arow" className='arow' src={BackImg} alt="" />
                ]}
                  {/* {item.status === -1 && (
                    <div className="btn">
                      <span onClick = {()=>{this.openUrl(item)}}>去完成</span>
                    </div>
                  )}
                  {item.status === 0 && (
                    <div className="btn" onClick={() => this.rewardTask(item)}>
                      <span>领取奖励</span>
                    </div>
                  )}
                  {item.status === 1 && (
                    <div className="btn finish">
                      <span>已完成</span>
                    </div>
                  )} */}
                </li>
              )
            })}
          </ul>
          {dailyTaskList.length > 0 && (
            <div className='tc'>
              <h3 className="taskTitle">日常任务<span>奖励24点前不领取将自动消失</span></h3>
            </div>
          )}
          
          <ul className="task-list">
            {dailyTaskList.map((item, index) => {
              const logoView = item.icon ? (
                <img className="logo" src={item.icon} />
              ) : null
              const isDoing = item.status === -1
              return (
                <li
                  key={index}
                  className="task-item"
                  onClick = {()=>{this.openUrl(item)}}
                >
                  {logoView}
                  <strong className='title'>{item.title}</strong>
                  {/* CASH 金币
                  BALANCE 积分
                  GIFT 钻石 */}
                  {item.status === 1 && (
                    <span className='status'>已完成</span>
                  )}
                  {item.status === 0 && (
                  <span className='n' onClick={() => this.rewardTask(item)}>立即领取</span>
                )}
                  <span className={`n${item.status === 1 ? ' dis' : ''}`}>+{item.num}{item.unit === 'GIFT' ? '钻石' : item.unit === 'BALANCE' ? '积分' : item.unit === 'CASH' ? '金币' : ''}</span>
                  {isDoing && [
                  item.unit === 'GIFT' && (
                    <img key={item.unit} className='sicon' src={ZsImg} alt='' />
                  ),
                  item.unit === 'BALANCE' && (
                    <img key={item.unit} className='sicon' src={JfImg} alt='' />
                  ),
                  item.unit === 'CASH' && (
                    <img key={item.unit} className='sicon' src={GImg} alt='' />
                  ),
                  <img key="arow" className='arow' src={BackImg} alt="" />
                ]}
                  {/* {item.status === -1 && (
                    <div className="btn">
                      <span onClick = {()=>{this.openUrl(item)}}>去完成</span>
                    </div>
                  )}
                  {item.status === 0 && (
                    <div className="btn" onClick={() => this.rewardTask(item)}>
                      <span>领取奖励</span>
                    </div>
                  )}
                  {item.status === 1 && (
                    <div className="btn finish">
                      <span>已完成</span>
                    </div>
                  )} */}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
 