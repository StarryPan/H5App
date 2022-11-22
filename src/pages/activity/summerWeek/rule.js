/**
 * @file 七夕活动-规则
 */
import React from 'react';
import './style.less';
import StarPng from '../../../images/activity/summerweek/star.png'

export default class SummerWeek extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    d: [
      { rank: '1', zvalue: '400w', dvalue: '80w'},
      { rank: '2', zvalue: '300w', dvalue: '50w'},
      { rank: '3', zvalue: '200w', dvalue: '40w'},
      { rank: '4-5', zvalue: '100w', dvalue: '30w'},
      { rank: '6-10', zvalue: '80w', dvalue: '25w'},
      { rank: '11-20', zvalue: '50w', dvalue: '20w'},
      { rank: '21-40', zvalue: '30w', dvalue: '10w'},
      { rank: '41-60', zvalue: '25w', dvalue: '8w'},
      { rank: '61-100', zvalue: '20w', dvalue: '5w'},
      { rank: '101-200', zvalue: '10w', dvalue: '3w'},
    ]
    }
  }
  componentDidMount(){
  }
  render() {
    const { d } = this.state;
    return (
      <div className='summer-week summer-week-rule'>
        <h1>活动期间收益奖励<strong>2%</strong></h1>
        <ul className='note'>
          <li>活动时间：8月26日00:00-9月1日23:59 </li>
          <li>活动期间女用户每日所得的所有积分收益，都将奖励2%的积分，在次日上午发放至账户内 </li>
          <li>活动期间用户的任何违规行为，平台都将取消用户在此次活动的参与资格</li>
          <li>本活动的最终解释权归本平台所有</li>
        </ul>
        <h1>暑期收益排行榜</h1>
        <ul className='note'>
          <li>活动时间：8月26日00:00-9月1日23:59 </li>
          <li>活动收益：活动收益只计算积分收益 </li>
          <li>日榜展示积分收益的前200名，总榜展示积分收益的前200名，从高到低排序，实时更新 </li>
          <li>日榜的计算时间为：活动期间每日的00:00-23:59，奖励发放时间为次日的上午 </li>
          <li>总榜的计算时间为：8月26日00:00-9月1日23:59，奖励发放时间为9月2日的上午 </li>
          <li>活动期间用户的任何违规行为，平台都将取消用户在此次活动的参与资格</li>
          <li>本活动的最终解释权归本平台所有</li>
        </ul>
        <div className='flex-box'>
          <div className='flex1'>
            <ul>
              <li className='dlist'>日榜奖励说明</li>
              <li>
                <span className='k'>排行</span>
                <span className='v'>奖励</span>
              </li>
              {d.map((item) => {
                return (
                  <li key={item.rank}>
                    <span className='k'>{item.rank}</span>
                    <span className='v'>{item.dvalue}<img src={StarPng} /></span>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='flex1'>
            <ul>
              <li className='zlist'>总榜奖励说明</li>
              <li>
                <span className='k'>排行</span>
                <span className='v'>奖励</span>
              </li>
              {d.map((item) => {
                return (
                  <li key={item.rank}>
                    <span className='k'>{item.rank}</span>
                    <span className='v'>{item.zvalue}<img src={StarPng} /></span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
  