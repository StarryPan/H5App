/**
 * @file 邀请记录
 */
import React from 'react';
import { WingBlank, Flex, Modal } from 'antd-mobile';
import './style.less';
import Empty from '../../components/Empty'

import API from '../../service/api';
import {getFetch} from '../../service/request';

export default class InviteDetail extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      inviteList: [{}],
    }
  }
  componentDidMount(){
    this.getData()
  }
  getData() {
    getFetch(API.inviterecord).then((data)=>{
      this.setState({
        inviteList: data || []
      })
    }).catch((e)=>{
        this.alert(e.message || "网络不给力，请稍后再试");
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
  onBack() {
    this.props.history.goBack()
  }
	render(){
    const { inviteList } = this.state
    return (
      <div>
        {/* <HeaderView
          title={"邀请记录"}
          onBack = {this.onBack.bind(this)}
          fixed
          trans
        /> */}
        <div className="invite-view single">
          <WingBlank size="lg" >
            <div className="invite-list">
              { inviteList.length ? inviteList.map((item, index) => {
                return (
                  <Flex justify="center" className="item bb1" key={index}>
                    <Flex.Item className="mid">
                      <img className="avatar" src={item.head_image} alt='' />{item.nick_name}
                    </Flex.Item>
                    <span className="rig">{item.time}注册</span>
                  </Flex>
                )
              }) : (
                <Empty message = "暂无邀请记录" />
              )}
            </div>
          </WingBlank>
        </div>
      </div>
    )
  }
}