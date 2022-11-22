/**
 * @file 暑期翻天乐活动
 */
import React from 'react';
import './shujia.less';
import { getFetch } from '../../service/request'
import API from '../../service/api';
// import R_S_PNG from '../../images/activity/shujia/r_s.png'
// import R_F_PNG from '../../images/activity/shujia/r_f.png'
// import G_S_PNG from '../../images/activity/shujia/g_s.png'
// import G_F_PNG from '../../images/activity/shujia/g_f.png'
// import A_R_S_PNG from '../../images/activity/shujia/a_r_s.png'
// import A_R_F_PNG from '../../images/activity/shujia/a_r_f.png'
// import A_G_S_PNG from '../../images/activity/shujia/a_g_s.png'
// import A_G_F_PNG from '../../images/activity/shujia/a_g_f.png'
// import G_B_PNG from '../../images/activity/shujia/g_b.png'
// import R_B_PNG from '../../images/activity/shujia/r_b.png'

// const RESULT = [{
//   G: A_G_F_PNG,
//   R: A_R_F_PNG,
// }, {
//   G: A_G_S_PNG,
//   R: A_R_S_PNG,
// }, {
//   G: G_S_PNG,
//   R: R_S_PNG,
// }, {
//   G: G_F_PNG,
//   R: R_F_PNG,
// }, {
//     G: G_B_PNG,
//     R: R_B_PNG,
// }]

const RESULTV2 = [{
  G: '当前距离进入视频百强榜',
  R: '当前距离进入礼物百强榜',
}, {
  G: '你目前已进入视频百强榜',
  R: '你目前已进入礼物百强榜',
}, {
  G: '恭喜，您已进入视频百强榜',
  R: '恭喜，您已进入礼物百强榜',
}, {
  G: '很遗憾，您未进入视频百强榜',
  R: '很遗憾，您未进入礼物百强榜',
}, {
    G: '活动未开始',
    R: '活动未开始',
}]

export default class WalletDetail extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      diffGiftIncome: 0,
      diffVideoIncome: 0,
      isGiftRanking: 3,
      isVideoRanking: 3,
    }
  }
  componentDidMount(){
    this.loadData()
  }
  loadData() {
  getFetch(API.getShuJiaRankingList).then((data) => {
    const { diffGiftIncome, diffVideoIncome, isVideoRanking, isGiftRanking } = data
    this.setState({
      diffGiftIncome,
      diffVideoIncome,
      isVideoRanking,
      isGiftRanking,
      loading: false,
    })
  }).catch((e) => {
    // nothing
    this.setState({
      loading: false,
    })
  })
  }
  render() {
    const { isGiftRanking, isVideoRanking, diffVideoIncome, diffGiftIncome, loading } = this.state
    return (
      <div className='wuyi'>
        <div className='top'>
        {!loading ? [
          <div className="box tp" key='g'>
            <div className='red'>
              <div>
                <h1>{RESULTV2[isVideoRanking].G}</h1>
                {isVideoRanking === 0 && (
                    <p>您还需要{diffVideoIncome}积分的视频收益</p>
                )}
              </div>
            </div>
          </div>,
          <div className='z' key="z"></div>,
          <div className="box g" key='r'>
            <div className='green'>
              <div>
                <h1>{RESULTV2[isGiftRanking].R}</h1>
                {isGiftRanking === 0 && (
                    <p>您还需要{diffGiftIncome}积分的礼物收益</p>
                )}
              </div>
            </div>
          </div>
          ]: [
            <div className="box tp" key='g'><div className='red'></div></div>,
            <div className='z' key="z"></div>,
            <div className="box" key='r'><div className='green'></div></div>
          ]}
        </div>
        <div className='content'>
      </div>
      </div>
    )
  }
}
