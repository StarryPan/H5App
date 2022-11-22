/**
 * @file 钱包详情页面
 */
import React from 'react';
import {Flex, List, WingBlank, ActivityIndicator, Modal, Toast } from 'antd-mobile';
import Empty from '../../components/Empty'
import { getFetch } from '../../service/request'
import API from '../../service/api'
import './style.less';

import StarImg from '../../images/star.png'
import YunImg from '../../images/yun.png'
import GiftImg from '../../images/gift.png'
import HeaderView from "../../components/HeaderView";

const Item = List.Item
const Brief = Item.Brief


const unitImg = {
  "GIFT": GiftImg,
  "BALANCE": StarImg,
  "CASH": YunImg
}

export default class WithdrawDetail extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      dataList: [],
    }
  }
  componentDidMount(){
    this.getDetail()
  }
  getDetail() {
    Toast.loading()
    getFetch(API.withdrawalLists).then((data)=>{
      this.setState({
        loading: false,
        dataList: data || [],
      })
      Toast.hide()
    }).catch((err) => {
      this.setState({
        loading: false,
      })
      Toast.hide()
    })
    this.setState({
      loading: false,
    })
  }
  chanageTab = (type)=>{
    if(type !== this.state.tabType) {
      this.setState({
        tabType: type
      })
    }
  }
  onBack() {
      this.props.history.goBack()
  }
  alert = (message)=>{
    Modal.alert('', message,[{
      text: '确定'
    }])
  }
	render() {
      const {loading, dataList, tabType} = this.state
      if (loading) {
        return (
            <ActivityIndicator
                toast
                text="Loading..."
                animating={loading}
            />
        )
      }
      return (
          <div>
            <HeaderView
                title={"提现明细"}
                onBack = {this.onBack.bind(this)}
                // fixed
            />
            <p className="topnote">如遇节假日，到账时间顺延至第1个工作日</p>
            <WingBlank size='lg'>
              {(!loading && dataList.length) ? (
                  <List className="withdraw-list">
                    {dataList.map((item, index) => {
                      const status = item.status
                      return (
                          <Item
                              key={index}
                              extra={
                                <div className="r-view">
                                  {status === 0 && item.desc && (
                                      <div className="inlineb">
                                        <p>审核中</p>
                                        <p className="desc">({item.desc})</p>
                                      </div>
                                  )}
                                  {status === 0 && !item.desc && (
                                      <p>审核中</p>
                                  )}
                                  {status === 1 && (
                                      <p className="pass">打款成功</p>
                                  )}
                                  {status === 2 && item.desc && (
                                      <div className="inlineb">
                                        <p>审核拒绝</p>
                                        <p className="desc warn">({item.desc})</p>
                                      </div>
                                  )}
                                  {status === 2 && !item.desc && (
                                      <p>审核拒绝</p>
                                  )}
                                    {status === 3 && item.desc && (
                                        <div className="inlineb">
                                            <p>打款中</p>
                                            <p className="desc">({item.desc})</p>
                                        </div>
                                    )}
                                    {status === 3 && !item.desc && (
                                        <p>打款中</p>
                                    )}
                                    {status === 4 && item.desc && (
                                        <div className="inlineb">
                                            <p>打款失败</p>
                                            <p className="desc warn">({item.desc})</p>
                                        </div>
                                    )}
                                    {status === 4 && !item.desc && (
                                        <p>打款失败</p>
                                    )}
                                </div>
                              }>
                            {item.title}
                            <Brief>{item.ctime}</Brief>
                          </Item>
                      )
                    })}
                  </List>
              ) : (
                  <div className="empty-view">
                  </div>
              )}
            </WingBlank>
          </div>
      );
    }
}
