import React, { Component, Suspense } from "react";
//HashRouter,支持#识别,http://localhost:8080/#/Page3/
import { HashRouter as Router, Route, Switch } from "react-router-dom";
//单页BrowserRouter
import RouterConfig from "./router";
import ScrollToTop from './scrollToTop';

class Page extends React.Component {
  componentDidMount() {
    document.title = this.props.title
  }
  render() {
    const PageComponent = this.props.component
    return (
        <PageComponent {...this.props} />
    )
  }
}
export default class App extends Component {
  constructor(props){
    super(props);
  }
  componentDidUpdate(prevProps){
    console.log("componentDidUpdate", prevProps);
  }
  render() {
    const handlePageChange = () => {
      console.log("handlePageChange");
      window.scrollTo(0, 0);
    };
    return (
        <Router onUpdate={handlePageChange}>
          <ScrollToTop />
          <Suspense fallback={null}>
            <Switch>
              {RouterConfig.map((item)=>{
                return (
                    <Route key={item.path} exact path={item.path} title="Login" render={props => (
                        <Page {...props} component={item.component} title={item.name} />
                    )}/>
                )
              })}
            </Switch>
          </Suspense>
        </Router>
    );
  }
}