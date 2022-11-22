/**
 * @createdAt 2021-01-17
 * @file 排行榜
 */
import React from 'react'
import './style.less'

import API from '../../service/shopApi';
import { postFetch, getFetch } from '../../service/request'
import HeaderView from '../../components/HeaderView'

export default class ShopRecord extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      activeTab: 1,
      tabs: [{
        id: 1,
        name: '购买',
      },{
        id: 2,
        name: '赠送',
      }],
      standbyData: {
        id: 1,// 商品ID
        tag: 2,// 标签ID（0.普通，1.限时特惠，2.新品上架）
        name: "炫酷头像框",
        cost: 400,// 价格
        is_give: 0,// 是否可以赠送
        icon: "https://miyijiaoyou.oss-cn-beijing.aliyuncs.com/dev/gifts/images/976ab98bd3228db0679b12ed1ad8ab71.webp",
      },
      chooseType: 1, // 1-自己 2-蜜友
      selectData: null,
      showSearch: false,
      searchValue: '',
      searchResult: '',
      friend: null,
      dataList: [],
    }
  }
  componentDidMount(){
    this.getData()
  }
  async getData(type) {
    const getRes = await getFetch(API.buyRecord)
    if (!getRes) {
      this.setState({
        loading: false,
        dataList: []
      })
    } else  {
      this.setState({
        loading: false,
        dataList: getRes.map((item) => ({
          name: item.name,
          targetId: item.target_id,
          cost: item.cost_num,
          type: item.cost_key,
          expday: item.expiration_day,
          createTime: item.ctime,
        }))
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
    })
  }
  render(){
  const { activeTab, tabs, dataList, loading } = this.state
  const showData = dataList.filter((item) => (activeTab === 1 ? !item.targetId : !!item.targetId))
    return (
      <div className='shop-index white'>
        <HeaderView
          hideBack={true}
          title={"购买记录"}
          fixed
        />
        <div className='inner v2'>
          <div className='shop-menu center'>
            {tabs.map((item) => {
              return (
                <span key={item.id} onClick={ () => this.changeTab(item.id) } className={activeTab === item.id ? 'active' : ''}>{item.name}</span>
              )
            })}
          </div>
          <ul className='content'>
            { showData.map((item) => {
              return (  
                <li className='shop-record-item' key={item.id}>
                  <div className='f1'>
                    <div className='ctx'>
                      {item.targetId ? (
                        <p className='name'>赠送给{item.targetId}-{item.name}</p>
                      ) : (
                        <p className='name'>{item.name}</p>
                      )}
                      <p className='tag'>{item.expday}天过期</p>
                    </div>
                    <p className='time'>{item.createTime}</p>
                  </div>
                  <span className='cost'>{item.cost}<i className={item.type}></i></span>
                </li> 
              )
            }) }
            { !showData.length && !loading && (
              <li className='shop-empty'>
                <div className='bg'></div>
                <p>暂无任何购买记录</p>
              </li>
            ) }
          </ul>
        </div>
      </div>
    )
  }
}