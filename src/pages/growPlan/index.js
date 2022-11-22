/**
 * @file 成长计划页面
 */
import React from 'react'
import { Toast } from 'antd-mobile'
import { getFetch } from '../../service/request'
import API from '../../service/api'
import { isAndroid, openURL } from "../../common/bridge"
import './style.less'

export default class HelpCenter extends React.Component{
  constructor(props){
    super(props);
    console.log('props',props)
    this.state = {
      avatar: '',
      nickName: '',
      balance: '--',
      finishTime: 0,
        realFinishTime: 0,
      totalTime: 100,
      leftTime: 10,
      level: 1,
      collectData: [],

    }
  }
  componentDidMount(){
    this.getData()
  }
  async getData(noLoading) {
    if (!noLoading) {
      Toast.loading();
    }
    try {
      const getRes = await getFetch(API.getActivityUserData)
      if (!noLoading) {
        Toast.hide();
      }
      const { userData, collectData, levelProgress } = getRes
      this.setState({
        avatar: userData.headImage,
        nickName: userData.nickName,
        balance: userData.balance,
        finishTime: levelProgress.videoTime > levelProgress.totalTime ? levelProgress.totalTime : levelProgress.videoTime,
          realFinishTime : levelProgress.videoTime,
        totalTime: levelProgress.totalTime,
        leftTime: levelProgress.distanceTime,
        level: levelProgress.levels,
        collectData,
      })
    } catch(e) {
      if (!noLoading) {
        Toast.hide();
      }
      Toast.show(e.message);
    }
  }
  showRule() {
    this.setState({
      showRuleFloat: true
    })
  }
  closeAction() {
    this.setState({
      showRuleFloat: false
    })
  }
  async reveice(item) {
    if (item.receiveOrNot !== 0) return
    try {
      Toast.loading();
      const receiveRes = await getFetch(API.receiveRewards, {
        level: item.level,
        balance: item.balance
      })
      Toast.hide();
      Toast.show('领取成功')
      this.getData(true)
    } catch(e) {
      Toast.hide();
      Toast.show(e.message)
    }
  }
  kefuAction() {
    // if (isAndroid()) {
    //   window.location.href = 'http://api.miyijiaoyou.com/chatlink.html'
    // } else {
    //     openURL('r_kefu')
    // }
      openURL('r_kefu')
  }
  render(){
    const {
      showRuleFloat,balance, avatar, nickName,
      finishTime, realFinishTime,leftTime, level, totalTime,
      collectData,
    } = this.state
    return (
      <div className="growPlan">
        <div className="top">
          <div className="bgimg"></div>
          <span className="rule" onClick={this.showRule.bind(this)}>活动说明</span>
        </div>
        { !!avatar && (
          <div className="user">
            <img className="avatar" src={avatar} />
            <h3 className="tit">{nickName}</h3>
            <p className="star">当前积分：{balance}</p>
          </div>
        )}
        <div className="level">
          <span className="right">单位：h</span>
          <div className="bg">
            <div className="process" style={{right: `${(totalTime-finishTime) / totalTime * 100}%`}}></div>
            <div className="tips" style={{left: `${finishTime / totalTime * 100}%`}}>
              {realFinishTime}
              <span className="tips-out"></span>
            </div>
          </div>
          <span className="left">当前等级：{level}</span>
          <span className="right">距下一等级还差：{leftTime}</span>
        </div>
        <div className="graypart"></div>
        <p className="notes">注：所得奖励请及时领取，过时未领取视为自动放弃！</p>
        <ul className="task">
          <li className="flexbox tab">
            <span className="flex2">等级</span>
            <span className="flex4">视频通话时长(h)</span>
            <span className="flex3">奖励积分</span>
            <span className="flex3">状态</span>
          </li>
          {collectData.map((item) => {
            return (
              <li className="flexbox" v-for="item in collectData" key={item.level}>
                <span className="flex2">{item.level}级</span>
                <span className="flex4">{item.duration}</span>
                <span className="flex3">{item.balance}</span>
                <div className="flex3">
                  {/* 1已领取, 0可领取，-1不可领取  */}
                  <button onClick={() => {
                    this.reveice(item)
                  }} className={item.receiveOrNot === 0 ? '' : 'disable'}>
                    {item.receiveOrNot === 1 ? '已领取' : '领取奖励'}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
        {collectData.length > 0 && (
          <div className="kefu"><span>》</span>如有问题请<span onClick={this.kefuAction}>联系客服</span><span>《</span></div>
        )}
        {showRuleFloat && (
          <div>
            <div className="t-mask" onClick={this.closeAction.bind(this)}></div>
            <div className="t-dialog">
              <div className="t-dialog__content">
                <div className="pop-mid pop-rule">
                  <div className="pop-rule-hd">活动说明</div>
                  <div className="pop-rule-bd">
                      <p>1、活动时间：2022年1月8日 00:00:00-2022年1月22日 23:59:59（一共15天）；</p>
                    <p>2、活动奖励领取时间：2022年1月23日00:00:00-23:59:59，过期不领视为自动放弃奖励，请及时领取；</p>
                    <p>3、活动人人皆可参与，无需报名，和心仪的Ta进行视频聊天，根据活动期间视频累计时长计算所属等级，视频聊天累计时间越长,等级越高，获得的奖励也就越丰厚；</p>
                    <p>4、每一等级获得的奖励根据当前所在等级视频时长计算（实际奖励看图表）；不够下一等级的用户所得奖励按照上一等级奖励计算，超出部分不做计算；</p>
                    <p>5、活动期间若发现小号互刷，与其他用户互刷或不正当行为的用户，则冻结当前账户所有收益以及本活动的所得奖励，并进行封号处罚；</p>
                    <p>6、期间如账号进行违规操作导致账号不是正常使用状态的（如封号、冻结、禁言），则不能领取奖励，如有特殊情况，请联系客服；</p>
                    <p>7、本活动的最终解释权归蜜意平台所有；</p>
                  </div>
                  <i className="icon-closed" onClick={this.closeAction.bind(this)}></i>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
