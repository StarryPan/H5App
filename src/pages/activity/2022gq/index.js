/**
 * @file 暑期末-规则
 */
 import React from 'react';
 import './style.less';
 import { Link } from "react-router-dom";
 import StarPng from '../../../images/activity/summerweek/star.png'
 import { getFetch } from '../../../service/request'
import API from '../../../service/api'

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
        status: -2,
        isDisplayYesIncome: false,
        today: null,
        yesterday: null,
     }
   }
   componentDidMount(){
    this.getData()
   }
   async getData() {
    const getRes = await getFetch(API.getFemaleNationalDayIncomeData)
    const { status, today, yesterday, isDisplayYesIncome } = getRes
    this.setState({
      status,
      today,
      yesterday,
      isDisplayYesIncome,
    })
   }
   render() {
    const { dataList, status, today, yesterday, isDisplayYesIncome } = this.state
     return (
       <div className='gq2022 gq2022-index ws'>
        <p className='topt'>每日礼物<img src={StarPng}/>收益奖励，将在次日上午发放至账户内。</p>
         <div className='top'></div>
         <p className='tn'>根据每日礼物<img src={StarPng} />收益的金额，给予指定的<img src={StarPng} />奖励</p>
         <div className='tr rule-rc'>
            <Link to={`/activity/2022gq/rule`}><div className='rule'></div></Link>
          </div>
          {status === 0 && (
            <div className='lzl'></div>
          )}
          {status === -1 && (
            <div className='tolater'></div>
          )}
          {status === 1 && (
            <div className='box'>
              <div className='c1-bt'></div>
                <div className='content'>
                  { today.isHeightIncome ? (
                    <p className='n3'>您今日已达到最高奖励</p>
                  ) : !!today.rewardProportion ? (
                    <p className='n1'>您今日已达到<span>{today.rewardProportion}</span>的奖励比例</p>
                  ) : (
                    <p className='n1'>您今日还未达到奖励档位</p>
                  )}
                  <div className='inner'>
                    <div className='flex-box'>
                      <div className='flex1'><span>当前收益</span></div>
                      <div className='flex2 tc'><span>已达到奖励档位</span></div>
                      <div className='flex1 tr'><span>可得奖励</span></div>
                    </div>
                    <div className='flex-box'>
                      <div className='flex2'><img src={StarPng} />{today.dayBalanceIncomeNum}</div>
                      <div className='flex1 tc'>{today.rewardProportion || '暂未到达'}</div>
                      <div className='flex2 tr'>{today.rewardAvailable}<img src={StarPng} /></div>
                    </div>
                  </div>
                  { !today.isHeightIncome && (
                    <div className='inner v2'>
                      <div className='flex-box'>
                        <div className='flex1'><span>距离下档</span></div>
                        <div className='flex2 tc'><span>下档奖励收益</span></div>
                        <div className='flex1 tr'><span>下档奖励</span></div>
                      </div>
                      <div className='flex-box'>
                        <div className='flex2'><img src={StarPng} />{today.diffBalanceIncome}</div>
                        <div className='flex1 tc'>{today.rewardProportionNext}</div>
                        <div className='flex2 tr'>{today.rewardAvailableNext}+<img src={StarPng} /></div>
                      </div>
                    </div>
                  )}
                </div>
                {isDisplayYesIncome && [
                  <div className='c2-bt' key="t"></div>,
                  <div className='content v2' key="c">
                    {!!yesterday.rewardProportion ? (
                      <p className='n4'>恭喜你昨日获得<span>{yesterday.rewardProportion}</span>的奖励比例</p>
                    ) : (
                      <p className='n4'>您昨日还未达到奖励档位</p>
                    )}
                    <div className='inner v3'>
                      <div className='flex-box tcon'>
                        <div className='flex1'><span>昨日收益</span></div>
                        <div className='flex2 tc'><span>奖励比例</span></div>
                        <div className='flex1 tr'><span>昨日奖励</span></div>
                      </div>
                      <div className='flex-box ccon'>
                        <div className='flex2'><img src={StarPng} />{yesterday.yesBalanceIncomeNum}</div>
                        <div className='flex1 tc'>{yesterday.rewardProportion || '暂未到达'}</div>
                        <div className='flex2 tr'>{yesterday.rewardAvailable}<img src={StarPng} /></div>
                      </div>
                    </div>
                  </div>
                ]}
            </div>
          )}
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
 