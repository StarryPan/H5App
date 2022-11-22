/**
 * @file 帮助中心页面
 */
import React from 'react';
import {List, WingBlank, Modal, Toast} from 'antd-mobile'
import MaleConfig from './config/male'

import KefuImg from '../../images/kefu.png'

import './style.less';
import {getAccountInfo, isAndroid, openURL} from "../../common/bridge";
const Item = List.Item
export default class HelpCenter extends React.Component{
  constructor(props){
    super(props);
    console.log('props',props)
    this.state = {
      modalContent: '',
        summer: true
    }
  }
    async componentWillMount() {
        await this.getData();
    }
    async getData() {
        var info = await getAccountInfo()
        if (info.summer==0) {
            this.setState({
                summer: parseInt(info.summer)
            })
        }
    }
  onBack() {

  }
  onCloseModal() {
    this.setState({
      modalContent: '',
    })
  }
  showQuestion(data) {
    this.setState({
      modalContent: data
    })
  }
  customerAction() {
      if (isAndroid()) {
          window.location.href = 'http://api.miyijiaoyou.com/chatlink.html'
      } else {
          openURL('r_kefu')
      }
  }
	render(){
    const { modalContent,summer } = this.state;
		return(
      <div>
        <WingBlank size='lg'>
            {!summer && (
                <List renderHeader={() => '热门问题'} className="qa-list">
                    { MaleConfig.hot.map((item, index) => {
                        return (
                            <Item arrow="horizontal" key = {index} onClick={() => {this.showQuestion(item)}}>{item.title}</Item>
                        )
                    })
                    }
                </List>
            )}

          <List renderHeader={() => '平台相关'} className="qa-list pb">
          { MaleConfig.platform.map((item, index) => {
                return (
                  <Item arrow="horizontal" key={index} onClick={() => {this.showQuestion(item)}}>{item.title}</Item>
                )
              })
            }
              {!summer &&  MaleConfig.platform2.map((item, index) => {
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
          {!isAndroid() && (
              <div className="customer-service" onClick={this.customerAction.bind(this)}>
                  <img src={KefuImg} alt='' />
              </div>
          )}
      </div>
		);
	}
}
