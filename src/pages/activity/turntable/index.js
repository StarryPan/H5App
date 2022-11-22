/**
 * @file 七夕活动-规则
 */
import React from 'react';
import './index.less';
import {Toast} from 'antd-mobile'

import Gold3Png from '../../../images/activity/turnable/gold3.png';
import Gold5Png from '../../../images/activity/turnable/gold5.png';
import Gold9Png from '../../../images/activity/turnable/gold9.png';
import Sale3Png from '../../../images/activity/turnable/sale3.png';
import Sale5Png from '../../../images/activity/turnable/sale5.png';
import Sale8Png from '../../../images/activity/turnable/sale8.png';
import GiftFZPng from '../../../images/activity/turnable/gift_fz.png';
import GiftFPng from '../../../images/activity/turnable/gift_f.png';
import GiftSPng from '../../../images/activity/turnable/gift_s.png';
import GiftMPng from '../../../images/activity/turnable/gift_m.png';
import { getFetch, postFetch } from '../../../service/request';
import API from '../../../service/api';

export default class Turnable extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      lottering: false,
      lotteryNum: 0,
      prizeList: [{
        name: '金币*300',
        img: Gold3Png,
        },{
        name: '3折音视频券',
        img: Sale3Png,
      },{
        name: '金币*500',
        img: Gold5Png,
      },{
        name: '10元礼物',
        img: GiftFZPng,
      },{
        name: '5折音视频券',
        img: Sale5Png,
      },{
        name: '50元礼物',
        img: GiftFPng,
      },{
        name: '8折音视频券',
        img: Sale8Png,
      },{
        name: '金币*900',
        img: Gold9Png,
      },{
        name: '199元礼物',
        img: GiftSPng
      },{
        name: '399元礼物',
        img: GiftMPng,
      }],
      result: null,
      prizeListDetail: [],
      resultContent: '',
    }
  }
  componentDidMount(){
    this.getData()
  }
  async getData() {
    const getRes = await getFetch(API.getluckDrawPrize)
    this.setState({
      prizeList: getRes.result,
      lotteryNum: getRes.lotteryNum,
      prizeListDetail: getRes.resultExt,
    })

  }
  lottery = () => {
    if (this.state.lotteryNum <= 0) {
      Toast.show('抽奖次数已用尽')
      return
    }
    if (this.lottering) return
    this.setState({
      lottering: true,
    }, async () => {
      try {
        const lotteryRes = await postFetch(API.luckDraw)
        setTimeout(() => {
          this.setState({
            result: this.state.prizeList.find((item) => item.id === lotteryRes.id),
            resultContent: lotteryRes.content,
            lottering: false,
            lotteryNum: this.state.lotteryNum - 1
          })
        }, 1500)
      } catch(e) {
        Toast.show('奖品飞走了，请再试一次吧')
        this.setState({
          lottering: false
        })
      }
    })
  }
  coseResult = () => {
    this.setState({
      result: null,
    })
  }
  render() {
    const { prizeList, lottering, lotteryNum, result, prizeListDetail, resultContent } = this.state;
    return (
      <div className='turnable-view'>
        <div className='top'></div>
        <div className='main'>
          <div className="tll"><span className='l0'><i></i></span></div>
          <div className="trl"><span className='l1'><i></i></span></div>
          <div className="bll"><span className='l0'><i></i></span></div>
          <div className="brl"><span className='l1'><i></i></span></div>
          <div className='topl flex-box'>
            {[1,2,3,4,5,6,7,8,9,0].map((item) => {
              return(
                <span key={item} className={`flex1 l${item % 2}`}><i></i></span>
              )
            })}
          </div>
          <div className='bottoml flex-box'>
            {[1,2,3,4,5,6,7,8,9,0].map((item) => {
              return(
                <span key={item} className={`flex1 l${item % 2}`}><i></i></span>
              )
            })}
          </div>
          <div className='leftl flex-box-d'>
            {[1,2,3,4,5,6,7].map((item) => {
              return(
                <span key={item} className={`flex1 l${item % 2}`}><i></i></span>
              )
            })}
          </div>
          <div className='rightl flex-box-d'>
            {[1,2,3,4,5,6,7].map((item) => {
              return(
                <span key={item} className={`flex1 l${item % 2}`}><i></i></span>
              )
            })}
          </div>
          <div className='inner'>
            {prizeList.map((item,index) => {
              return (
              <div key={item.name} className={`gift type${index+1}${lottering ? ' loading' : ''}`}>
                <img src={item.img} />
                <p>{item.name}</p>
              </div>
              )
            })}
            <div className='btn' onClick={this.lottery}>
              剩余抽奖券 x{lotteryNum}
            </div>
          </div>
        </div>
        <div className='bottom'>
          <div className='tit'>活动规则</div>
          <div className='content'>
            <ul className='txt'>
            <li>用户每次完成大于10秒的视频通话， 则可以获取<span>1张抽奖券</span></li>
            <li>用户每次完成充值，则可以获取<span>1张抽奖券</span></li>
            <li>抽中金币会自动发放到账户余额中</li>
            <li>抽中视频券、礼物可在<span>“礼物-背包”</span>中查看</li>
            <li>幸运大转盘奖励公示如下：</li>
            </ul>
            <ul className='table'>
              <li className='flex-box t'>
                <span className='flex3'>奖励</span>
                <span className='flex4'>价格</span>
                <span className='flex3'>抽取概率</span>
              </li>
              { prizeListDetail.map((item, index) => {
                return (
                  <li className='flex-box'>
                    <span className='flex3'>{item.name}</span>
                    <span className='flex4'>{item.coin}</span>
                    <span className='flex3'>{item.v}%</span>
                  </li>
                )
              }) }
            </ul>
          </div>
        </div>
        {!!result && (
          <div className='result-float flex-box'>
            <div className='con'>
              <img src={result.img} />
              <p className='na'>{result.name}</p>
              <p>{resultContent || '已放入您的账号中'}</p>
              <button onClick={this.coseResult}></button>
            </div>
          </div>
        )}
      </div>
    )
  }
}
