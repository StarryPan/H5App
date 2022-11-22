/**
 * @file 帮助中心页面
 */
import React from 'react';
import { List, WingBlank, Modal } from 'antd-mobile'
import MaleConfig from './config/male'
import FeMaleConfig from './config/femal'

import KefuImg from '../../images/kefu.png'

import './style.less';
const Item = List.Item

let u = navigator.userAgent;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   //判断是否是 android终端
let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);     //判断是否是 iOS终端
export default class HelpCenter extends React.Component{
  constructor(props){
    super(props);
    console.log('props',props)
    this.state = {
      modalContent: '',
      gender: props.match.params.type || 'male',
      isIOS,
    }
  }
  componentDidMount(){
  }
  onBack() {

  }
  onCloseModal() {
    this.setState({
      modalContent: ''
    })
  }
  showQuestion(data) {
    this.setState({
      modalContent: data
    })
  }
  customerAction() {
    // window.location.href = 'https://chat.meiqia.cn/widget/standalone.html?eid=4a6c0e5675454197bf6d22b1130c0f3b'
      window.location.href = 'http://api.miyijiaoyou.com/chatlink.html'
  }
	render(){
    const { modalContent, gender, isIOS } = this.state;
    const Config = gender === 'male' ? MaleConfig : FeMaleConfig
		return(
      <div>
        {/* <HeaderView
          title={"帮助中心"}
          onBack = {this.onBack.bind(this)}
          fixed
        /> */}
        {/* <WingBlank size='lg' className="paddingHeader"> */}
        <WingBlank size='lg'>
          {/*<List renderHeader={() => '热门问题'} className="qa-list">*/}
            {/*{ Config.hot.map((item, index) => {*/}
                {/*return (*/}
                  {/*<Item arrow="horizontal" key = {index} onClick={() => {this.showQuestion(item)}}>{item.title}</Item>*/}
                {/*)*/}
              {/*})*/}
            {/*}*/}
          {/*</List>*/}
          <List renderHeader={() => '平台相关'} className="qa-list pb">
          { Config.platform.map((item, index) => {
                return (
                  <Item arrow="horizontal" key={index} onClick={() => {this.showQuestion(item)}}>{item.title}</Item>
                )
              })
            }
              <Item arrow="horizontal" onClick={() => {window.location.href = 'https://api.miyijiaoyou.com/web/user/userAgreement'}}>用户协议</Item>
              <Item arrow="horizontal" onClick={() => {window.location.href = 'https://api.miyijiaoyou.com/web/user/privacy_agreement'}}>隐私政策</Item>
              <Item arrow="horizontal" onClick={() => {window.location.href = 'https://api.miyijiaoyou.com/web/user/summary'}}>隐私政策（摘要）</Item>
          </List>
        </WingBlank>
        {modalContent && (
          <Modal
            popup
            className="q-modal"
            visible={modalContent}
            onClose={this.onCloseModal.bind(this)}
            animationType="slide-up"
            afterClose={() => { }}
          >
            <div className="qcontent-view">
              {/* <span className="close"></span> */}
              <h3>{modalContent.title}</h3>
              <div>
                {modalContent.content.map((item, index) => {
                  return (
                    <ul key={index}>
                      <li>
                        {item.desc}
                        {item.notes && (
                          <p className='note'>{item.notes}</p>
                        )}
                        {item.img && item.img.map((img, index) => {
                          return (
                            <div key={`img${index}`}>
                              <img src={img} alt='' />
                            </div>
                          )
                        })}
                        {item.tips && item.tips.map((tip, index)=>{
                          return (
                            <p className='tip' key={`tip${index}`}>{tip}</p>
                          )
                        })}
                      </li>
                    </ul>
                  )
                })}
              </div>
            </div>
          </Modal>
        )}
        {isIOS && (
          <div className="customer-service" onClick={this.customerAction.bind(this)}>
            <img src={KefuImg} alt='' />
          </div>
        )}
      </div>
		);
	}
}
