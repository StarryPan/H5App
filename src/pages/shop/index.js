/**
 * @createdAt 2021-01-17
 * @file 排行榜
 */
import React from 'react'
import './style.less'

import API from '../../service/shopApi';
import { postFetch, getFetch } from '../../service/request'
import BannerPng from '../../images/shop/banner.png'
import GoldPng from '../../images/shop/gold.png'
import StarPng from '../../images/shop/star.png'
import { Toast } from 'antd-mobile'
import HeaderView from '../../components/HeaderView'
import { openURL } from '../../common/bridge'

export default class ShopIndex extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showHyy: false,
      activeTab: 1,
      tabs: [],
      standbyData: null,
      chooseType: 1, // 1-自己 2-蜜友
      selectData: null,
      showSearch: false,
      searchValue: '',
      searchResult: '',
      friend: null,
      dataList: [],
      loading: true,
    }
  }
  componentDidMount(){
    this.getData()
  }
  async getData(type) {
    Toast.loading()
    try {
      const getRes = await getFetch(API.getList)
      Toast.hide()
      const { cfg_goods, cfg_tabs } = getRes
      if (!this.state.tabs.length) {
        this.setState({
          tabs: cfg_tabs.map((item) => ({
            id: item.id,
            name: item.name,
          })),
          activeTab: cfg_tabs[0].id,
        })
      }
      this.setState({
        dataList: cfg_goods.map((item) => ({
          id: item.id,
          name: item.name,
          icon: item.icon,
          tabid: item.tab_id,
          isgive: item.is_give,
          cost: item.cost,
          tag: item.tag,
          expday: item.expiration_day,
        })),
        loading: false,
      })
    } catch (e) {
      Toast.hide()
      this.setState({
        dataList: [],
        loading: false,
      })
    }
  }
  changeTab(type) {
    this.setState({
      activeTab: type,
    }, () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      // this.getData(this.state.activeTab)
    })
  }
  hideHym = () => {
    this.setState({
      showHyy: false
    })
  }
  closeAction = () => {
    this.setState({
      selectData: null,
    })
  }
  giveAction(data) {
    this.setState({
      showSearch: true,
      standbyData: data,
    })
  }
  buyAction(data) {
    this.setState({
      selectData: data,
      chooseType: 1,
      friend: null,
    })
  }
  chooseFriend() {
    this.setState({
      showSearch: false,
      selectData: this.state.standbyData,
      standbyData: null,
      chooseType: 2,
    })
  }
  changeChooseType(type) {
    this.setState({
      chooseType: type,
    })
  }
  searchValue (e) {
    this.setState({
      searchValue: e.currentTarget.value,
    })
  }
  searchUser = async ()=> {
    if (!this.state.searchValue) {
      return
    }
    try {
      const searchRes = await postFetch(API.searchUser, {
        targetId: this.state.searchValue,
      })
      console.log('searchRes', searchRes)
      this.setState({
        searchResult: '',
        friend: searchRes,
      })
    } catch (e) {
      this.setState({
        searchResult: e.message,
        friend: null,
      })
    }
  }
  hideSearch() {
    this.setState({
      showSearch: false,
      friend: null,
      searchResult: '',
    })
  }
  hidePay() {
    this.setState({
      selectData: null,
    })
  }
  buy = async (type) => {
    const { selectData } = this.state
    this.setState({
      selectData: null,
    })
    Toast.loading()
    try {
      const buyRes = await postFetch(API.buyGoods, {
        goodsId: selectData.id,
        costType: type,
        targetId: this.state.chooseType === 1 ? 0 : this.state.friend.id
      })
      Toast.hide()
      Toast.show('购买成功')
    } catch (e) {
      Toast.hide()
      Toast.show(e.message)
    }
  }
  showHyyAction() {
    this.setState({
      showHyy: true,
    })
  }
  goToMy() {
    // const domain = `${window.location.protocol}://${window.location.host}`
    // openURL(`${domain}/#/shop/my?isHideT=1`)
    window.document.location.href = "/#/shop/my?isHideT=1"
  }
  render(){
  const { activeTab, tabs, dataList, showHyy, friend, selectData, showSearch, chooseType, searchResult, loading } = this.state
  const showData = dataList.filter((item) => item.tabid === activeTab)
    return (
      <div className='shop-index'>
        <HeaderView
          hideBack={true}
          title={"道具"}
          fixed
          rightContent = {{
            title: '我的道具',
            onClick: () => {
              this.goToMy()
            }
          }}
        />
        <div className='inner'>
          <div className='header'>
            <img src={BannerPng} />
          </div>
          <div className='shop-menu'>
            {tabs.map((item) => {
              return (
                <span key={item.id} onClick={ () => this.changeTab(item.id) } className={activeTab === item.id ? 'active' : ''}>{item.name}</span>
              )
            })}
            <span className='wh' onClick={this.showHyyAction.bind(this)}></span>
          </div>
          <ul className='content'>
            { showData.map((item) => {
              return (
                <li className='shop-item v1' key={item.id}>
                  <div className='img'>
                    <img src={item.icon} />
                  </div>
                  <p>{item.name}</p>
                  <div className='v'>
                    <span>{item.cost}</span>
                  </div>
                  <div className='btns'>
                    <span className='l' onClick={() => this.giveAction(item)}>送给蜜友</span>
                    <span className='r' onClick={() => this.buyAction(item)}>立即购买</span>
                  </div>
                  <p className='ex'>佩戴有效期{item.expday}天</p>
                </li>
              )
            }) }
            { !showData.length && !loading && (
              <li className='shop-empty'>
                <div className='bg'></div>
                <p>暂无相关道具</p>
              </li>
            ) }
          </ul>
        </div>
        { showHyy && (
          <div className='mask'>
            <div className='shop-hym'>
              <div className='timg'></div>
              <ul className='ct'>
                <li>本商品为虚拟商品，一经购买， 不予退还</li>
                <li>如有问题，请联系 客服</li>
                <button onClick={this.hideHym} className='btn'>我知道了</button>
              </ul>
              <span className='sm'>购买说明</span>
            </div>
          </div>
        )}
        { !!showSearch && (
          <div className='mask' onClick={() => this.hideSearch()}>
            <div className='shop-search' onClick={(e) => e.stopPropagation()}>
              <div className='input'>
                <input onChange={(e) => this.searchValue(e) } placeholder='输入好友ID查询' />
                <button onClick={this.searchUser}>搜索</button>
              </div>
              {!!friend ? (
                <div className='ybox'>
                  <div className='y'>
                    <img src={friend.headImage} />
                    <div className='yif'>
                      <p className='name'>{friend.nickName}</p>
                      <p className='id'>id: {friend.id}</p>
                    </div>
                  </div>
                  <button onClick={() => this.chooseFriend(friend)}>确 定</button>
                </div>
              ) : (
                <p className='sm'>{ searchResult || '输入蜜友ID，即可进行赠送哦~'}</p>
              )}
            </div>
          </div>
        )}
        { !!selectData && (
          <div className='mask bottom' onClick={(e) => this.hidePay()}>
            <div className='shop-pay' onClick={(e) => e.stopPropagation()}>
              <div className="itimg">
                <img src={selectData.icon} />
                <p>{selectData.name}</p>
              </div>
              <div className='ct'>
                <i className='close' onClick={this.closeAction}></i>
                <p className='p'><span>￥</span>{selectData.cost}</p>
                <div className='info'>
                  <span>头像框有效期</span>
                  <span className='tag active'>{selectData.expday}天</span>
                </div>
                <div className='info'>
                  <span>选择对象</span>
                  <span onClick={ () => this.changeChooseType(1) } className={chooseType === 1 ? 'tag active' : 'tag'}>自己</span>
                  { !!friend && (
                    <span onClick={ () => this.changeChooseType(2) } className={chooseType === 2 ? 'tag v2 active' : 'tag v2'}><img src={ friend.headImage } />{ friend.nickName }</span>
                  ) }
                </div>
                <div className='shop-pay-way'>
                  支付方式
                  <div>
                    <span onClick={() => this.buy(0)} className='gb'><img src={GoldPng} />金币</span>
                    <span onClick={() => this.buy(1)} className='jf'><img src={StarPng} />积分</span>
                  </div>
                  <p className="sub">购买则表示同意 <span>《充值服务协议》</span></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}