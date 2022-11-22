/**
 * @file 七夕活动-规则
 */
import React from 'react';
import './style.less';
import RuleLPng from '../../../images/2022zq/rule-l.png'
import RuleBPng from '../../../images/2022zq/rule-b.png'

export default class SummerWeek extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className='zq2022 zq2022-rule'>
        <img className='l' src={RuleLPng} />
        <div className='tc'>
          <h1>活动期间收益奖励<strong>2%</strong></h1>
        </div>
        <ul className='note'>
          <li>活动时间：9月10日00:00-9月12日23:59； </li>
          <li>活动期间女用户每日所得的所有积分收益，都将奖励2%的积分，在次日上午发放至账户内；</li>
          <li>活动期间用户的任何违规行为，平台都将取消用户在此次活动的参与资格； </li>
          <li>本活动的最终解释权归本平台所有。</li>
        </ul>
        <div className='tc'>
          <h1>中秋限定情侣关系上线</h1>
        </div>
        <ul className='note'>
          <li>活动时间：9月10日00:00-9月12日23:59； </li>
          <li>关系获得：活动男生赠送女生“情侣月饼”礼物，可获得“心动情侣”关系； </li>
          <li>关系时长：3日，到期后关系失效，不可叠加；</li>
          <li>隐私说明：您可以与多个用户创建“心动情侣”关系，关系仅自己可见； </li>
          <li>活动期间用户的任何违规行为，平台都将取消用户在此次活动的参与资格；</li> 
          <li>本活动的最终解释权归本平台所有。</li>
        </ul>
        <img className='b' src={RuleBPng} />
      </div>
    )
  }
}