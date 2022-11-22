import React, {Component} from 'react';
import { Modal, Toast, Tosat } from 'antd-mobile'
import  './style.less';
import API from '../../service/api'
import { postFetch } from '../../service/request'
import Util from '../../common/util';
class LoginView extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showModal: props.visable,
        leaving: false,
        countdown: 0,
      }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
      console.log('getDerivedStateFromProps', nextProps)
      if(nextProps.visable !== this.state.showModal) {
        this.setState({
          showModal: nextProps.visable
        })
      }
    }
    closeAction() {
      this.setState({
        leaving: true,
      }, ()=> {
        setTimeout(()=>{
          this.props.onClose && this.props.onClose()
          this.setState({
            leaving: false,
            showModal: false,
          })
        }, 250)
      })
    }
    async sendSms() {
      const phone = this.refs.phone.value
      if(phone.length !== 11) {
        this.alert('请输入正确的手机号')
        return
      }
      try {
        const sendRes = await postFetch(API.sendSms, {
          phone,
          phoneCheckCodeType: 'LOGIN',
        })
        this.setState({
          countdown: 59,
        })
        this.handle = setInterval(()=> {
          if (this.state.countdown < 1) {
            clearTimeout(this.handle)
          }
          this.setState({
            countdown: this.state.countdown - 1,
          })
        }, 1000)
      } catch(err) {
        this.alert(err.message)
      }
      
    }
    login(){
      const phone = this.refs.phone.value
      const code = this.refs.code.value
      if(phone.length !== 11) {
        this.alert('请输入正确的手机号')
        return
      }
      if(!code.length) {
        this.alert('验证码不能为空')
        return
      }
      postFetch(API.checkLogin, {
        phone,
        checkcode: code,
      }).then((data)=>{
        Util.setLoginCookie(data)
        this.setState({
          showModal: false,
        })
        Toast.show("登录成功")
        this.props.loginSuccess && this.props.loginSuccess()
      }).catch((err)=>{
        this.alert(err.message)
      })
    }
    alert = (message)=>{
      Modal.alert('', message,[{
        text: '确定'
      }])
    }
    render() {
      const { showModal, leaving, countdown } = this.state
      if (!showModal) {
        return null
      }
      return (
        <div className="t-dialog">
          <div className="t-dialog__content">
            <div className={'login-modal' + (leaving ? ' leave' : '')}>
              <div className="login-top"> 登录 </div>
              <div id="login_modal_container" className="login-wrap">
                <ul className="login-input">
                  <li>
                    <input ref='phone' type="text" placeholder="输入手机号" className="input-txt" />
                  </li>
                  <li>
                    <input ref='code' type="text" placeholder="验证码" className="input-txt verifycode"/>
                    {countdown > 0 ? (
                      <span className="Verification">{countdown}s</span>
                    ) : (
                      <span onClick={this.sendSms.bind(this)} className="Verification">获取验证码</span>
                    )}
                  </li>
                  <li>
                    <button className="Receive" onClick={this.login.bind(this)}>登录</button>
                  </li>
                </ul>
              </div>
              <div onClick={this.closeAction.bind(this)} className="login-close"></div>
            </div>
          </div>
        </div>
      )
	}
}

export default LoginView;
