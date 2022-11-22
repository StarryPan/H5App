
function getJSBridge(){
  if(!window.setupWebViewJavascriptBridge) return null
  return new Promise((resolve, reject)=>{
    window.setupWebViewJavascriptBridge(bridge => {
      resolve(bridge)
    })
  });
}

const JSCallNative = async (name, params = {}) => {
  if (!window.JSBridge) {
    window.JSBridge = await getJSBridge()
    if (!window.JSBridge) {
      return null
    }
  }
  return new Promise((resolve, reject)=>{
    window.JSBridge.callHandler(name, params, (returnMsg) => {
      var obj = returnMsg;
      if (typeof(returnMsg) === "string" && returnMsg.length > 0) {
        obj = JSON.parse(returnMsg);
      }
      resolve(obj)
    })
  })
}

function isInApp() {
  const ua = navigator.userAgent
  if (ua.indexOf('app') > -1) {
    return true
  }
  return false
}

function isAndroid() {
  const u = navigator.userAgent
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
}

/**
   * 调用原生方法获取账户信息
   */
async function getAccountInfo() {
  // return {
  //   uid: '7658762',
  //   token: 'fb41203dadc8e4a7d2d040ae844cfdda',
  //   summer: 0,
  //   incomeShow: 1,
  // }
  const AccountInfo = await JSCallNative('getAccountInfo')
  return AccountInfo || {}
}

async function shareWechat() {
  const info = await JSCallNative('shareWechat')
  return info || {}
}

async function shareWechatTimeline() {
  const info = await JSCallNative('shareWechatTimeline')
  return info || {}
}

async function getShareURL() {
  const info = await JSCallNative('getShareURL')
  return info || {}
}

async function openURL(router) {
    const info = await JSCallNative('openURL', {"url": router})
    return info || {}
}

async function openCert(type) {
    const info = await JSCallNative('openCert', {"type": type})
    return info || {}
}

export {
  getAccountInfo,
  isInApp,
  shareWechat,
  shareWechatTimeline,
  getShareURL,
  openURL,
  isAndroid,
    openCert,
}
