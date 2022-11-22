/**
 * @file 暑期末-规则
 */
 import React from 'react';
 import './style.less';
 import { Link } from "react-router-dom";
 import UserPng from '../../../images/user.png'
 import StarPng from '../../../images/activity/summerweek/star.png'
 import AvatarFPng from '../../../images/2022zq/avatar_f.png' 
 import AvatarMPng from '../../../images/2022zq/avatar_m.png' 
 import C1Png from '../../../images/2022zq/c1.png' 
 import C2Png from '../../../images/2022zq/c2.png' 
 import GitPng from '../../../images/2022zq/git.png' 

 export default class SummerWeek extends React.Component{
   constructor(props){
     super(props);
     this.state = {
 
     }
   }
   componentDidMount(){
   }
   render() {
     return (
       <div className='zq2022 zq2022-index'>
         <div className='summer-week summer-week-index'>
         <div className='top'>
           {/* <div className='time'>活动时间：8月26日-9月1日</div> */}
           {/* <br /> */}
           <div className='tr'>
             <Link to={`/activity/2022zq/rule`}><div className='rule'></div></Link>
           </div>
         </div>
         <div className='main'>
           <div className='tit'>活动一</div>
           <div className='content'>
             <h2>活动期间收益奖励<strong>2%</strong></h2>
             <p className='sub'>活动期间，女用户每日获得的所有<img src={StarPng} />收益奖励2%</p>
             <h3>奖励示例</h3>
             <div className='item'>
               <p>活动每日收益奖励，将在次日上午发放至账户内</p>
               <div className='flex-box'>
                 <div className='flex1'>
                   <img className='user' src={UserPng} />
                 </div>
                 <div className='flex1'>
                   <h4>日收益</h4>
                   <div>
                     <img className='star' src={StarPng} /> 2000
                   </div>
                 </div>
                 <div className='flex1'>
                 <h4>日奖励</h4>
                   <div>
                     <img className='star' src={StarPng} /> 40
                   </div>
                 </div>
               </div>
             </div>
           </div>
           <div className='tit'>活动二</div>
           <div className='content'>
             <p className='n'>（老版本用户请更新至最新版本体验）</p>
             <h2 className='w'>中秋限定情侣关系上线</h2>
             <p>活动上线“心动情侣”限时关系</p>
             <h3>活动示例</h3>
             <div className='item type2'>
               <p>男生赠送女生<img className='g' src={GitPng} />礼物，可获得“心动情侣”关系</p>
               <div className='tl'>
                 <img className='a' src={AvatarFPng} /><img className='c' src={C1Png} />
               </div>
               <p>您已发起心动情侣关系绑定，等待对方回应</p>
               <div className='tr'>
                 <img className='c' src={C2Png} /><img className='a' src={AvatarMPng} />
               </div>
               <p>恭喜获得心动情侣关系×3天</p>
             </div>
           </div>
         </div>
       </div>
       </div>
     )
   }
 }
 