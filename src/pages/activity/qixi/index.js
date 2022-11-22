/**
 * @file 七夕活动-规则
 */
import React from 'react';
import './index.less';
import { Link } from "react-router-dom";
import AvatarPng from '../../../images/avatar.png'
import ExpPng from '../../../images/activity/qixi/exp.png'

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
      <div className='qixi qixi-index'>
        <div className='top'>
          <Link className='rulebtn' to={`/activity/qixi/rule/${type}`}>活动规则</Link>
        </div>
        <div className='cont'>
          <div className='tt'></div>
          <p className='note'>七夕期间送专属礼物，双方都可得头像框，快去送给你亲爱的吧！</p>
          <ul className='lis'>
            <li className='flex-box t'>
              <span className='flex2'>礼物名称</span>
              <span className='flex3'>头像展示区域</span>
              <span className='flex2'>有效期</span>
            </li>
            <li className='flex-box'>
              <div className='flex2'>
                <span className='nlzv'></span>
                <p>鹊桥相会</p>
              </div>
              <div className='flex3 mid'>
                <span className='img'>
                  <img src={AvatarPng} />
                  <i className='n'></i>
                </span>
              </div>
              <div className='flex2'>活动结束</div>
            </li>
            <li className='flex-box'>
              <div className='flex2'>
                <span className='htyx'></span>
                <p>比翼双飞</p>
              </div>
              <div className='flex3 mid'>
                <span className='img'>
                  <img src={AvatarPng} />
                  <i className='h'></i>
                </span>
              </div>
              <div className='flex2'>活动结束</div>
            </li>
            <li className='flex-box'>
              <div className='flex2'>
                <span className='ydqx'></span>
                <p>缘定七夕</p>
              </div>
              <div className='flex3 mid'>
                <span className='img'>
                  <img src={AvatarPng} />
                  <i className='y'></i>
                </span>
              </div>
              <div className='flex2'>活动结束</div>
            </li>
          </ul>
        </div>
        <div className='cont v2'>
          <div className='tt v2'></div>
          {type === 'male' ? (
            <p className='note v2'>七夕活动期间，加油进入榜单前<span>100</span>，成为最佳情侣哦~</p>
          ) : (
            <p className='note v2'>活动期间，礼物会额外获得<span>3</span>%积分奖励， 活动结束后自动发放！</p>
          )}

          <span className='btn'>活动示例</span>
          <span className='notes3'>恭喜你们成为七夕最佳情侣！愿你们永浴爱河</span>
          <div className='exp flex-box'>
            <img src={ExpPng} />
            <div>
              <p>礼物值</p>
              <p>28888888</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
 