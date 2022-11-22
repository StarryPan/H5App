/**
 * @file 暑期末-规则
 */
 import React from 'react';
 import './style.less';
 import { Link } from "react-router-dom";
 import StarPng from '../../../images/activity/summerweek/star.png'

 export default class SummerWeek extends React.Component{
   constructor(props){
     super(props);
     this.state = {
        dataList: [
          { sy: '1000w', p: '12%', kd: '120w+' },
          { sy: '666w', p: '10%', kd: '66.6w+' },
          { sy: '300w', p: '8%', kd: '24w+' },
          { sy: '100w', p: '6%', kd: '6w+' },
          { sy: '66w', p: '5%', kd: '3.3w+' },
          { sy: '30w', p: '4%', kd: '1.2w+' },
          { sy: '10w', p: '3%', kd: '3000+' },
        ],
     }
   }
   componentDidMount(){
   }
   render() {
    const { dataList } = this.state
     return (
       <div className='gq2022 gq2022-index ws'>
        <div className='rule-ul'>
          <div className='tc'>
            <div className='rule-c'></div>
            <ul>
              <li>活动时间：10月29日00:00-11月04日23:59； </li>
              <li>礼物收益：活动收益只计算礼物积分收益； </li>
              <li>奖励到账方式：自动到账； </li>
              <li>奖励发放时间：奖励于次日的上午10点发放；</li>
              <li>活动期间用户的任何违规行为，平台都将取消用户在此次活动的参与资格；</li>
              <li>本活动的最终解释权归本平台所有。</li>
            </ul>
          </div>
        </div>
          <div className='table-bt'></div>
          <div className='table'>
            <p className='cn'>每日礼物<img src={StarPng} />收益奖励，将在次日上午发放至账户内。</p>
            <ul className='ul'>
              <li className='tt flex-box'>
                <span className='flex1'>礼物收益</span>
                <span className='flex1'>奖励比例</span>
                <span className='flex1'>可得奖励</span>
              </li>
              {dataList.map((item) => {
                return (
                  <li key={item.sy} className='flex-box item'>
                    <span className='flex1'>{item.sy}<img src={StarPng} /></span>
                    <span className='flex1'>{item.p}<img src={StarPng} /></span>
                    <span className='flex1'>{item.kd}<img src={StarPng} /></span>
                  </li> 
                )
              })}
            </ul>
          </div>
       </div>
     )
   }
 }
 