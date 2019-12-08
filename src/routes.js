import React from "react"
import { Router, Route, IndexRoute } from "react-router"
import Layout from './container/Layout';
import LoginContainer from "./container/LoginContainer";
import App from "./container/App";
import {loginSuccess} from './components/Login/submit';


export default (store, history) => {
	
 		const requireAuth = (nextState, replace, callback) => {
			 if(loginSuccess == true){
		var data=store.getState();
		data.user.authenticated = true;
			 }
		const { user: { authenticated } } = store.getState()		
		if (!authenticated) {			
			replace({
				pathname: "/login",
				state: { nextPathname: nextState.location.pathname }
			})
		}
		callback()
	}	

	return( 
		<Router history={history}>
			<Route exact path="/" component={App}>
			<IndexRoute component={LoginContainer} />
			<Route path="login" component={LoginContainer} />
			<Route path="search" component={Layout} onEnter={requireAuth} />
			</Route>	
		</Router>	
	)	

}




