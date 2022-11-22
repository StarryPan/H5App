/**
 * @file 视频聊价
 */
 import React from 'react'
 // import HeaderView from '../../components/HeaderView'
 import { Modal, Toast } from 'antd-mobile'
 import { getFetch, postFetch } from '../../service/request'
 import { openURL } from "../../common/bridge";
 import API from '../../service/api'
 import ProgressView from '../../components/Process';
 import './style.less'
 
 import RightPng from '../../images/right.png'
 
 export default class Video extends React.Component{
   constructor(props) {
     super(props)
     this.state = {
       price: '--',
       duration: 0,
       LastWeekDuration: 0,
       videoCert: true, //是否认证
       editFlag: false,
     }
   }
   componentDidMount() {
     this.getData()
   }
   cert() {
     openURL("r_video_cert")
   }
   getData() {
     getFetch(API.videoPrice).then((data)=>{
       this.setState({
         price: data.price,
         duration: data.duration,
         LastWeekDuration: data.LastWeekDuration,
         videoCert: data.videoCert,
       })
     }).catch((err) => {
       this.alert(err.message)
     })
   }
   alert = (message)=>{
     Modal.alert('', message,[{
       text: '确定'
     }])
   }
   changeToEdit = ()=> {
     this.setState({
       editFlag: true
     })
   }
   confirmEdit = (value)=> {
     Toast.loading()
     postFetch(API.updatePrice, {
       price: value[0],
     }).then((res) => {
       Toast.hide()
       Toast.show('修改成功')
       // 修改成功重新获取数据
       this.getData()
     }).catch((err)=> {
       Toast.hide()
       this.alert(err.message)
     })
   }
   changeToSubteact = ()=> {
     let { price } = this.state
     if (price === '--') price = 0
     this.setState({
       price: price - 50 > 0 ? (price - 50) : 0
     })
   }
   changeToAdd = ()=>{
     let { price } = this.state
     if (price === '--') price = 0
     this.setState({
       price: price + 50
     })
   }
   getShowTime(duration) {
    let hour = 0, minute
    if(duration > 1) {
      hour = parseInt(duration, 10)
    }
    console.log('getShowTime', +duration.toString().split('.')[1])
    minute = Math.floor((duration - hour) * 60)
    return hour ? `${hour}小时${minute}分钟` : `${minute}分钟`
   }
   render() {
     const { price, duration, videoCert, LastWeekDuration } = this.state;
     return (
       <div className='video-view'>
         {/* <HeaderView
           title = '视频聊价格'
           trans
         /> */}
         {/* <div className='top-bg'></div> */}
         <div className='content'>
             {/* {editFlag ? <span className="fixedText" onClick={this.confirmEdit}>确定</span> : <img onClick={this.changeToEdit} className="icon fixed" src={EditPng} /> }
             <div className='tit'>
               当前聊价:
               {editFlag && <img onClick={this.changeToSubteact} className="icon left" src={SubteactPng} /> }
               <span className={editFlag ? 'pr line' : 'pr'}>{price}</span>
               {editFlag &&  <img onClick={this.changeToAdd} className="icon right" src={AddPng} />}
               <span className='unit'>星星/分钟</span>
             </div> */}
             <div className='tc'>
             <div className='tc five'>5小时</div>
               <span className='zero'>0小时</span>
               <ProgressView
                 score={duration * 10}
                 price={price}
                 change = {(value) => {
                   this.confirmEdit(value)
                 }}
               />
               <span className='ten'>10小时</span>
             </div>
           </div>
           <div className='time tc'><span>本周累计视频时长：<strong>{this.getShowTime(duration)}</strong></span></div>
           <p className='tips'>* 越高的聊价男生可能不愿意接听哦～</p>
           <div className='content-new'>
             <div className='tc'>
               <span className='tit'>·视频聊天加价特权·</span>
             </div>
             <ul>
               <li>本周累计视频聊天时长≥0.5小时的女生，可获得加价特权。
                 {!videoCert && (
                   <span onClick = {this.cert.bind(this)}>我要认证 <img src={RightPng} alt='' /></span>
                 )}
               </li>
               <li>根据每周累计视频时长，可以在第二天修改加价的幅度： 
                <div>累计时长≥0.5小时&nbsp;&nbsp;&nbsp;加价400积分/分钟 <br/>&nbsp;&nbsp;累计时长≥1小时&nbsp;&nbsp;&nbsp;加价800积分/分钟 <br/>&nbsp;&nbsp;累计时长≥2小时&nbsp;&nbsp;&nbsp;加价1200积分/分钟 <br/>&nbsp;&nbsp;累计时长≥4小时&nbsp;&nbsp;&nbsp;加价2000积分/分钟 <br/>&nbsp;&nbsp;累计时长≥6小时&nbsp;&nbsp;&nbsp;加价2800积分/分钟 <br/>&nbsp;&nbsp;累计时长≥8小时&nbsp;&nbsp;&nbsp;加价3600积分/分钟 <br/>&nbsp;累计时长≥10小时&nbsp;&nbsp;&nbsp;加价4800积分/分钟</div>
                </li>
               <li>
                <h4>如何维持最高积分档位？</h4>
                <p>根据上周的累计视频时长决定本周的最高积分档位；每周一0点系统会默认降至符合上周条件的最高积分档位。</p>
                <h4>如何及时调价？</h4>
                <p>本周累计视频时长达到任意阶段，可于次日一点进行调价</p>
               </li>
             </ul>
             <div className='time tc'>
                <span>上周累计视频时长：<strong>{this.getShowTime(LastWeekDuration)}</strong></span>
               </div>
           </div>
       </div>
     )
   }
 }
 
