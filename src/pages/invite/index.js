/**
 * @file 邀请好友页面
 */
import React from 'react';
import { WingBlank, Flex, Modal, Toast } from 'antd-mobile';
import './style.less';
import QRCode from 'qrcode';
import Util from '../../common/util'

import HeadPng from "../../images/invite/head.png"
import HeadV2Png from "../../images/invite_yt/head.png"
import Top1Png from "../../images/invite/top1.png"
import Top2Png from "../../images/invite/top2.png"
import Top3Png from "../../images/invite/top3.png"
import CodeBgImg from "../../images/invite/codebg.png"
import CloseImg from "../../images/icon-closed.png"

import WechatPng from "../../images/share/wechat.png"
import CirclePng from "../../images/share/circle.png"
import QrcodePng from "../../images/share/qrcode.png"
import LinkPng from "../../images/share/link.png"

import YTWechatPng from "../../images/invite_yt/wechat.png"
import YTCirclePng from "../../images/invite_yt/circle.png"
import YTQrcodePng from "../../images/invite_yt/qrcode.png"
import YTLinkPng from "../../images/invite_yt/link.png"

import API from '../../service/api';
import {getFetch} from '../../service/request';
import {shareWechat} from "../../common/bridge";
import {shareWechatTimeline} from "../../common/bridge";
import {getShareURL} from "../../common/bridge";

