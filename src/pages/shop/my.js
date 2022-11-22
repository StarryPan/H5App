/**
 * @createdAt 2021-01-17
 * @file 排行榜
 */
import React from 'react'
import './style.less'

import API from '../../service/shopApi';
import { postFetch, getFetch } from '../../service/request'
import { Toast } from 'antd-mobile'
import HeaderView from '../../components/HeaderView'
import { openURL } from '../../common/bridge'
export default class ShopMy extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hasShowHyy: false,
      activeTab: 1,
      loading: true,
      tabs: [{
        id: 1,
        name: '头像框',
      },{
        id: 2,
        name: '进场特效',
      },{
        id: 3,
        name: '飘窗特效',
      },{
        id: 4,
        name: '称号',
      }],
      friend: null,
      dataList: [],
    }
  }
  componentDidMount(){
    this.getData()
  }
  async getData(type) {
    const getRes = await getFetch(API.getItems)
    if (!getRes) {
      this.setState({
        dataList: []
      })
    } else  {
      this.setState({
        dataList: getRes.map((item) => ({
          id: item.id,
          name: item.name,
          icon: item.icon,
          type: item.type,
          isgive: item.is_give,
          cost: item.cost,
          tag: item.tag,
          status: item.status,
          expday: item.expiration_time
        })),
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
      this.getData(this.state.activeTab)
    })
  }
  async useItem(id) {
    Toast.loading()
    try {
      const useRes = await postFetch(API.useItem, {
        id,
      })
      Toast.hide()
      Toast.show('操作成功')
      this.getData()
    } catch (e) {
      Toast.hide()
      Toast.show(e.message)
    }
  }
  gotoRecord() {
    // const domain = `${window.location.protocol}://${window.location.host}`
    // openURL(`${domain}/#/shop/my?isHideT=1`)
    window.document.location.href = "/#/shop/record?isHideT=1"
  }
  render(){
  const { activeTab, tabs, dataList, loading } = this.state
  const showData = dataList.filter((item) => item.type === activeTab)
    return (
      <div className='shop-index'>
        <HeaderView
          hideBack={true}
          title={"道具"}
          fixed
          rightContent = {{
            title: '购买记录',
            onClick: () => {
              this.gotoRecord()
            }
          }}
        />
        <div className='inner'>
          <div className='shop-menu'>
            {tabs.map((item) => {
              return (
                <span key={item.id} onClick={ () => this.changeTab(item.id) } className={activeTab === item.id ? 'active' : ''}>{item.name}</span>
              )
            })}
          </div>
          <ul className='content'>
            { showData.map((item) => {
              return (  
                <li className='shop-item v2' key={item.id}>
                  <div className={`in t${item.status}`}>
                    <div className='img'>
                      <img src={item.icon} />
                    </div>
                    <p>{item.name}</p>
                    <p className='ex'>{item.expday}</p>
                  </div>
                  {item.status === 0 ? (
                    <button className='btn' onClick={() => this.useItem(item.id)}>使用</button>
                  ) : (
                    <button className='btn' onClick={() => this.useItem(item.id)}>取消使用</button>
                  )}
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
      </div>
    )
  }
}