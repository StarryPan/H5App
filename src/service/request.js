/* eslint-disable no-throw-literal */
import "whatwg-fetch";
import Util from '../common/util';
import Cookies from 'js-cookie';
import Prefix from './prefix';
import { getAccountInfo } from '../common/bridge'
const postRequest = async (url, params = {})=>{
    var token = await getAccountInfo()
    if (isEmptyObject(token)) {
        token = Util.getToken()
    }
    let options = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            ...params,
            ...token,
        }),
    }
    const fetchUrl = url.indexOf('http') === 0 ? url : ( Prefix.domain + Prefix.path + url);
    return await fetch(fetchUrl, options).then((response)=>{
        if (response.ok) {
            return response.json();
        } else {
            const error = new Error(response.statusText);
            throw {
                err: error,
                message: '网络异常,请稍后重试! 错误代码：' + error.desc
            }
        }
    }).then((res)=>{
        console.log("response.success", res);
        if(res.code === 403){
            goLogin();
            throw {}
        }else if(res.access_token && res.token_type && res.expires_at){
            Util.setLoginCookie(res);
            return {
                message: '登录成功'
            }
        }else if(res.code === 0){
            return res.data;
        }else{
            throw res;
        }
    }).catch((err)=>{
        console.log("err", err);
        throw {
            message: err ? err.desc : '',
            code: err ? err.code : '',
        }
    })
}
function obj2params(obj) {
    var result = '';
    var item;
    for (item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }

    if (result) {
        result = result.slice(1);
    }

    return result;
}
const getRequest = async (url, params = {})=>{
    var token = await getAccountInfo()
    if (isEmptyObject(token)) {
        token = Util.getToken()
    }

    let options = {
        headers: {
            "Content-Type": 'application/json',
        },
    }
    const search  =obj2params({
        ...params,
        ...token
    });
    const fetchUrl = Prefix.domain + Prefix.path + url + "?" + search;
    return await fetch(fetchUrl, options).then((response)=>{
        console.log("response", response);
        if (response.ok) {
            return response.json();
        } else {
            const error = new Error(response.statusText);
            throw {
                err: error,
                message: '网络异常,请稍后重试! 错误代码：' + error.desc,
                code:response.status
            }
        }
    }).then((res)=>{
        if(res.code === 0){
            return res.data;
        }else{
            throw res;
        }
    }).catch((err)=>{
        throw {
            message: err.desc || '网络不给力，请稍后再试',
            code: err.code
        }
    })
}

function goLogin(){
    Cookies.remove("Authorization");
    window.location.replace('/#/login?formUrl=' + encodeURIComponent(window.location.href));
}

function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}

const putRequest = async (url, data)=>{
    console.log("putRequest", data);
    let options = {
        method: 'POST',
        body: data
    }
    return await fetch(url, options).then((response)=>{
        if (response.ok) {
            return {};
        }else{
            throw {}
        }
    }).catch((err)=>{
        throw {
            message: '网络不给力'
        }
    })
}

export const postFetch = postRequest;
export const getFetch = getRequest;
export const putFetch = putRequest;
