import { lazy } from 'react';


const HelpCenter = lazy(() => import("../pages/helpCenter"));//废弃
const HelpCenterMale = lazy(() => import("../pages/helpCenter_male"));
const HelpCenterFeMale = lazy(() => import("../pages/helpCenter_female"));
const WalletDetail = lazy(() => import("../pages/walletDetailNew"));
const WalletDetailNew = lazy(() => import("../pages/walletDetailNew"));
const CASH = lazy(() => import("../pages/walletDetailNew/cash"));
const WalletHelp = lazy(() => import("../pages/walletHelp"));
const Earnings = lazy(() => import("../pages/earnings"));//废弃
const EarningsMale = lazy(() => import("../pages/earnings/earnings_male"));
const EarningsFemale = lazy(() => import("../pages/earnings/earnings_female"));
const Signin = lazy(() => import("../pages/signin"));
const LevelMale = lazy(() => import("../pages/level/index"));
const LevelFemale = lazy(() => import("../pages/level/female"));
const Invite = lazy(() => import("../pages/invite"));
const InviteDetail = lazy(() => import("../pages/invite/detail"));
const Withdraw = lazy(() => import("../pages/withdraw"))
const Video = lazy(() => import("../pages/video"))
const BindAccount = lazy(() => import("../pages/bindAccount"))
const WithdrawDetail = lazy(() => import("../pages/withdrawDetail"))
const Exchange = lazy(() => import("../pages/withdraw/exchange"))
const RankingMale = lazy(() => import("../pages/ranking/male.js"))
const RankingFemale = lazy(() => import("../pages/ranking/female.js"))
const Prevention = lazy(() => import("../pages/prevention"))
const InviteCode = lazy(() => import("../pages/invite_code"))
const MidAutumn = lazy(() => import('../pages/midAutumn'))
const Pay = lazy(() => import('../pages/pay'))
const GrowPlan = lazy(() => import('../pages/growPlan'))
const QixiVuew = lazy(() => import('../pages/activity/qixi/index'))
const QixiRankVuew = lazy(() => import('../pages/activity/qixi/rank'))
const QixiRuleVuew = lazy(() => import('../pages/activity/qixi/rule'))
const Turnable = lazy(() => import('../pages/activity/turntable'))
const ShujiaView = lazy(() => import('../pages/activity/shujia'))
const summerWeek = lazy(() => import('../pages/activity/summerWeek'))
const summerWeekRule = lazy(() => import('../pages/activity/summerWeek/rule'))
const summerWeekRank = lazy(() => import('../pages/activity/summerWeek/rank'))
const ZQIndex = lazy(() => import('../pages/activity/2022zq/index'))
const ZQRule = lazy(() => import('../pages/activity/2022zq/rule'))
const GQIndex = lazy(() => import('../pages/activity/2022gq/index'))
const GQRule = lazy(() => import('../pages/activity/2022gq/rule'))

const ShopIndex = lazy(() => import('../pages/shop/index'))
const ShopMy = lazy(() => import('../pages/shop/my'))
const ShopRecord = lazy(() => import('../pages/shop/record'))
const EarningsDetailFemale = lazy(() => import('../pages/earnings/detail_female'))

 const Router = [{
    path: '/helpCenter',
    name: '帮助中心',
    component: HelpCenter
},{
     path: '/helpCenter_male',
     name: '帮助中心',
     component: HelpCenterMale
 },{
     path: '/helpCenter_female',
     name: '帮助中心',
     component: HelpCenterFeMale
 },{
    path: '/helpCenter/:type',
    name: '帮助中心',
    component: HelpCenter
},{
    path: '/walletDetail',
    name: '钱包明细',
    component: WalletDetail
},{
    path: '/walletDetailNew',
    name: '钱包明细',
    component: WalletDetailNew
},{
    path: '/cash/:type',
    name: '我的余额',
    component: CASH
},{
    path: '/walletHelp',
    name: '帮助',
    component: WalletHelp
},{
    path: '/earnings_female',
    name: '赚钱任务',
    component: EarningsFemale
},{
    path: '/earnings_detail_female',
    name: '收益明细',
    component: EarningsDetailFemale
},{
     path: '/earnings_male',
     name: '赚钻石活动',
     component: EarningsMale
 },{
     path: '/earnings',
     name: '收益明细',
     component: Earnings
 },{
    path: '/signin',
    name: '签到',
    component: Signin
},{
     path: '/level_male',
     name: '我的等级',
     component: LevelMale
 },{
     path: '/level_female',
     name: '我的等级',
     component: LevelFemale
 },{
    path: '/invite',
    name: '邀请好友',
    component: Invite
},{
    path: '/invitedetail',
    name: '邀请记录',
    component: InviteDetail
},{
    path: '/withdraw',
    name: '提现',
    component: Withdraw
},{
    path: '/video',
    name: '视频聊价',
    component: Video
},{
    path: '/bindAccount',
    name: '绑定提现账号',
    component: BindAccount
},{
    path: '/withdrawDetail',
    name: '提现明细',
    component: WithdrawDetail
},{
    path: '/ranking_female',
    name: '女神榜',
    component: RankingFemale
},{
    path: '/ranking_male',
    name: '富豪榜',
    component: RankingMale
},{
     path: '/exchange',
     name: '兑换',
     component: Exchange
 },{
     path: '/prevention',
     name: '防骗中心',
     component: Prevention
 },{
     path: '/invite_code',
     name: '邀请码',
     component: InviteCode
 },{
    path: '/activity',
    name: '万圣狂欢节',
    component: MidAutumn
},{
    path: '/pay',
    name: '充值',
    component: Pay
},{
    path: '/growPlan',
    name: '成长计划',
    component: GrowPlan
 }, {
     path: '/activity/qixi/rank/:type/:targetId',
     name: '七夕活动排行榜',
     component: QixiRankVuew
 }, {
     path: '/activity/qixi/index/:type',
     name: '七夕活动',
     component: QixiVuew
 }, {
     path: '/activity/qixi/rule/:type',
     name: '七夕活动规则',
     component: QixiRuleVuew
 }, {
     path: '/activity/turnable',
     name: '大转盘',
     component: Turnable,
 }, {
     path: '/activity/shujia',
     name: '暑期翻天乐',
     component: ShujiaView
 }, {
    path: '/activity/summerWeek',
    name: '暑期末狂欢周',
    component: summerWeek
}, {
    path: '/activity/summerWeek/rule',
    name: '暑期末狂欢周-规则',
    component: summerWeekRule
}, {
    path: '/activity/summerWeek/rank',
    name: '暑期末狂欢周-排行榜',
    component: summerWeekRank
}, {
    path: '/activity/2022zq/index',
    name: '中秋活动',
    component: ZQIndex
}, {
    path: '/activity/2022zq/rule',
    name: '中秋活动规则',
    component: ZQRule
}, {
    path: '/activity/2022gq/index',
    name: '节日活动',
    component: GQIndex
}, {
    path: '/activity/2022gq/rule',
    name: '节日活动规则',
    component: GQRule
}, {
    path: '/shop',
    name: '道具商城',
    component: ShopIndex
}, {
    path: '/shop/my',
    name: '我的道具',
    component: ShopMy
}, {
    path: '/shop/record',
    name: '购买记录',
    component: ShopRecord
}]
export default Router;
