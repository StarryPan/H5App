/**
 * @file 七夕活动-规则
 */
import React from 'react'
import './style.less'
import { Link } from "react-router-dom"
import { getFetch } from '../../../service/request'
import API from '../../../service/api'
import StarPng from '../../../images/activity/summerweek/star.png'

export default class SummerWeek extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      type: 'day',
      rankList: [],
      selfData: {},
      pageno: 1,
      isLastPage: false,
      loading: true,
    }
    this.loaded = true
  }
  componentDidMount(){
    this.getData()
    document.addEventListener('scroll', (e) => {
      if (this.loaded || this.state.isLastPage) return
      const scroll = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
      const clientHeight = document.body.clientHeight
      const scrollHeight = document.body.scrollHeight
      if (scrollHeight - clientHeight - scroll < 200 && !this.state.isLastPage) {
        this.loaded = true
        this.setState({
          loading: true,
          pageno: this.state.pageno + 1
        }, () => {
          this.getData()
        })
      }
    })
  }
  async getData() {
    try {
      const getRes = await getFetch(API.getSummerWeekRank, {
        type: this.state.type,
        page: this.state.pageno,
        size: 20,
      })
      this.setState({
        rankList: this.state.rankList.concat(getRes.list),
        selfData: getRes.selfData,
        loading: false,
        isLastPage: getRes.list.length < 20 || this.state.pageno >= 10,
      })
      this.loaded = false
    } catch (e) {
      this.setState({
        loading: false,
      }) 
      this.loaded = false
    }
  }
  tabChange = (type) => {
    if (this.state.type === type) return
    this.loaded = true
    this.setState({
      type,
      pageno: 1,
      rankList: [],
      loading: true,
      isLastPage: false,
    }, ()=>{
      this.getData()
    })
  }
  render() {
    const { type, rankList, selfData, loading, isLastPage } = this.state
    const { day_rank, all_rank, day_score, all_score } = selfData
    return (
      <div className='summer-week summer-week-rank'>
        <div className='top-note'>活动期间，积分收益会额外获得2%奖励！</div>
        <div className='tr'>
          <Link to={`/activity/summerWeek/rule`}><div className='rule'>活动规则</div></Link>
        </div>
        <div className='top flex-box'>
          <div className='flex1'>
            <div className='dt'>日榜<span>（每天0点刷新）</span></div>
            <div className='iteml'>
              <h2>排名：{day_rank ? day_rank : '--'}</h2>
              <p> <img src={StarPng} />收入：<strong>{day_score ? day_score : 0}</strong></p>
            </div>
          </div>
          <div className='flex1'>
            <div className='zt'>总榜<span>（直至活动结束）</span></div>
            <div className='itemr'>
              <h2>排名：{all_rank ? all_rank : '--'}</h2>
              <p> <img src={StarPng} />收入：<strong>{all_score ? all_score : 0}</strong></p>
            </div>
          </div>
        </div>
        <div className='flex-box tabview'>
          <div className={`flex1 tabd${type === 'day' ? ' active' : ''}`} onClick={() => this.tabChange('day')}>日榜</div>
          <div className={`flex1 tabz${type === 'all' ? ' active' : ''}`} onClick={() => this.tabChange('all')}>总榜</div>
        </div>
        <ul className={`list ${type}`}>
          <li className='flex-box t'>
            <div className='flex1'>排名</div>
            <div className='flex1'>用户昵称</div>
            <div className='flex1'>积分收益</div>
          </li>
          { rankList.map((item, index) => {
            const isActive = (type === 'day' && item.rank === day_rank) || (type === 'all' && item.rank === all_rank)
            return (
              <li key={item.rank} className={`flex-box ${isActive ? 'active' : ''}`}>
                {index <= 2 ? (
                  <div className={`flex1 rank${index}`}><i></i></div>  
                ) : (
                  <div className='flex1'><span className='num'>{item.rank}</span></div>
                )}
                <div className='flex1'>{item.nickName}</div>
                <div className='flex1'>{item.score}</div>
              </li>
            )
          }) }
          { (isLastPage && rankList.length === 0) && (
            <li className='tc noresult'>暂无数据</li>
          )}
          {loading && (
            <li className='tc loading'>加载中...</li>
          )}
        </ul>
      </div>
    )
  }
}
  