const API = {
    inviteindex: 'invite/index',
    inviteCode: 'invite/invite_code',
    inviterecord: 'invite/invite_log',
    getreward: 'invite/get_reward',
    getTaskList: 'task/lists',
    rewardTask: 'task/reward',
    getSignList: 'task/sign/lists',
    signin: 'task/sign',
    myLevel: 'level/index',
    rankingList: 'rank/index',
    videoPrice: 'user/video_price', // 视频聊价
    walletDetail: 'user_log/index', // 钱包明细
    walletDetailNew: 'user_log/indexNew', // 钱包明细
    login: 'postLogin',
    withdrawalInfo: 'withdrawal_info', // 提现余额明细
    withdrawal: 'withdrawal', // 提现
    smallWithdrawal: 'smallWithdrawal', // 提现
    withdrawalLists: 'withdrawal_lists',// 提现明细列表
    exchange: 'exchange', //积分兑换金币
    bindAlipay: 'bind_alipay',//绑定支付宝
    alipayInfo: 'alipay_info', //支付宝信息
    uploadSign: 'upload/getUploadParams',//oss token
    rankIndex: 'rank/index',//排行榜
    updatePrice: 'user/video_price/update', // 修改视频聊价
    getVideoPrice: 'user/video_price/get', // 修改视频聊价价格选项
    midAutumnRank: 'activity/midAutumn/rankInfo', //中秋活动
    getCashSettingList: 'pay/cashSettingList',
    pay: 'pay/index',
    payCheck: 'pay/payCheck',
    getPayType: 'pay/payType',
    sendSms: 'login/sendSms',
    checkLogin: 'captchaLogin',
    getActivityUserData: 'activity/video/getActivityUserData',
    receiveRewards: 'activity/video/receiveRewards',
    signData: 'sign_data',
    signRemind: 'sign_remind',
    getSignRemind: 'get_sign_remind',
    getQiXiRankInfo: 'activity/LoverActivity/rankInfo',
    getluckDrawPrize: 'activity/midAutumn/getluckDrawPrize',
    luckDraw: 'activity/midAutumn/luckDraw',
    getShuJiaRankingList: 'activity/midAutumn/getShuJiaRankingList',
    getSummerWeekRank: 'activity/ShuQiActivity/rankInfo',
    getFemaleNationalDayIncomeData: 'activity/midAutumn/getFemaleNationalDayIncomeData',
    taskIncome: 'task/income'
}
export default API;
