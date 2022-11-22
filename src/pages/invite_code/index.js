/**
 * @file 帮助中心页面
 */
import React from 'react'
import {WingBlank, Flex, InputItem, Modal, Toast} from 'antd-mobile'
import LoginView from '../../components/LoginView'
import { createForm } from 'rc-form'
// import { getFetch, postFetch } from '../../service/request'
// import HeaderView from '../../components/HeaderView'
import './style.less';
import Util from '../../common/util';
import {getFetch, postFetch} from "../../service/request";
import API from "../../service/api";
import HelpIconImg from '../../images/help_icon.png'
import HeaderView from "../../components/HeaderView";
class InviteCode extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tabType: 'star',
      showLogin: false,
      balance: 0,
      balance_money: 0,
      gift: 0,
      gift_money: 0,
      exchange_cash: 0,
      showNote: false,
      account: '' //提现账号
    }
  }
  componentDidMount(){
    // Util.removeUserinfo()
    this.checkLogin()
  }
  checkLogin() {
    if(!Util.isLogin()) {
      this.setState({
        showLogin: true
      })
      return;
    } else {
      this.getData()
    }
  }
  getData() {
    Toast.loading()
    getFetch(API.withdrawalInfo).then((res)=>{
      this.setState({
        balance: res.info.balance,
        balance_money: res.info.balance_money,
        gift: res.info.gift,
        gift_money: res.info.gift_money,
        exchange_cash: res.info.exchange_cash,
        account: res.info.account,
        status: res.info.status,
      })
      Toast.hide()
    }).catch((err) => {
      Toast.hide()
        if(err.code === 401) {
            this.setState({
                showLogin: true
            })
        } else {
            this.alert(err.message)
        }
    })
  }
  alert = (message)=>{
    Modal.alert('', message,[{
      text: '确定'
    }])
  }
  onBack() {
    Toast.show('不能再返回了')
  }
  submit = () => {
    if(!Util.isLogin()) {
      this.setState({
        showLogin: true
      })
      return;
    }

    this.props.form.validateFields((error, value) => {
      this.inviteCode(value.code)
    });
  }
  inviteCode(code) {
    postFetch(API.inviteCode, {
      code: code,
    }).then((res) => {
      this.alert("提交成功, 等待审核...");
      // this.getData();
      this.props.form.resetFields()
    }).catch((err) => {
      this.alert(err.message)
    })
  }
  loginClose() {
    this.setState({
      showLogin: false
    })
  }
  loginSuccess(data) {
    this.setState({
      showLogin: false
    })
    this.getData()
  }

  loginFail(err){

  }
  showWithdrawNote() {
    this.setState({
      showNote: true
    })
  }
  onCloseNote() {
    this.setState({
      showNote: false
    })
  }
	render(){
    const { tabType, showLogin, account, showNote, status } = this.state
    const { getFieldProps } = this.props.form;
    const placeholder = '请输入邀请人手机号码'
		return(
      <div>
        {/*{status === 1 ? (*/}
        {/*    <HeaderView*/}
        {/*        title={"提现"}*/}
        {/*        onBack = {this.onBack.bind(this)}*/}
        {/*        rightContent = {{*/}
        {/*          title: '明细',*/}
        {/*          onClick: () => {*/}
        {/*            this.gotoWalletDetail()*/}
        {/*          }*/}
        {/*        }}*/}
        {/*        // fixed*/}
        {/*    />*/}
        {/*) : (*/}
        {/*  <HeaderView*/}
        {/*  title={"提现"}*/}
        {/*  onBack = {this.onBack.bind(this)}*/}
        {/*  rightContent = {{*/}
        {/*  title: '绑定',*/}
        {/*  onClick: () => {*/}
        {/*  this.gotoBindAlipay()*/}
        {/*}*/}
        {/*}}*/}
        {/*  // fixed*/}
        {/*  />*/}
        {/*  )}*/}

        {/*{status === 1 ? (*/}
        {/*    <p className="withdraw-topnote">收款账号：{account} (支付宝)</p>*/}
        {/*) : (*/}
        {/*    <p className="withdraw-topnote">{status===-1 ? '未绑定邀请码' : (status===0 ? '支付宝账号审核中' : (status===2 ? '审核失败,请重新绑定' : ''))} </p>*/}
        {/*)}*/}
        <WingBlank size='lg'>
          <div className="withdraw-view">
            <div className="content">
              <div className="inputview">
                <InputItem
                    className="input border"
                    type = "number"
                    {...getFieldProps('code')}
                    placeholder={placeholder}
                ></InputItem>
                {/*<span>手机号码</span>*/}
              </div>
              <button onClick={this.submit.bind(this)}>提交</button>
            </div>
          </div>
        </WingBlank>
        <LoginView
          visable = {showLogin}
          onClose = {this.loginClose.bind(this)}
          loginSuccess = {this.loginSuccess.bind(this)}
          loginFail = {this.loginFail.bind(this)}
        />
      </div>
		);
	}
}

export default createForm()(InviteCode);
