/**
 * 收益明细
 */
 import React from 'react'
 import { Picker, Toast } from 'antd-mobile'
 import './style.less'
import { postFetch } from '../../service/request';
import API from '../../service/api';
import dayjs from 'dayjs';

 export default class DetailFemale extends React.Component{
  constructor(props){
    super(props);
    const dateList = [0,1,2,3,4,5,6].map((item) => {
      const date = dayjs().subtract(item, 'day').format('YYYY-MM-DD')
      return {
        value: date,
        label: date,
      }
    })
    this.state = {
      dateList,
      selectDate: dateList[0].value,
      incomeTotal: 0,
      incomeChat: 0,
      incomeAudio: 0,
      incomeVideo: 0,
      incomeGift: 0,
      incomeOther: 0,
      otherList: [],
    }
  }
  componentDidMount() {
    this.getData()
  }
  getData = async (date) => {
    Toast.loading()
    try {
      const getRes = await postFetch(API.taskIncome, {
        date: this.state.selectDate,
      })
      const {
        total_income, chat_income, audio_income, gift_income, video_income, other_income,
        online_time, sayhello_count, sayhi_count, video_time, video_rate, chat_count, chat_people, chat_rate
      } = getRes
      this.setState({
        incomeTotal: total_income,
        incomeChat: chat_income,
        incomeAudio: audio_income,
        incomeVideo: video_income,
        incomeGift: gift_income,
        incomeOther: other_income,
        otherList: [
          { name: '在线时长', value: online_time},
          { name: '搭讪数', value: sayhello_count},
          { name: '招呼数', value: sayhi_count},
          { name: '视频时长', value: video_time},
          { name: '视频人数', value: online_time},
          { name: '视频接通率', value: video_rate},
          { name: '发送消息', value: chat_count},
          { name: '聊天人数', value: chat_people},
          { name: '消息回复率', value: chat_rate},
        ]
      })
      Toast.hide()
    } catch(e) {
      Toast.hide()
    }
  }
  dateChange(values) {
    this.setState({
      selectDate: values[0],
    }, () => {
      this.getData()
    })
  }
  render() {
    const {
      selectDate,
      dateList, otherList,
      incomeTotal,
      incomeChat,
      incomeAudio,
      incomeVideo,
      incomeGift,
      incomeOther,
    } = this.state
    return (
      <div className="earnings-detail">
        <div className="content">
          <div className="othertime">
            <Picker 
              data={dateList}
              title=""
              cols={1}
              value={[selectDate]}
              onChange={this.dateChange.bind(this)}
            >
              <span className="other">其它日期</span>
            </Picker>
            <span>{selectDate}</span>
          </div>
          <div className='to tc'>
            <h1>{ incomeTotal }</h1>
            <p>今日总收益</p>
          </div>
          <ul className='topl'>
            <li>
              <span><i className='wz'></i>文字奖励</span>
              <span>{ incomeChat }</span>
            </li>
            <li>
              <span><i className='yy'></i>语音奖励</span>
              <span>{ incomeAudio }</span>
            </li>
            <li>
              <span><i className='sp'></i>视频奖励</span>
              <span>{ incomeVideo }</span>
            </li>
            <li>
              <span><i className='lw'></i>礼物奖励</span>
              <span>{ incomeGift }</span>
            </li>
            <li>
              <span><i className='qt'></i>其它奖励</span>
              <span>{ incomeOther }</span>
            </li>
          </ul>
        </div>
        { !!otherList.length && (
          <div className='content2'>
            <h2 className='tc'>其它奖励</h2>
            <ul className='topl'>
              { otherList.map((item) => {
                return (
                  <li key={item.name}>
                    <span>{item.name}</span>
                    <span>{item.value}</span>
                  </li>
                )
              }) }
            </ul>
          </div>
        )}
      </div>
    )
  } 
}