import Cookies from 'js-cookie';
import { getAccountInfo, isInApp } from './bridge'

const Util = {
    isLogin: async ()=>{
        if (isInApp()) {
            const token = await getAccountInfo()
            if(token) {
                return true
            }
        }
        const token = Cookies.get("token");
        const uid = Cookies.get("userId");
        return !!(token && uid);
    },
    async getToken(){
        if (isInApp()) {
            const token = await getAccountInfo()
            if(token) {
                return token
            }
        }
        const token = Cookies.get("token");
        const uid = Cookies.get("userId");
        return {
            token,
            uid,
        };
    },
    removeUserinfo(){
        Cookies.remove('token');
        Cookies.remove('userId');
    },
    setLoginCookie(data){
        Cookies.set("token", data.token, {expires: 7});
        Cookies.set("userId", data.id, {expires: 7});
    },
    isPhoneNumber(phone){
        if(!(/^1[3456789]\d{9}$/.test(phone))){
            return false; 
        }else{
            return true;
        }
    },
    getQueryParams(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"), url = window.location.href;
        const search = window.location.search ? window.location.search.split('?')[1] : url.split('?')[1];
        if(!search){
            return '';
        }
        var r = search.match(reg);
        if (r != null) return unescape(decodeURI(r[2])); return null;
    },
    priceFormat(num, needAddIcon) {
        const prefix = needAddIcon ? "+" : "";
        if(num === '--') return prefix + num;
        if(!num) return prefix + '0.0';
        var c = (num.toString().indexOf ('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        return prefix + (c || "0.0");
    },
    copyToClip(text){
        const u = navigator.userAgent; 
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
        if(isAndroid || (!isAndroid && !isiOS)){
            var txt = document.createElement('textarea');
            txt.style = 'position:absolute;top:-9999px;left:-9999px;';
            txt.setAttribute('id',"selector");
            txt.setAttribute('readonly','readonly');
            txt.innerHTML = text;
            document.body.appendChild(txt);
            txt.select();
            document.execCommand("copy",false,null);
        }
        if(isiOS){
            const txt = document.createElement('a');
            txt.setAttribute('id',"selector");
            txt.setAttribute('style','position:absolute;top:-9999px;left:-9999px;');
            txt.innerHTML = text;
            document.body.appendChild(txt);
            const copyDOM = document.querySelectorAll('#selector');
            const range = document.createRange();  
            range.selectNode(copyDOM[0]);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy'); 
        }
        const e_selector = document.getElementById('selector');
        document.body.removeChild(e_selector);
    },
    isYoTaApp() {
        const domain = window.location.host
        return domain.includes('yotajiaoyou')
    }
}
export default Util;