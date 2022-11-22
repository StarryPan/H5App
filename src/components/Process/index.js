import React, { Component } from 'react';
import { Picker } from 'antd-mobile'
import PropTypes from 'prop-types';
import './style.less'
import IconEditPng from '../../images/vedio/icon-edit.png'
import API from '../../service/api'
import { getFetch } from '../../service/request'

export default class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      degCss: 'rotate(0)',
      district: []
    };
  }
  scoreNum = () => {
    if (!this.props.score) {
      return false;
    }
    let degNum = (this.props.score / 100) * 180;
    let degCss2 = 'rotate(' + degNum + 'deg)';
    this.setState({
      degCss: degCss2
    });
  }
  componentDidMount() {
    this.scoreNum();
    this.getDistrictData()
  }
  async getDistrictData() {
    const getRes = await getFetch(API.getVideoPrice, {})
    console.log('getRes.price_data', getRes.price_data)
    this.setState({
      district: getRes.price_data.map((value) => ({
        value,
        label: `${value} 积分/分钟`,
      }))
    })
  }
  render() {
    const { district } = this.state
    const circleBoxStyle = {
      display: 'inline-block',
      height: '118px',
      overflow: 'hidden',
    };
    return (
      <div className='process-view' style={circleBoxStyle}>
        <svg width="216" height="130" style={{marginTop: '-10px'}} xmlns='http://www.w3.org/2000/svg'>
          <defs>
            <linearGradient id="linearGradient">
              <stop stopColor="#A48AFF" offset="0%"></stop>
              <stop stopColor="#A48AFF" offset="100%"></stop>
            </linearGradient>

            </defs>
            <circle cx="108" cy="120" r="100" stroke="#EFE8FF" strokeWidth="8" fill="none" strokeDasharray="315" strokeDashoffset="-315" strokeLinecap="round"></circle>
            <circle cx="108" cy="120" r="100" stroke="url(#linearGradient)" strokeWidth="8" fill="none" strokeDasharray={`${(this.props.score / 100 * 315) || 0.1} 316`} strokeDashoffset="-315" strokeLinecap="round">
            </circle>
          </svg>
        <div className='cot'>
          <span className='lab'>当前聊价:</span>
          <div className='num'>
            <span>{this.props.price}</span>积分/分钟
            <div className='edit-box'>
              <Picker
                data={district}
                cols={1}
                value={[this.props.price]}
                onChange = {this.props.change}
              >
                <img onClick={this.props.edit} src={IconEditPng} />
              </Picker>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Progress.propTypes = {
    //  当前进度条所处的位置
    score: PropTypes.number.isRequired,
    //  当前进度条显示的文字
    text: PropTypes.number.isRequired,
    //  进度条的颜色
    progressColor: PropTypes.string.isRequired

};