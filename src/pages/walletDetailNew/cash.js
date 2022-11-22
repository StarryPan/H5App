/**
 * @file 钱包详情页面
 */
import React from 'react';
import {Flex, List, WingBlank, ActivityIndicator, Modal, ListView } from 'antd-mobile';
import Empty from '../../components/Empty'
import Util from '../../common/util'
import { getFetch } from '../../service/request'
import API from '../../service/api'
import './style.less';

import {getAccountInfo} from "../../common/bridge";

const Item = List.Item
const Brief = Item.Brief


const unitText = {
  "GIFT": '钻石',
  "BALANCE": '积分',
  "CASH": '金币'
}

const typeMap = {
  coin: "CASH",
  diamond: "GIFT",
  integral: "BALANCE",
}

const Unit = Util.getQueryParams('unit')

export default class WalletDetail extends React.Component{
  constructor(props){
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1._id !== row2._id,
    });
    const type = this.props.match.params.type || 'coin'
    const currencyType = typeMap[type]
    this.state = {
      loading: true,
      isMoreLoading: false,
      dataSource,
      dataList: [],
      tabType: 'INCOME',
      currencyType,
      summer:true,
      offset: 0,
      overall: null,
    }
  }
  async componentDidMount() {
    var info = await getAccountInfo()
    if (info.summer==0) {
      this.setState({
        summer: parseInt(info.summer),
        tabType: 'INCOME',
      }, ()=> {
        this.getDetail()
      })
    } else {
      this.getDetail()
    }
  }
  getDetail() {
    const { offset, tabType, dataList, currencyType } = this.state
    getFetch(API.walletDetailNew, {
      offset: offset,
      type: tabType,
      currency_type: currencyType,
    }).then((data)=>{
      data.result.result.forEach((item, index) => {
        item._id = offset + index
      })
      this.setState({
        loading: false,
        isMoreLoading: false,
        overall: data.result.overall,
        dataList: dataList.concat(data.result.result || []),
        offset: data.offset,
      })
    }).catch((err) => {
      this.setState({
        loading: false,
        isMoreLoading: false,
      })
      this.alert(err.message)
    })
  }
  chanageTab = (type)=>{
    if(type !== this.state.tabType) {
      this.setState({
        tabType: type,
        offset: 0,
        dataList: [],
        loading: true,
      }, ()=>{
        this.getDetail()
      })
    }
  }
  alert = (message)=>{
    Modal.alert('', message,[{
      text: '确定'
    }])
  }
  renderRow(item, sectionID, rowID){
    return (
      <Item
        key={item._id}
        extra = {
        <div className="r-view">
          { item.type === 'CONSUME' ? '-' : '+'}{item.num}
          <span>{unitText[item.unit]}</span>
        </div>
      }>
        {item.desc}
        <Brief>{item.ctime}</Brief>
      </Item>
    )
  }
  renderFooter = ()=>{
    return this.state.isMoreLoading ? (
        <div className="tc">
            <div style={{display: 'inline-block'}}>
                <ActivityIndicator
                    className='tc'
                    text="Loading..."
                />
            </div>
        </div>
    ) : (<div className="tc">没有更多明细了</div>)
  }
  onEndReached = ()=>{
    if (this.state.offset === -1) return
    this.setState({
      isMoreLoading: true
    }, ()=>{
      this.getDetail()
    })
  }
  changeCurrencyType(type) {
    this.setState({
      currencyType: type,
      dataList: [],
      loading: true
    }, ()=> {
      this.getDetail()
    })
  }
	render(){
    const { loading, dataList, tabType, summer, overall, currencyType  } = this.state
    console.log('dataList', dataList)
    const dataSource = this.state.dataSource.cloneWithRows(dataList);

		return(
      <div>
        <div className="wallet-box">
          <Flex justify='center' align='center' className="wallet-tab">
            <Flex.Item onClick={()=>{this.changeCurrencyType('CASH')}} className={["item", currencyType === "CASH" && "active"]}>
              <span>金币</span>
            </Flex.Item>
            <Flex.Item onClick={()=>{this.changeCurrencyType('GIFT')}} className={["item", currencyType === "GIFT" && "active"]}>
              <span>钻石</span>
            </Flex.Item>
            { !summer && (
              <Flex.Item onClick={()=>{this.changeCurrencyType('BALANCE')}} className={["item", currencyType === "BALANCE" && "active"]}>
                <span>积分</span>
              </Flex.Item>
            ) }
          </Flex>
          <Flex justify='center' align='center' className="wallet-tab2">
            <Flex.Item onClick={()=>{this.chanageTab('INCOME')}} className={["item", tabType === "INCOME" && "active"]}>
              <span>获得</span>
            </Flex.Item>
            <Flex.Item onClick={()=>{this.chanageTab('CONSUME')}} className={["item", tabType === "CONSUME" && "active"]}>
              <span>消耗</span>
            </Flex.Item>
          </Flex>
        </div>
        { !loading && (
          dataList.length ? (
            <ListView
              className={tabType === "PAY" ? "wallet-list pay" : "wallet-list"}
              initialListSize = {20}
              dataSource={dataSource}
              renderFooter={this.renderFooter}
              renderRow={this.renderRow}
              pageSize = {10}
              useBodyScroll
              onScroll={() => { console.log('scroll'); }}
              scrollRenderAheadDistance={300}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
              contentContainerStyle = {{backgroundColor: '#FFF'}}
          />
          ) : (
            <div className="empty-view">
              暂无明细
            </div>
          ))
        }
        <ActivityIndicator
          toast
          text="Loading..."
          animating={loading}
        />
      </div>
		);
	}
}
