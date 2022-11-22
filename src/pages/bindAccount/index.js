/**
 * @file 帮助中心页面
 */
import React from 'react'
import {WingBlank, Flex, InputItem, Modal, ImagePicker} from 'antd-mobile'
import LoginView from '../../components/LoginView'
// import { getFetch, postFetch } from '../../service/request'
import HeaderView from '../../components/HeaderView'
import './style.less';
import Util from '../../common/util';

import Id_ZIMG from '../../images/bindAccount/idbg_z.png'
import Id_FIMG from '../../images/bindAccount/idbg_f.png'
import {getFetch, postFetch, putFetch} from "../../service/request";
import API from "../../service/api";
import {Toast } from 'antd-mobile'


class BindAccount extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showLogin: false,
      IdImg_Z: '',
      IdImg_F: '',
      name: '',
      account: '',
      uploading1:false,
      imgUrl1:'',
      uploading2:false,
      imgUrl2:'',
      info: {
        name:''
      },
    }
  }
  componentDidMount(){
    this.getData()
  }
  getData(){
    getFetch(API.alipayInfo).then((data) => {
      this.setState({
        info: data.info || [],
      })
      console.log(data.info)
    }).catch((err) => {

    })

  }
  onBack() {

  }
  submit = () => {
    if(!Util.isLogin()) {
      this.setState({
        showLogin: true
      })
      return;
    }
    Toast.loading()
    postFetch(API.bindAlipay, {
      name: this.state.name,
      account: this.state.account,
      img1:this.state.imgUrl1,
      img2:this.state.imgUrl2,
    }).then((res) => {
      Toast.hide()
      Toast.success("添加成功，等待审核");
      this.getData()
    }).catch((err) => {
      Toast.hide()
      this.alert(err.message)
    })
  }
  inputChange = (value, type) => {
    if(type === 'name') {
      if (this.state.info.name) {
        return;
      }
      this.setState({
        name: value
      })
    }
    else if(type === 'account') {
      if (this.state.info.account) {
        return;
      }
      this.setState({
        account: value
      })
    }
  }
  gotoWalletDetail() {
    
  }
  loginClose() {
    this.setState({
      showLogin: false
    })
  }
  loginSuccess(data) {
  }
  loginFail(err){

  }
  //获取上传通行证
  async getOssToken() {
    return new Promise((resolve, reject)=>{
      // var scope = this;
      getFetch(API.uploadSign, {type: 'image'}).then(function(data){
        // scope.aliyunOssToken = data;
        // console.log(data);
        resolve(data)
      }).catch(function(error){
        console.log(error);
        reject(error)
      })
    });
  }

  img1Click() {
    if (this.state.info.img1) {
      if (this.state.info.status === 0) {
        Toast.show('审核中');
      } else if  (this.state.info.status === 1) {
        Toast.show('审核成功');
      }
    } else {
      document.getElementById('file').click();
    }
  }
  img2Click() {
    if (this.state.info.img2) {
      if (this.state.info.status === 0) {
        Toast.show('审核中');
      } else if  (this.state.info.status === 1) {
        Toast.show('审核成功');
      }    } else {
      document.getElementById('file2').click();
    }
  }
  onChange = async () => {
    var token = await this.getOssToken()
    const o_file = document.getElementById('file');
    if(!o_file.value) return;
    this.setState({
      uploading1: true,
    })
    console.log(token);
    Toast.loading();
    this.uploadImg(o_file, token, (fileUrl)=>{
      this.setState({
        imgUrl1: fileUrl,
        uploading1: false
      })
      Toast.hide();
      Toast.show('上传成功');
    }, ()=>{
      this.setState({
        uploading1: false
      })
      Toast.hide();
      Toast.fail("图片上传失败，请重试");
    });
  }
  onChange2 = async () => {
    var token = await this.getOssToken()
    console.log('onChange'+token);

    const o_file = document.getElementById('file2');
    if(!o_file.value) return;
    this.setState({
      uploading2: true,
    })
    console.log(token);
    Toast.loading();
    this.uploadImg(o_file, token, (fileUrl)=>{
      this.setState({
        imgUrl2: fileUrl,
        uploading2: false
      })
      Toast.hide();
      Toast.show('上传成功');
    }, ()=>{
      this.setState({
        uploading2: false
      })
      Toast.hide();
      Toast.fail("图片上传失败，请重试");
    });
  }
  uploadImg = (o_file, aliyunOssToken, callback, failCallback)=>{
    var getSuffix = function (fileName) {
      var pos = fileName.lastIndexOf(".");
      var suffix = '';
      if (pos !== -1) {
        suffix = fileName.substring(pos);
      }
      return suffix;
    }

    const file = o_file.value;
    if (file.length === 0) {
      return;
    }
    const filename = new Date().getTime() + getSuffix(file);
    const formData = new FormData();
    //注意formData里append添加的键的大小写
    formData.append('key', aliyunOssToken.dir + '/' + filename); //存储在oss的文件路径
    formData.append('OSSAccessKeyId', aliyunOssToken.accessid); //accessKeyId
    formData.append('policy', aliyunOssToken.policy); //policy
    formData.append('Signature', aliyunOssToken.signature); //签名
    formData.append("file", o_file.files[0]);
    formData.append('success_action_status', 200); //成功后返回的操作码


    const url = aliyunOssToken.host;
    const fileUrl = aliyunOssToken.host +'/'+ aliyunOssToken.dir + '/' + filename;
    putFetch(url, formData).then((res)=>{
      callback && callback(fileUrl);
    }).catch((err)=>{
      failCallback && failCallback();
    })
  }
  onBack() {
    this.props.history.goBack()
  }
  alert = (message)=>{
    Modal.alert('', message,[{
      text: '确定'
    }])
  }
	render(){
    const { IdImg_F, IdImg_Z, showLogin, imgUrl1, imgUrl2, info } = this.state
		return(
      <div>
        <HeaderView
          title={"绑定提现账号"}
          onBack = {this.onBack.bind(this)}
          // rightContent = {{
          //   title: '明细',
          //   onClick: () => {
          //     this.gotoWalletDetail()
          //   }
          // }}
          // fixed
        />
        <WingBlank size='lg'>
          <div className="bind-view">
            <h3><span>*</span>填写支付宝账号</h3>
            <InputItem
              className="input"
              type = "text"
              placeholder="支付宝姓名"
              disabled={!!info.name}
              value={this.state.name ? this.state.name : (info.name || '')}
              onChange = {(value)=>{
                this.inputChange(value, 'name')
              }}
            ></InputItem>
            <InputItem
              className="input"
              type = "text"
              placeholder="支付宝账号"
              disabled={!!info.account}
              value={this.state.account ? this.state.account : (info.account || '')}
              onChange = {(value)=>{
                this.inputChange(value, 'account')
              }}
            ></InputItem>
            <h3 className="mt"><span>*</span>上传身份证照片</h3>
            <Flex>
              <Flex.Item className="item">
                <img className="idimg" src={ this.state.info.img1 ? this.state.info.img1 : (imgUrl1 || Id_ZIMG)} alt="" onClick={this.img1Click.bind(this)}/>
                <p>身份证正面</p>
              </Flex.Item>
              <Flex.Item  className="item">
                <img className="idimg" src={ this.state.info.img2 ? this.state.info.img2 : (imgUrl2 || Id_FIMG)} alt="" onClick={this.img2Click.bind(this)}/>
                <p>身份证背面</p>
              </Flex.Item>
            </Flex>
            { this.state.info.status === 0 || this.state.info.status === 1 ? (
                // <button onClick={this.submit.bind(this)} disabled="true">{this.state.info.status === 0 ? '审核中' : '审核成功'}</button>
                <button disabled="true">{this.state.info.status === 0 ? '审核中' : '审核成功'}</button>
              ) : (
                <button onClick={this.submit.bind(this)}>提交</button>
            )
            }
            {/*<button onClick={this.submit.bind(this)}>提交</button>*/}
            <div className="note">
              <p>1、使用邮箱注册支付宝的用户，请前往支付宝的设置>>安全设置>>手机中，开启手机号登录，才能确保到账；</p>
              <p className="red">2、支付宝绑定了邮箱，请务必填写支付宝邮箱账号，否则会提现失败。</p>
            </div>
            <input onChange = {this.onChange} type="file" name="file" id="file" accept="image/*" style={{display: "none"}} />
            <input onChange = {this.onChange2} type="file" name="file2" id="file2" accept="image/*" style={{display: "none"}} />
          </div>
        </WingBlank>
        <LoginView
          visable = {showLogin}
          onClose = {this.loginClose.bind(this)}
          loginSuccess = {this.loginSuccess.bind(this)}
          loginFail = {this.loginFail.bind(this)}
        />
      </div>
		);
	}
}

export default BindAccount;