/**
 * @file 帮助中心页面
 */
import React from 'react'
import {WingBlank, Flex, InputItem, Modal} from 'antd-mobile'
import LoginView from '../../components/LoginView'
import { createForm } from 'rc-form'
// import { getFetch, postFetch } from '../../service/request'
// import HeaderView from '../../components/HeaderView'
import './style.less';
import Util from '../../common/util';
import {getFetch, postFetch} from "../../service/request";
import API from "../../service/api";
import HelpIconImg from '../../images/help_icon.png'
class Withdraw extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tabType: 'rainbow',
      showLogin: false,
      balance: 0,
      balance_money: 0,
      gift: 0,
      gift_money: 0,
      showNote: false,
      withdrawAccount: '提现账号', //提现账号
      exchange_cash: 0,
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
    getFetch(API.withdrawalInfo).then((res)=>{
      this.setState({
        balance: res.info.balance,
        balance_money: res.info.balance_money,
        gift: res.info.gift,
        gift_money: res.info.gift_money,
        exchange_cash: res.info.exchange_cash,
      })
    }).catch((err) => {
      this.alert(err.message)
    })
  }
  alert = (message)=>{
    Modal.alert('', message,[{
      text: '确定'
    }])
  }
  onBack() {

  }
  submit = () => {
    // if(!Util.isLogin()) {
    //   this.setState({
    //     showLogin: true
    //   })
    //   return;
    // }

    this.props.form.validateFields((error, value) => {
      this.exchange(value.money)
    });
  }
  exchange(num) {
    postFetch(API.exchange, {
      balance: num,
    }).then((res) => {
      this.alert("兑换成功");
      this.getData();
      this.props.form.resetFields()
    }).catch((err) => {
      this.alert(err.message)
    })
  }
  withdrawal(money) {
    let type = -1;
    if (this.state.tabType === 'star') {
      type = 0
    } else if (this.state.tabType === 'cloud') {
      type = 1
    } else {
      return
    }
    postFetch(API.withdrawal, {
      money: money,
      type:type
    }).then((res) => {
      this.alert("提现成功");
      this.getData();
      this.props.form.resetFields()
    }).catch((err) => {
      if(err.code === 401) {
        this.setState({
          showLogin: true
        })
      } else {
        this.alert(err.message)
      }
    })
  }
  changetab = (type) => {
    this.setState({
      tabType: type
    })
  }
  gotoWalletDetail() {

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
    const { tabType, showLogin, withdrawAccount, showNote, exchange_cash } = this.state
    const { getFieldProps } = this.props.form;
    const placeholder = tabType !== 'rainbow' ? '请输入为50整数倍的提现金额' : '请输入积分的数量'
		return(
      <div>
        {/* <HeaderView
          title={"提现"}
          onBack = {this.onBack.bind(this)}
          rightContent = {{
            title: '明细',
            onClick: () => {
              this.gotoWalletDetail()
            }
          }}
          fixed
        /> */}
        <WingBlank size='lg'>
          <div className="withdraw-view">
            <div className="content">
              {/* <div className="tab">
                <span className={ tabType === 'star' ? "active" : ''} onClick={() => this.changetab('star')}>积分提现</span>
                <span className={ tabType === 'cloud' ? "active t2" : ''} onClick={() => this.changetab('cloud')}>钻石提现</span>
                <span className={ tabType === 'rainbow' ? "active t3" : ''} onClick={() => this.changetab('rainbow')}>兑换金币</span>
              </div> */}
              <div className="dui">
                <h3>兑换金币</h3>
              </div>
              <Flex className="con">
                <Flex.Item className="tc">
                  <p>积分总额</p>
                  <h3>{this.state.balance}</h3>
                </Flex.Item>
                <Flex.Item className="tc">
                  <p>可兑换(金币)</p>
                  <h3>{this.state.exchange_cash}</h3>
                </Flex.Item>
              </Flex>
            </div>
            <div className="content">
              <div className="inputview">
                <InputItem
                    className="input border"
                    type = "number"
                    {...getFieldProps('money')}
                    placeholder={placeholder}
                ></InputItem>
                <span>积分</span>
              </div>
              <div className="w-suan">
                可兑换<span>{this.state.exchange_cash}</span>金币
              </div>
              <button onClick={this.submit.bind(this)}>立即兑换</button>
              <p className="note2">每日最多可兑换50万积分</p>
            </div>
          </div>
        </WingBlank>
        <LoginView
          visable = {showLogin}
          onClose = {this.loginClose.bind(this)}
          loginSuccess = {this.loginSuccess.bind(this)}
          loginFail = {this.loginFail.bind(this)}
        />
        <Modal
            popup
            className="q-modal"
            visible={showNote}
            onClose={this.onCloseNote.bind(this)}
            animationType="slide-up"
            afterClose={() => { }}
          >
            <div className="withdraw-noteModal">
              <p>钻石提现上限 = 积分已提现金额*50% - 钻石已提现金额。 (积分已提现0元，钻石已提现0元，当前钻石提现上限为0元）</p>
              <div>
                <button onClick={this.onCloseNote.bind(this)}>知道了</button>
              </div>
            </div>
          </Modal>
      </div>
		);
	}
}

export default createForm()(Withdraw);
