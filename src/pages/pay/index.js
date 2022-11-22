/**
 * @file 支付页面
 */
import React from 'react'
import { Toast } from 'antd-mobile'
import './style.less'
import LoginView from '../../components/LoginView'
import BIcon from '../../images/pay/bIcon.png'
import AliPayPng from '../../images/pay/alipay.png'
import WechatPayPng from '../../images/pay/wechatpay.png'
import API from '../../service/api'
import { postFetch, getFetch } from '../../service/request'
import Util from '../../common/util'

let u = navigator.userAgent;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   //判断是否是 android终端
let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);     //判断是否是 iOS终端
export default class HelpCenter extends React.Component{
  constructor(props){
    super(props);
    console.log('props',props)
    this.state = {
      rainbow: 0,
      lists: [],
      payTypeList: [],
      money: 0,
      payType: '',
      agree: false,
      tradeNo: '',
      showLogin: false,
    }
  }
  componentDidMount(){
    this.getCashSettingList()
    this.getPayType()
    this.dependLogin()
  }
  async dependLogin() {
    const isLginFlag = await Util.isLogin()
    if(!isLginFlag) {
      this.setState({
        showLogin: true
      })
    }
  }
  onBack() {

  }
  async getCashSettingList() {
    Toast.loading();
    try {
      const getRes = await getFetch(API.getCashSettingList)
      const { lists, rainbow } = getRes
      Toast.hide();
      this.setState({
        rainbow,
        lists,
      })
    } catch (e) {
      Toast.hide();
      Toast.show("网络不给力，请稍后再试(01)")
    }
  }
  async getPayType() {
    try {
      const payTypeList = await getFetch(API.getPayType)
      this.setState({
        payTypeList,
      })
    } catch (e) {
      Toast.show("网络不给力，请稍后再试(02)")
    }
  }
  toggleCash(item) {
    this.setState({
      money: item.money
    })
  }
  togglePayType(type) {
    this.setState({
      payType: type
    })
  }
  gotoPayDetail() {
    window.location.href = 'https://api.miyijiaoyou.com/web/user/payAgreement'
  }
  async pay() {
    Toast.loading()
    const { payType, money, agree } = this.state
    if (!money) {
      Toast.show('请先选择充值金额')
      return
    }
    if (!payType) {
      Toast.show('请先选择支付方式')
      return
    }
    if (!agree) {
      Toast.show('请先同意用户充值协议')
      return
    }
    const payWay = {
      wx: 'WxPay',
      alipay: 'AliPay'
    }
    const payRes = await postFetch(API.pay, {
      money,
      pay_way: payWay[payType],
      is_h5: 1,
    })
    Toast.hide()
    const { out_trade_no, content } = payRes
    this.setState({
      tradeNo: out_trade_no,
    })
    if (payType === 'alipay') {
      const div = document.createElement('div')
      div.innerHTML = content
      document.body.appendChild(div)
      console.log(content)
      document.forms[0].submit()
    } else if (payType === 'wx') {
      // 暂无
    }
  }
  loginClose() {
    this.setState({
      showLogin: false
    })
  }
  loginSuccess(data) {
  }
  loginFail(err){

  }
  render(){
    const { rainbow, lists, payType, payTypeList, money, agree, showLogin } = this.state
  return (
    <div className="pay-page">
      <div className="top">
        当前彩余额：<span>{rainbow}</span>
      </div>
      <div className="list">
        <h3>请选择充值金额</h3>
        <ul>
          {lists.map((item)=>{
            return (
              <li key={item.money} onClick={()=>{
                this.toggleCash(item)
              }} className={money === item.money ? 'active' : ''}>
                {!!item.name && (<span className="tag">{item.name}</span>)}
                <img className="icon" src={BIcon} /> <span>{item.cash}</span>
                <p>{item.money}元</p>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="list">
        <h3>支付方式</h3>
        {payTypeList.map((item) => {
          if (item === 'alipay') {
            return (
              <div key={item} className="checkbox" onClick={()=>{
                this.togglePayType(item)
              }}>
                <img src={AliPayPng} />支付宝
                <span className={payType === item ? 'checked' : ''}></span>
              </div>
            )
          } else if (item === 'wx') {
            return (
              <div key={item} className="checkbox" onClick={()=>{
                this.togglePayType(item)
              }}>
                <img src={WechatPayPng} />支付宝
                <span className={payType === item ? 'checked' : ''}></span>
              </div>
            )
          }
        })}
      </div>
      <div className="bottom">
        <div className="btn" onClick={this.pay.bind(this)}>立即支付</div>
        <div onClick={()=>{
          this.setState({
            agree: !this.state.agree,
          })
        }} className="txt"><span className={agree ? 'check checked' : "check"}></span>充值即代表你已成年，并同意<span className="link" onClick={this.gotoPayDetail}>《用户充值协议》</span></div>
        <div className="txt2">充值遇到困难请联系客服</div>
      </div>
      <LoginView
        visable = {showLogin}
        onClose = {this.loginClose.bind(this)}
        loginSuccess = {this.loginSuccess.bind(this)}
        loginFail = {this.loginFail.bind(this)}
      />
    </div>
  )
  }
 }
