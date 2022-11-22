/**
 * @file 帮助中心页面
 */
import React from 'react';
import {List, WingBlank, Modal, Toast} from 'antd-mobile'
import FeMaleConfig from './config/cfg'

import KefuImg from '../../images/kefu.png'

import './style.less';
import {getAccountInfo, isAndroid, openURL} from "../../common/bridge";
const Item = List.Item
export default class HelpCenter extends React.Component{
  constructor(props){
    super(props);
    console.log('props',props)
    this.state = {
      modalContent: ''
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
          <List renderHeader={() => '防骗中心'} className="qa-list pb">
              <Item arrow="horizontal" onClick={() => {window.location.href = 'http://api.miyijiaoyou.com/web/page/fangpianzhongxinone'}}>诱导暗示等欺骗类型</Item>
              <Item arrow="horizontal" onClick={() => {window.location.href = 'http://api.miyijiaoyou.com/web/page/fangpianzhongxintwo'}}>禁止加微信转账等涉骗行为</Item>
              <Item arrow="horizontal" onClick={() => {window.location.href = 'http://api.miyijiaoyou.com/web/page/fangpianzhongxinthree'}}>快速交友方式诈骗</Item>
              <Item arrow="horizontal" onClick={() => {window.location.href = 'http://api.miyijiaoyou.com/web/page/fangpianzhongxinfour'}}>假借平台名义欺诈</Item>
              <Item arrow="horizontal" onClick={() => {window.location.href = 'http://api.miyijiaoyou.com/web/page/fangpianzhongxinfive'}}>其他类型欺骗行为</Item>
          </List>
          </WingBlank>
          <WingBlank size='lg'>
            {!summer && (
                <List renderHeader={() => '热门问题'} className="qa-list">
                    { FeMaleConfig.hot.map((item, index) => {
                        return (
                            <Item arrow="horizontal" key = {index} onClick={() => {this.showQuestion(item)}}>{item.title}</Item>
                        )
                    })
                    }
                </List>
            )}
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
        {/*<div className="customer-service" onClick={this.customerAction.bind(this)}>*/}
        {/*  <img src={KefuImg} alt='' />*/}
        {/*</div>*/}
      </div>
		);
	}
}
