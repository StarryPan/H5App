/**
 * @file 钱包详情页面
 */
import React from 'react';
import {Flex, List, WingBlank, ActivityIndicator, Modal, ListView } from 'antd-mobile';
import Empty from '../../components/Empty'
import { getFetch } from '../../service/request'
import API from '../../service/api'
import './style.less';

import ZsImg from '../../images/my/zsicon.png'
import JfImg from '../../images/my/jficon.png'
import GImg from '../../images/my/gicon.png'
import GiftImg from '../../images/gift.png'
import {getAccountInfo} from "../../common/bridge";

const Item = List.Item
const Brief = Item.Brief


const unitImg = {
    "GIFT": ZsImg,
    "BALANCE": JfImg,
    "CASH": GImg
}

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
      tabType: 'CONSUME',
      summer:true,
      offset: 0,
    }
  }
  async componentDidMount() {
    var info = await getAccountInfo()
    if (info.summer==0) {
      this.setState({
        summer: parseInt(info.summer),
        tabType: 'ALL'
      }, ()=> {
        this.getDetail()
      })
    } else {
      this.getDetail()
    }
  }
  getDetail() {
    const { offset, tabType, dataList } = this.state
    getFetch(API.walletDetail, {
      offset: offset,
      type: tabType,
    }).then((data)=>{
      data.result.forEach((item, index) => {
        item._id = offset + index
      })
      this.setState({
        loading: false,
        isMoreLoading: false,
        dataList: dataList.concat(data.result || []),
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
          <img src={unitImg[item.unit]} alt='' />
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
	render(){
    const { loading, dataList, tabType, summer  } = this.state
    console.log('dataList', dataList)
    const dataSource = this.state.dataSource.cloneWithRows(dataList);
		return(
      <div>
        { summer ? (
            <Flex justify='center' align='center' className='wallet-tab'>
              {/*<Flex.Item onClick={()=>{this.chanageTab('ALL')}} className={["item", tabType === "ALL" && "active"]}>全部</Flex.Item>*/}
              {/*<Flex.Item onClick={()=>{this.chanageTab('INCOME')}} className={["item", tabType === "INCOME" && "active"]}>获得</Flex.Item>*/}
              <Flex.Item onClick={()=>{this.chanageTab('CONSUME')}} className={["item", tabType === "CONSUME" && "active"]}>消耗</Flex.Item>
              <Flex.Item onClick={()=>{this.chanageTab('PAY')}} className={["item", tabType === "PAY" && "active"]}>充值</Flex.Item>
            </Flex>
        ) : (
            <Flex justify='center' align='center' className='wallet-tab'>
              <Flex.Item onClick={()=>{this.chanageTab('ALL')}} className={["item", tabType === "ALL" && "active"]}>全部</Flex.Item>
              <Flex.Item onClick={()=>{this.chanageTab('INCOME')}} className={["item", tabType === "INCOME" && "active"]}>获得</Flex.Item>
              <Flex.Item onClick={()=>{this.chanageTab('CONSUME')}} className={["item", tabType === "CONSUME" && "active"]}>消耗</Flex.Item>
              <Flex.Item onClick={()=>{this.chanageTab('PAY')}} className={["item", tabType === "PAY" && "active"]}>充值</Flex.Item>
            </Flex>
        )}

        { !loading && (
          dataList.length ? (
            <ListView
              className="wallet-list"
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
              <Empty message = "暂无明细" />
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
