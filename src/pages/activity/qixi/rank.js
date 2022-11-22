/**
 * @file 七夕活动-规则
 */
import React from 'react';
import './index.less';
import { Link } from "react-router-dom";
import { getFetch } from '../../../service/request'
import API from '../../../service/api'

export default class WalletDetail extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      type: props.match.params.type,
      targetId: props.match.params.targetId,
      dataList: [],
      selfData: null,
      pageno: 1,
      loading: true,
    }
    this.loaded = true
  }
  componentDidMount(){
    this.getData()
    document.addEventListener('scroll', (e) => {
      if (this.loaded || this.state.pageno >= 10) return
      const scroll = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
      const clientHeight = document.body.clientHeight
      const scrollHeight = document.body.scrollHeight
      if (scrollHeight - clientHeight - scroll < 100) {
        this.loaded = true
        this.setState({
          loading: true,
          pageno: this.state.pageno + 1
        }, () => {
          console.log('getData')
          this.getData()
        })
      }
    })
  }
  async getData() {
    try {
      const getRes = await getFetch(API.getQiXiRankInfo, {
        targetId: this.state.targetId,
        page: this.state.pageno,
        size: 10,
      })
      if(getRes.list.length == 0){
        this.state.pageno = 10
      }
      this.setState({
        dataList: this.state.dataList.concat(getRes.list),
        selfData: getRes.selfData,
        loading: false,
      })
      this.loaded = false
    } catch (e) {
      this.setState({
        loading: false,
      }) 
      this.loaded = false
    }
  }
  render() {
    const { type = 'male', dataList, loading, selfData } = this.state
    return (
      <div className='qixi qixi-rank'>
        <div className='top'>
          <Link className='rulebtn v2' to={`/activity/qixi/rule/${type}`}>活动规则</Link>
        </div>
        {!!(selfData && selfData.rank < 10 && selfData.rank !== -1) && (
          <div className='cont v2'>
            <div className='srankbox tc'>
              <span className={`srank${selfData.rank}`}></span>
            </div>
            <p className='tc score'>{selfData.score}</p>
            <div className='c flex-box'>
              <div className='flex1'>
                <span className={`img tp${selfData.femaleHeadType}`}>
                  <img src={selfData.femaleHeadImage} />
                  <i></i>
                </span>
                <p className='f'>{selfData.femaleNickName}</p>
              </div>
              <div className='flex1'>
                <span className='ax'></span>
              </div>
              <div className='flex1'>
                <span className={`img tp${selfData.maleHeadType}`}>
                  <img src={selfData.maleHeadImage} />
                  <i></i>
                </span>
                <p className='m'>{selfData.maleNickName}</p>
              </div>
            </div>
          </div>
        )}
        {!!(selfData && (selfData.rank >= 10 || selfData.rank === -1)) && (
          <div className='cont'>
            <div className='t'>
              <div className={selfData.rank === -1 ? 'l sm' : 'l'}><span>{selfData.rank_text.replace('排名', '')}</span></div>
              <span className='r'>礼物值<strong>{selfData.score}</strong> 
              {!!(selfData.rank === -1 || selfData.rank > 100) && (
                <span>距离上榜 <strong>{selfData.right_score}</strong></span>
              )}
              {!!(selfData.rank !== -1 && selfData.rank > 9 && selfData.rank <= 100) && (
                <span>距离第一 <strong>{selfData.right_score}</strong></span>
              )}
              </span>
            </div>
            <div className='c flex-box'>
              <div className='flex1'>
                <span className={`img tp${selfData.femaleHeadType}`}>
                  <img src={selfData.femaleHeadImage} />
                  <i></i>
                </span>
                <p className='f'>{selfData.femaleNickName}</p>
              </div>
              <div className='flex1'>
                <span className='ax'></span>
              </div>
              <div className='flex1'>
                <span className={`img tp${selfData.maleHeadType}`}>
                  <img src={selfData.maleHeadImage} />
                  <i></i>
                </span>
                <p className='m'>{selfData.maleNickName}</p>
              </div>
            </div>
          </div>
        )}
        <ul className='list'>
          <li className='flex-box list-tit'>
            <div className='flex1'>排名</div>
            <div className='flex2'>用户昵称</div>
            <div className='flex1'>礼物值</div>
          </li>
          {
            dataList.map((item,index) => {
              return (
                <li key={item.rank} className={(selfData?.rank === item.rank) ? 'active flex-box' : 'flex-box'}>
                  <div className={index <= 2 ? 'flex1 rank b' : 'flex1 rank'}><span>{item.rank}</span></div>
                  <div className='flex2 md'>
                    <span className='img2'>
                      <img src={item.femaleHeadImage} />
                      <i className='tp'></i>
                    </span>
                    <span className='txt'>{item.femaleNickName}</span>
                    <span className='img2 two'>
                      <img src={item.maleHeadImage} />
                      <i className='tp'></i>
                    </span>
                    <span className='txt'>{item.maleNickName}</span>
                  </div>
                  <div className='flex1 num'>{item.score}</div>
                </li>
              )
            })
          }
          {loading && (
            <li className='tc loading'>加载中...</li>
          )}
        </ul>
      </div>
    )
  }
}
 