/**
 * @file 七夕活动-规则
 */
import React from 'react';
import './index.less';

export default class WalletDetail extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      type: props.match.params.type
    }
  }
  componentDidMount(){
  }
  render() {
    const { type = 'male' } = this.state
    return (
      <div className='qixi qixi-rule'>
        {type === 'female' && (
          <div className='topt'>活动期间，礼物会额外获得<span>3</span>%积分奖励，活动结束后自动发放！</div>
        )}
        <div className='top'></div>
        <div className='cont'>
          <div className='rule'></div>
          <h3>-送专属礼物得七夕限定头像框-</h3>
          <div className='item'>
            <p>1.活动时间：<strong>8月4日00:00-8月8日00:00</strong></p>
            <p>2.活动期间送专属礼物，送/收双方皆可获得指定<strong>限定头像框</strong>，活动结束后头像框自动到期；</p>
            <p>3.活动结束后，专属礼物会恢复至原价；</p>
            <p>4.本活动的最终解释权归本平台所有。</p>
          </div>
          <h3>-七夕情侣排行榜-</h3>
          <div className='item'>
            <p>1.礼物值为男女双方累计互送礼物的礼物金额； </p>
            <p>2.排行榜展示礼物值前100的情侣； </p>
            <p>3.排行榜等级从高到低排序，实时更新； </p>
            <p>4.对方无法看到自己与其他用户的礼物值，及与其他用户排行榜信息； </p>
            <p>5.为了保护您的隐私，榜单隐藏个人头像及昵称信息； </p>
            <p>6.榜单终止时间：<strong>2022年8月8日 00:00</strong>； </p>
            <p>7.活动时间：<strong>8月4日00:00-8月8日00:00</strong>； </p>
            <p>8.本活动的最终解释权归本平台所有。</p>
          </div>
        </div>
      </div>
    )
  }
}
 