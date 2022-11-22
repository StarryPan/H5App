/**
 * @file 暑期末-规则
 */
import React from 'react';
import './style.less';
import { Link } from "react-router-dom";
import UserPng from '../../../images/user.png'
import StarPng from '../../../images/activity/summerweek/star.png'
import ZJBPng from '../../../images/activity/summerweek/zjb.png'
import RJBPng from '../../../images/activity/summerweek/rjb.png'

export default class SummerWeek extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  componentDidMount(){
  }
  render() {
    return (
      <div className='summer-week summer-week-index'>
        <div className='summer-week summer-week-index'>
        <div className='top'>
          <div className='time'>活动时间：8月26日-9月1日</div>
          <br />
          <div className='tr'>
            <Link to={`/activity/summerWeek/rule`}><div className='rule'>活动规则</div></Link>
          </div>
        </div>
        <div className='main'>
          <div className='tit'>活动一</div>
          <div className='content'>
            <h2>活动期间收益奖励<strong>2%</strong></h2>
            <p>活动期间，女用户每日获得的所有<img src={StarPng} />收益奖励2%</p>
            <h3>奖励示例</h3>
            <div className='item'>
              <p>活动每日收益奖励，将在次日上午发放至账户内</p>
              <div className='flex-box'>
                <div className='flex1'>
                  <img className='user' src={UserPng} />
                </div>
                <div className='flex1'>
                  <h4>日收益</h4>
                  <div>
                    <img className='star' src={StarPng} /> 2000
                  </div>
                </div>
                <div className='flex1'>
                <h4>日奖励</h4>
                  <div>
                    <img className='star' src={StarPng} /> 40
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='tit'>活动二</div>
          <div className='content'>
            <h2>暑期排行榜</h2>
            <p>具体发放<img src={StarPng} />数量请至活动规则查看</p>
            <h3>奖励示例</h3>
            <div className='item type2'>
              <p><img className='rjb' src={RJBPng} />日榜 <span>按照每日收入的<img src={StarPng} />排名，发放对应奖励</span></p>
              <div className='flex-box'>
                <div className='flex1'>
                  <h4>排名</h4>
                  <div>
                    <div className='pm'>1</div>
                  </div>
                </div>
                <div className='flex1'>
                  <img className='user' src={UserPng} />
                </div>
                <div className='flex1'>
                  <h4>奖励</h4>
                  <div className='rd'>
                    <img className='star' src={StarPng} /> 80万
                  </div>
                </div>
              </div>
            </div>
            <div className='item type3'>
              <p><img className='zjb' src={ZJBPng} />总榜 <span>按照活动总收入的<img src={StarPng} />排名，发放对应奖励</span></p>
              <div className='flex-box'>
                <div className='flex1'>
                  <h4>排名</h4>
                  <div>
                    <div className='pm'>1</div>
                  </div>
                </div>
                <div className='flex1'>
                  <img className='user' src={UserPng} />
                </div>
                <div className='flex1'>
                  <h4>奖励</h4>
                  <div className='rd'>
                    <img className='star' src={StarPng} /> 400万
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}
