import React, {Component} from 'react';
import  './style.less';
class HeaderView extends Component {
    constructor(props) {
		super(props);
    }
    render() {
      const { title, hideBack, fixed, trans, onBack, rightContent } = this.props
        return (
          <div className={"bk-header" + (fixed ? ' fixed' : '') + (trans ? ' trans' : '')}>
            <div className="cm-header">
              { !hideBack && (
                <span className="cm-header-icon" onClick={onBack}>
                  <i className="icon-back"></i>
                </span>
              ) }
                {rightContent && (
                  <span className="cm-header-right" onClick={rightContent.onClick}>{rightContent.title}</span>
                )}
                <h1 className="cm-page-title">{title}</h1>
                
            </div>
          </div>
        )
	}
}
 
export default HeaderView;