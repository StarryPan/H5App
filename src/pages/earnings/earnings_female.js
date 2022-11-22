/**
 * @file 邀请任务页面
 */
import React from 'react'
import {Flex, List, WingBlank, Modal, Toast, Switch } from 'antd-mobile'
import './style.less'
import { Link } from "react-router-dom"
import ZsImg from '../../images/my/zsicon.png'
import JfImg from '../../images/my/jficon.png'
import GImg from '../../images/my/gicon.png'
import BackImg from '../../images/my/back.png'
import FEHbgPng from '../../images/earnings/fe_hbg.png'
import HeaderTopPng from '../../images/earnings/head-top-female.png'

import API from '../../service/api'
import {getFetch, postFetch} from '../../service/request'
import {getAccountInfo, isAndroid, openURL} from "../../common/bridge";


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
    }
  }
  async componentDidMount() {
    window.addEventListener('scroll', this.onScroll.bind(this))
    var info = await getAccountInfo()
    if (info) {
      this.setState({
        summer: parseInt(info.summer),
        incomeShow: isAndroid() ? parseInt(info.incomeShow) : 1,
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
    postFetch(API.getSignRemind).then((data) => {
      this.setState({
        noticeFlag: data.is_sign_remind,
      })
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
  toDetil() {

  }
  render() {
    const { taskList, dailyTaskList, earnings, income, summer, incomeShow, showInviteCode, noticeFlag } = this.state
    return (
      <div className="earnings-view">
        <div className="headnew fe" style={{display: "none"}}>
          <div>
            <img src={HeaderTopPng} />
          </div>
          <div><img  className='emp' src={FEHbgPng} /></div>
          <p className='bz'>小星星*？</p>
          <div className='tr sign'><span className={noticeFlag && 'checked'}>签到提醒</span><Switch checked={noticeFlag} onClick={this.noticeAction.bind(this)} color='#8840F6' /></div>
          {!summer && showInviteCode && (
            <div className='form'>
              <input ref={c => this.$inviteCode = c} className='input' placeholder="填写邀请码" />
              <button onClick={this.inviteCodeAction.bind(this)}>提交</button>
            </div>
          )}
        </div>
        <div className="content">
          {!summer && !!incomeShow && income && (
            <WingBlank size="lg">
              <div className="info">
                { income && (
                  <div className="pview">
                    <Flex>
                      <Flex.Item>
                        <div className="item">
                          <p className="price">{income.yes_income}</p>
                          <div className="gray">
                            昨日收益
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className="item">
                          <p className="price">{income.d_income}</p>
                          <div className="gray">
                            今日收益
                          </div>
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <div className="item">
                          <p className="price">{income.m_income}</p>
                          <div className="gray">
                            本月收益
                          </div>
                        </div>
                      </Flex.Item>
                    </Flex>
                    <Link to={`/earnings_detail_female`}>
                      <button onClick={this.toDetil.bind(this)}>查看收益明细</button>
                    </Link>
                  </div>
                )}
                <Flex>
                  <Flex.Item>
                    <div className="item">
                      <p className="num">{earnings.balance}</p>
                      <div>
                        <img className="imgStar" src={JfImg} alt=''/>积分
                      </div>
                    </div>
                  </Flex.Item>
                  <Flex.Item>
                    <div className="item">
                      <p className="num">{earnings.gift}</p>
                      <div>
                        <img className="imgYun" src={ZsImg} alt='' />钻石
                      </div>
                    </div>
                  </Flex.Item>
                </Flex>
              </div>
              <div className="tc btview">
                <button className="tx" onClick={this.withdraw.bind(this)}>立即提现</button><span> </span>
              </div>
            </WingBlank>
          )}
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