export default class Invite extends React.Component{
  constructor(props){
    super(props);
    const isYoTaApp = Util.isYoTaApp()
    this.state = {
      type: 'me',
      showRuleModal:false,
      hasReward: false,
      reward: 0,
      status: -1,
      rankList: null,
      showQrCode: false,
      inviteUrl: '',
      inviteQrCode: '',
      inviteList: null,
      isYoTaApp,
      shareList: [
        {
          img: isYoTaApp ? YTWechatPng : WechatPng,
          name: "微信收徒",
          type: "wechat"
        },
        {
          img: isYoTaApp ? YTCirclePng : CirclePng,
          name: "朋友圈收徒",
          type: "circle"
        },
        // {
        //   img: QQPng,
        //   name: "QQ收徒",
        //   type: "qq"
        // },
        {
          img: isYoTaApp ? YTQrcodePng : QrcodePng,
          name: "二维码收徒",
          type: "qrcode"
        },
        {
          img: isYoTaApp ? YTLinkPng : LinkPng,
          name: "链接收徒",
          type: "link"
        }]
    }
  }
  componentDidMount(){
    this.getData()
  }
  async getData() {
    const info = await getShareURL();
    var inviteUrl = info.url;
    if (inviteUrl && typeof(inviteUrl) === "string" && inviteUrl.length > 0) {
      this.state.inviteUrl = inviteUrl;
    }
    this.getInviteList()
    this.getRankList()
  }
  getRankList() {
    getFetch(API.inviteindex, {type: 0}).then((res) => {
      this.setState({
        rankList: res.top_ten,
        reward: res.reward,
        status: res.status,
      }, () => {
        this.initQrCode()
      })
    }).catch((e) => {
      this.setState({
        rankList: [],
      })
      this.alert(e.message || "网络不给力，请稍后再试");
    })
  }
  getInviteList() {
    getFetch(API.inviteindex, {type: 1}).then((data)=>{
      this.setState({
        inviteList: (data.top_ten || [])
      })
    }).catch((e)=>{
      this.setState({
        inviteList: [],
      })
        this.alert(e.message || "网络不给力，请稍后再试");
    })
  }
  initQrCode(){
    if(!this.state.inviteUrl) return
    QRCode.toCanvas(this.state.inviteUrl, {
      margin: 1,
      width: 256,
      height: 256
  }).then(canvas => {
      this.setState({
        inviteQrCode: canvas.toDataURL('image/jpeg')
      })
  }).catch(err => {
      console.error(err)
  })
  }
  getReward() {
    getFetch(API.getreward).then((res) => {
      Toast.show('领取成功')
      this.getData()
    }).catch((err) => {
      this.alert(err.message || "网络不给力，请稍后再试");
    })
  }
  alert = (message)=>{
    Modal.alert('', message,[{
      text: '确定'
    }])
  }
  showRule() {
    this.setState({
      showRuleModal: true
    })
  }
  hideRule() {
    this.setState({
      showRuleModal: false
    })
  }
  gotoInviteRecord() {
    window.location.href = './#/invitedetail'
  }
  inviteAction(type) {
    if(type === 'qrcode') {
      this.setState({
        showQrCode: true
      })
    } else if(type === 'link'){
      if (this.state.inviteUrl && typeof(this.state.inviteUrl) === "string" && this.state.inviteUrl.length > 0) {
        Util.copyToClip(this.state.inviteUrl)
        Toast.show('链接复制成功')
      } else {
        Toast.fail('链接复制失败')
      }
    } else if(type === 'wechat'){
      shareWechat();
      // Toast.show('分享成功')
    } else if(type === 'circle'){
      shareWechatTimeline();
      // Toast.show('分享朋友圈成功')
    }
  }
  hideQrcode() {
    this.setState({
      showQrCode: false
    })
  }
  changeTab(type) {
    this.setState({
      type,
    })
  }
	render(){
    const { isYoTaApp, type, rankList, inviteList, shareList, showRuleModal, reward, status, showQrCode, inviteQrCode } = this.state
    const headImg = isYoTaApp ? HeadV2Png : HeadPng
    return (
      <div className={isYoTaApp ? "invite-view yt" : "invite-view"}>
        <div className="head-view">
          <img className="head" src={headImg} alt=''/>
          {/*<span className="rule" onClick={this.showRule.bind(this)}>活动规则</span>*/}
          {/* <span className="record" onClick = {this.gotoInviteRecord.bind(this)}>邀请记录</span> */}
        </div>
        <WingBlank size="lg" className="content">
          { isYoTaApp ? (
            <div className='tab2'>
              <span onClick={() => this.changeTab('me')} className={[type === 'me' && "active"]}>我的奖励</span>
              <span onClick={() => this.changeTab('rank')} className={[type !== 'me' && "active"]}>奖励排行</span>
            </div>
          ) : (
            <Flex align='end' className="tab">
              <Flex.Item>
                <span onClick={() => this.changeTab('me')} className={[type === 'me' && "active"]}>我的奖励</span>
              </Flex.Item>
              <Flex.Item>
                <span onClick={() => this.changeTab('rank')} className={[type !== 'me' && "active"]}>奖励排行</span>
              </Flex.Item>
            </Flex>
          )}
          {type==='me' ? (
            <div className="invite-list">
              {(!inviteList || inviteList.length === 0) ? (
                <div className='empty'>
                  {!!inviteList && (
                    <div>
                      <p>暂无奖励</p>
                      <p>去<span>邀请好友</span>拿奖励吧</p>
                    </div>
                  )}
                </div>
              ) : (
                inviteList.map((item, index) => {
                  return (
                    <Flex justify="center" className="item bt1" key={index}>
                      <Flex.Item className="mid">
                        <img className="avatar" src={item.head_image} alt='' />{item.nick_name}
                      </Flex.Item>
                      <span className="rig">{item.income}</span>
                    </Flex>
                  )
                })
              )}
              {!!(inviteList && inviteList.length) && (
                <div className='bottomtip'>仅显示充值前十名的用户</div>
              )}
            </div>
          ) : (
            <div className="invite-list" v-else>
              {(!rankList || rankList.length === 0) ? (
                <div className='empty'>
                  {!!rankList && "暂无排行"}
                </div>
              ) : (
                rankList.map((item, index) => {
                  return (
                    <Flex justify="center" className="item bt1" key={index}>
                      <div>
                        {index === 0 && (
                          <img className="ph" src={Top1Png} alt='' />
                        )}
                        {index === 1 && (
                          <img className="ph" src={Top2Png} alt='' />
                        )}
                        {index === 2 && (
                          <img className="ph" src={Top3Png} alt='' />
                        )}
                        {index >= 3 && (
                          <div className="ph-view">
                            <div className="box1"></div>
                            <div className="box2"></div>
                            <div className="box3"></div>
                            <span className="num">{(index + 1)}</span>
                          </div>
                        )}
                      </div>
                      <Flex.Item className="mid">
                        <img className="avatar" src={item.head_image} alt='' />{item.nick_name}
                      </Flex.Item>
                      <span className="rig">{item.income}元</span>
                    </Flex>
                  )
                })
              )}
              {!!(rankList && rankList.length) && (
                <div className='bottomtip'>仅显示收益前十名的用户</div>
              )}
            </div>
          )}
          
          <div className="invite-share">
            <Flex>
              {shareList && shareList.map((item, index)=>{
                return (
                  <Flex.Item className="tc" key={index} onClick={()=> {
                    this.inviteAction(item.type)
                  }}>
                    <img src={item.img} alt='' />
                    <p className="tc">{item.name}</p>
                  </Flex.Item>
                )
              })}
            </Flex>
          </div>
        </WingBlank>
        {showRuleModal && (
          <div className="t-mask">
            <div className="pop-mid pop-rule">
              <div className="pop-rule-hd">活动规则</div>
              <div className="pop-rule-bd">
                <h4>邀请奖励规则</h4>
                <p>a.邀请方为普通用户被邀请方为男生或女生，普通用户都可正常领取邀请奖励（无关被邀请人是否加入公会。）</p>
                <p>b.邀请方为公会主播被邀请方为男生，则公会主播可正常领取邀请奖励。被邀请方为女生，若该女生未加入任何公会，则公会主播可正常领取邀请奖励；若被邀请方加入任何公会，则邀请5%奖励停止发放，但“邀请多人奖” “邀请女神奖”正常领取。</p>
                <p className="red">注意：邀请好友后，好友未通过你分享的邀请二维码/链接下载并注册，则不算成功邀请。</p>
                <h4>奖励发放时间</h4>
                <p>“邀请提成奖励”发放时间：次日0时后，即可领取昨日的邀请总提成。24小时内未领取，则视为自动放弃。</p>
                <h4>附加说明</h4>
                <p>a.一旦被系统发现舞弊行为，立即冻结账户并封号（刷小号者主号一同封号）；情节严重者，上报国家公安机关。</p>
                <p>b.邀请提成奖励，若邀请方为男生，则奖励统一以能量形式发放；若邀请方为女生，则奖励统一以蜜友豆形式发放。</p>
                <p>c.本活动最终解释权归平台所有。</p>
              </div>
              <i className="icon-closed" onClick={this.hideRule.bind(this)}></i>
            </div>
          </div>
        )}
        {showQrCode && (
          <div className="t-mask" onClick={() => {
            this.setState({
              showQrCode: false
            })
          }}>
            { isYoTaApp ? (
              <div className="pop-mid pop-qrcode-yt" onClick={(e) => {
                e.stopPropagation()
              }}>
                <div className="tc">
                  <img src={inviteQrCode} alt='' />
                  <p>扫码下载 app</p>
                </div>
              </div>
            ) : (
              <div className="pop-mid pop-qrcode" onClick={(e) => {
                e.stopPropagation()
              }}>
                <img src={CodeBgImg} alt='' />
                <div className="cont">
                  <div className="btn">邀请好友赚收益</div>
                  <div className="code-view">
                    <div className="tc">
                      <img src={inviteQrCode} alt='' />
                    </div>
                    <span>扫码 下载app</span>
                  </div>
                </div>
                <div className='close' onClick={this.hideQrcode.bind(this)}>
                  <img src={CloseImg} alt='' />
                  <div className="line bl1"></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}
