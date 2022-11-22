/**
 * @file 邀请记录
 */
 import React from 'react';
 import { WingBlank, Flex, Modal } from 'antd-mobile';
 import './style.less';

 import API from '../../service/api';
 import {getFetch} from '../../service/request';
 import UserMoren from '../../images/user_moren.jpg'

export default class MidAutumnView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      rankList: [],
      selfData: {},
      gender: true,
      showRule: false,
    }
  }
  componentDidMount(){
    this.getData()
  }
  getData() {
    getFetch(API.midAutumnRank).then((data)=>{
      this.setState({
        rankList: data.list || [],
        selfData: data.selfData,
        gender: data.selfData.gender,
      })
    }).catch((e)=>{
        this.alert(e.message || "网络不给力，请稍后再试");
    })
  }
  alert = (message)=>{
    Modal.alert('', message,[{
      text: '确定'
    }])
  }
  showRule() {
    this.setState({
      showRuleModal: true
    })
  }
  hideRule() {
    this.setState({
      showRuleModal: false
    })
  }
  onBack() {
    this.props.history.goBack()
  }
  showRule = ()=> {
    this.setState({
      showRule: true
    })
  }
  hideRule = ()=> {
    this.setState({
      showRule: false
    })
  }
  render(){
    const { rankList, selfData, gender, showRule } = this.state
    return (
      <div>
        {/* <HeaderView
          title={"邀请记录"}
          onBack = {this.onBack.bind(this)}
          fixed
          trans
        /> */}
        <div className="midAutumn-view">
        <div className="rule" onClick={this.showRule}></div>
            <div className="gift"></div>
          <div className="top">
              {!!rankList.length && [
                  (rankList[2] && <div className="top3" key="3">
                      <img src={rankList[2].headImage ? rankList[2].headImage : UserMoren} />
                      <p className="name">{rankList[2].nickName ? rankList[2].nickName : "-"}</p>
                      <p className="score">{rankList[2].score &&  rankList[2].score > 0 ? rankList[2].score : 0}</p>
                  </div>),
                  (rankList[0] && <div className="top1" key="1">
                      <img src={rankList[0].headImage ? rankList[0].headImage : UserMoren} />
                      <p className="name">{rankList[0].nickName ? rankList[0].nickName : "-"}</p>
                      <p className="score">{rankList[0].score &&  rankList[0].score > 0 ? rankList[0].score : 0}</p>
                  </div>),
                  (rankList[1] && <div className="top2" key="2">
                      <img src={rankList[1].headImage ? rankList[1].headImage : UserMoren} />
                      <p className="name">{rankList[1].nickName ? rankList[1].nickName : "-"}</p>
                      <p className="score">{rankList[1].score &&  rankList[1].score > 0 ? rankList[1].score : 0}</p>
                  </div>),
              ]}

              {rankList.length === 0 && [
                  <div className="top3" key="3">
                      <img src={UserMoren} />
                      <p className="name">-</p>
                      <p className="score">0</p>
                  </div>,
                  <div className="top1" key="1">
                      <img src={UserMoren} />
                      <p className="name">-</p>
                      <p className="score">0</p>
                  </div>,
                  <div className="top2" key="2">
                      <img src={UserMoren} />
                      <p className="name">-</p>
                      <p className="score">0</p>
                  </div>
              ]}
          </div>
            {gender === 'FEMALE' ? (
                <div className="content">
                    <ul>
                        {rankList.length > 3 && rankList.slice(3).map((item, index) => (
                            <li>
                                <span className="index">{index + 4}</span>
                                <img src={item.headImage} />
                                <span className="name">{item.nickName}</span>
                                <span className="score">{item.score}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="content2">
                    <ul>
                        {rankList.length > 3 && rankList.slice(3).map((item, index) => (
                            <li>
                                <span className="index">{index + 4}</span>
                                <img src={item.headImage} />
                                <span className="name">{item.nickName}</span>
                                <span className="score">{item.score}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
          {selfData && (
            <div className="btmfix">
              <img src={selfData.headImage}/>
              <span className="mid">
                <strong>{selfData.nickName}</strong><br/><span className="exp">{selfData.rank === -1 ? '暂未上榜' : `恭喜，目前排名第${selfData.rank}名`}</span>
              </span>
              <span className="score"><span>{selfData.score || 0}</span></span>
            </div>
          )}
        </div>
        {showRule && (
          <div className="shadow" onClick={this.hideRule}></div>
        )}
        {showRule && (
            <div className="pop-rule2">
              <div>
                <div className="rule-wrap">
                  <h3>活动规则</h3>
                  <dl>
                    <dt>一、规则概述</dt>
                      {gender === 'FEMALE' ? (
                          <dd>
                              <p>1、活动无需报名，收集元旦狂欢节专属礼物即有可能登上榜单，积分越高，排名越高；</p>
                              <p>2、此次活动获奖为第1名到第10名，获奖奖励，在活动结束之后立即生效； </p>
                              <p>3、普通礼物1000积分=1积分，元旦狂欢节专属礼物1000积分=1.5积分，收到的专属礼物越多，积分越高； </p>
                              <p>4、活动奖励在1月4号12：00-14：00自动发放到账号余额，获奖用户可自行查看账号余额； </p>
                              <p>5、活动期间若发现小号互刷，与其他用户互刷或其他舞弊行为，则取消奖励并进行封号处罚；</p>
                              <p>6、活动期间如账号进行违规操作被系统封号则不能进入排行榜；</p>
                              <p>7、若出现榜单礼物数相同的情况，先达到者排名靠前，最终排名以该活动结束时间为准；</p>
                              <p>8、本活动的最终解释权归本平台所有； </p>
                          </dd>
                      ) : (
                          <dd>
                              <p>1、活动无需报名，赠送元旦狂欢节专属礼物即有可能登上榜单，积分越高，排名越高；</p>
                              <p>2、此次活动获奖为第1名到第3名，获奖奖励，在活动结束之后立即生效； </p>
                              <p>3、普通礼物1000金币=1积分，元旦狂欢节专属礼物1000金币=1.5积分，赠送的专属礼物越多，积分越高； </p>
                              <p>4、活动奖励在1月4号12：00-14：00自动发放到账号内，获奖用户可自行查看账号信息； </p>
                              <p>5、活动期间若发现小号互刷，与其他用户互刷或其他舞弊行为，则取消奖励并进行封号处罚；</p>
                              <p>6、活动期间如账号进行违规操作被系统封号则不能进入排行榜；</p>
                              <p>7、若出现榜单礼物数相同的情况，先达到者排名靠前，最终排名以该活动结束时间为准；</p>
                              <p>8、本活动的最终解释权归本平台所有； </p>
                          </dd>
                      )}
                  </dl>
                  <dl>
                    <dt>二、活动奖励</dt>
                    {gender === 'FEMALE' ? (
                      <dd>
                        <p>第一名：活动期间所获礼物积分总数x5%</p>
                        <p>第二名：活动期间所获礼物积分总数x4.5%</p>
                        <p>第三名：活动期间所获礼物积分总数x4%</p>
                        <p>第四名：活动期间所获礼物积分总数x3.5%</p>
                        <p>第五名：活动期间所获礼物积分总数x3%</p>
                        <p>第六名：活动期间所获礼物积分总数x2.5%</p>
                        <p>第七名：活动期间所获礼物积分总数x2%</p>
                        <p>第八名：活动期间所获礼物积分总数x1.5%</p>
                        <p>第九名：活动期间所获礼物积分总数x1%</p>
                        <p>第十名：活动期间所获礼物积分总数x0.5%</p>
                        {/*<p>最后统计出积分最高的10位女性，在活动页面展示（需展示出头像，昵称，积分值，名次值）。</p>*/}
                      </dd>
                    ) : (
                      <dd>
                        <p>第一名：豪icon*10天、视频免费券 *100、小雪花*100、流星雨*100</p>
                        <p>第二名：豪icon*5天、视频免费券 *50、小雪花*50、流星雨*50</p>
                        <p>第三名：豪icon*3天、视频免费券 *30、小雪花*30、流星雨*30</p>
                        {/*<p>最后统计出积分最高的3位男性，在活动页面展示（需展示出头像，昵称，积分值，名次值）。</p>*/}
                      </dd>
                    )}

                  </dl>
                </div>
                <div className="btn-close" onClick={this.hideRule}>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
