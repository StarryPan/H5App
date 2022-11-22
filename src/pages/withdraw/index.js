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
import {openCert} from "../../common/bridge";

class Withdraw extends React.Component{
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
      account: '', //提现账号
      freezeMoney: 0,
      isWithdrawal: false,
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
        freezeMoney: res.info.freezeMoney ? +res.info.freezeMoney : 0,
        isWithdrawal: res.info.is_withdrawal
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
      if (this.state.tabType === 'rainbow') {
        this.exchange(value.money)
      } else {
        this.withdrawal(value.money)
      }
    });
  }
  smallSubmit() {
    Toast.loading()
    postFetch(API.smallWithdrawal, {
    }).then(async (res) => {
        Toast.hide()
      if(!res.error){
        this.alert("提现成功");
        this.getData();
        return;
      }
      let certStatus = await openCert(res.data.type);
      if(!certStatus){
          this.alert(res.data.msg);
      }
    }).catch((err) => {
      Toast.hide();
      if(err.code === 401) {
        this.setState({
          showLogin: true
        })
      } else {
        this.alert(err.message)
      }
    })
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

    Toast.loading()
    postFetch(API.withdrawal, {
      money: money,
      type:type
    }).then(async (res) => {
        Toast.hide()
      if(!res.error){
          this.alert("提现成功");
          this.getData();
          this.props.form.resetFields()
          return;
      }
      let certStatus = await openCert(res.data.type);
      if(!certStatus){
          this.alert(res.data.msg);
      }
    }).catch((err) => {
      Toast.hide();
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
  gotoBindAlipay() {
    window.location.href = './#/bindAccount'
  }
  gotoWalletDetail() {
    window.location.href = './#/withdrawDetail'
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
  gotoProtocol() {
    window.location.href = "http://oss.miyijiaoyou.com/prod/web_withdraw/xb_protocol.html"
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
  showFixStarFloat() {
    Modal.alert('冻结积分说明', '当前因男用户发起投诉举报，冻结相关收益金额',[{
      text: '我知道了'
    }])
  }
	render(){
    const { tabType, showLogin, account, showNote, status, freezeMoney, isWithdrawal } = this.state
    const { getFieldProps } = this.props.form;
    const placeholder = tabType !== 'rainbow' ? '请输入为50整数倍的提现金额' : '请输入积分的数量'
		return(
      <div>
        {status === 1 ? (
            <HeaderView
                title={"提现"}
                onBack = {this.onBack.bind(this)}
                rightContent = {{
                  title: '明细',
                  onClick: () => {
                    this.gotoWalletDetail()
                  }
                }}
                // fixed
            />
        ) : (
          <HeaderView
          title={"提现"}
          onBack = {this.onBack.bind(this)}
          rightContent = {{
          title: '绑定',
          onClick: () => {
          this.gotoBindAlipay()
        }
        }}
          // fixed
          />
          )}

        {status === 1 ? (
            <p className="withdraw-topnote">收款账号：{account} (支付宝)</p>
        ) : (
            <p className="withdraw-topnote">{status===-1 ? '未绑定支付宝账号' : (status===0 ? '支付宝账号审核中' : (status===2 ? '审核失败,请重新绑定' : ''))} </p>
        )}
        <WingBlank size='lg'>
          <div className="withdraw-view">
            <div className="content">
              <div className="tab">
                <span className={ tabType === 'star' ? "active" : ''} onClick={() => this.changetab('star')}>积分提现</span>
                <span className={ tabType === 'cloud' ? "active t2" : ''} onClick={() => this.changetab('cloud')}>钻石提现</span>
                {/*<span className={ tabType === 'rainbow' ? "active t3" : ''} onClick={() => this.changetab('rainbow')}>兑换金币</span>*/}
              </div>
              <Flex className="con">
                <Flex.Item className="tc">
                  <p>{tabType === 'cloud' ? '钻石总额' : (tabType == 'star' ? '积分总额' : '积分总额')}</p>
                  <h3>{tabType === 'cloud' ? this.state.gift : (tabType == 'star' ? this.state.balance : this.state.balance)}</h3>
                </Flex.Item>
                {!!(((tabType === 'star') || (tabType === 'rainbow')) && freezeMoney > 0) && (
                  <Flex.Item className="tc">
                    <p onClick={this.showFixStarFloat}>冻结积分<i>?</i></p >
                    <h3>{freezeMoney}</h3>
                  </Flex.Item>
                )}
                <Flex.Item className="tc">
                  <p>{tabType === 'cloud' ? '可提现(元)' : (tabType == 'star' ? '可提现(元)' : '可兑换(金币)')}</p>
                  <h3>{tabType === 'cloud' ? this.state.gift_money : (tabType == 'star' ? this.state.balance_money : this.state.exchange_cash)}</h3>
                </Flex.Item>
              </Flex>
            </div>
            <div className="cntent">
              { (!isWithdrawal || tabType === 'cloud') && (
                <div className="inputview">
                  <InputItem
                      className="input border"
                      type = "number"
                      {...getFieldProps('money')}
                      placeholder={placeholder}
                  ></InputItem>
                    {tabType === 'rainbow' && (
                        <span>积分</span>
                    )}
                </div> 
              )}
              { (isWithdrawal &&  tabType === 'star') ? (
                <button onClick={this.smallSubmit.bind(this)}>1元快速提现</button>
              ) : (
                <button onClick={this.submit.bind(this)}>提交</button>
              )}
                {tabType === 'rainbow' && (
                    <p className="note2">每日最多可兑换50万积分</p>
                )}
              {/* <p className="note">提现需使用微信扫描二维码完成签约才能打款成功，请按照 步骤完成签约</p>
              <div className="qrcode">
                <img src="https://mohang.oss-cn-hangzhou.aliyuncs.com/mh_prod/web_pic/withdraw/withdraw_code.png" alt="" />
              </div> */}
                {tabType !== 'rainbow' && (
                    <p className="note2">提交即同意<span onClick={this.gotoProtocol.bind(this)}>《合作协议》</span></p>
                )}
              <div className="note3">
                {tabType === 'star' && (
                  <p>1、1000积分=0.94元； <br/> 2、1000钻石=0.5元（钻石为平台免费货币） <br/> 3、钻石提现规则：每提现100元积分才可提现50元钻石； <br/> 4、每天可提现，1-3个工作日到账（遇节假日顺延）</p>
                )}
                {tabType === 'cloud' && (
                  <p>1、1000钻石=0.5元（钻石为平台免费货币） <br/>2、钻石提现规则：每提现100元积分才可提现50元钻石； <br/>3、钻石提现上限 = 积分已提现金额*50% - 钻石已提现金额。</p>
                )}
              </div>
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
              <p>钻石提现上限 = 积分已提现金额*50% - 钻石已提现金额。</p>
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
