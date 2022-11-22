/* eslint-disable no-useless-constructor */
import React, {Component} from 'react';
import { Result } from 'antd-mobile';
import empty_img from '../../images/empty.png';
import  './style.less';
class Empty extends Component {
    constructor(props) {
		super(props);
    }
    render() {
        const { message } = this.props;
        return (
            <Result className="empty-box-view" imgUrl={empty_img} message={message || "没有发现内容"} />
        )
	}
}
 
export default Empty;