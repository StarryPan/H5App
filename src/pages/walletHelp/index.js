/**
 * @file 钱包帮助页面
 */
import React from 'react';
import { WingBlank } from 'antd-mobile';
import './style.less';

import TitleImg from '../../images/wallet/help_title.png'
import HeadImg from '../../images/wallet/help_head.png'
import OneImg from '../../images/wallet/help_one.png'
import TwoImg from '../../images/wallet/help_two.png'
import ThreeImg from '../../images/wallet/help_three.png'
import KefuImg from '../../images/kefu.png'
import {openURL} from "../../common/bridge";

export default class WalletDetail extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
  }

  openPay(){
    openURL("r_charge")
  }

  render() {
    return (
      <div className="wallet-help-view">
        <div className="head">
          <img src={HeadImg} alt='' />
        </div>
        <div className="content">
          <div className="title">
            <img src={TitleImg} alt='' />
          </div>
          <WingBlank size="md">
            <p className="note">即日起首充任意一笔金额即获赠礼包！单笔充值300 及以上更享豪气冲天礼包，充值多多，福利多多！</p>
          </WingBlank>
          <WingBlank size="md">
            <div className="wallet-help-item">
              <div className="img">
                <img src={OneImg} alt='' />
              </div>
              <h3>首冲礼包</h3>
              <p className="exp">首充任意一笔金额，即可获得首充大礼包！</p>
              <p className="info">2000金币奖励 、2000钻石奖励</p>
              <div className="tc">
                <button onClick={this.openPay.bind(this)}>立即领取</button>
              </div>
            </div>
            <div className="wallet-help-item">
              <div className="img">
                <img src={TwoImg} alt='' />
              </div>
              <h3>新人充值礼包</h3>
              <p className="exp">10-100元各档位首次充值<span className="info">额外奖励10%</span></p>
              <div className="tc">
                <button onClick={this.openPay.bind(this)}>立即领取</button>
              </div>
            </div>
            <div className="wallet-help-item">
              <div className="img">
                <img src={ThreeImg} alt='' />
              </div>
              <h3>豪气冲天礼包</h3>
              <p className="exp">单笔充值300及以上即享豪气冲天礼包！</p>
              <p className="info">5天豪气冲天标志</p>
              <div className="tc">
                <button onClick={this.openPay.bind(this)}>立即领取</button>
              </div>
            </div>
          </WingBlank>
        </div>
      </div>
    )
  }
}
