/**
 * @file 钱包详情页面
 */
import React from 'react';
import {Flex, List, WingBlank, ActivityIndicator, Modal, ListView } from 'antd-mobile';
import Empty from '../../components/Empty'
import { getFetch } from '../../service/request'
import API from '../../service/api'
import './style.less';

import GImg from '../../images/my/gicon.png'

import {getAccountInfo} from "../../common/bridge";

const Item = List.Item
const Brief = Item.Brief

export default class WalletDetail extends React.Component{
  constructor(props){
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1._id !== row2._id,
  });
    this.state = {
      loading: true,
      isMoreLoading: false,
      dataSource,
      dataList: [],
      tabType: 'PAY',
      currencyType: "CASH",
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
          +{item.num}
          {item.unit === 'CASH' ? (
            <span>金币</span>
          ) : item.unit === 'GIFT' ? (
            <span>钻石</span>
          ) : (
            <span>积分</span>
          )}
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
