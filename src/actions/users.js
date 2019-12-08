import axios from "axios"
import { browserHistory } from "react-router"
import * as types from "../constants"

function beginLogin() {
	return { type: types.MANUAL_LOGIN_USER }
}

function loginSuccess(data) {
	return {
		type: types.LOGIN_SUCCESS_USER,
		data
	}
}

function loginError(data) {
	return {
		type: types.LOGIN_ERROR_USER,
		data
	}
}

function beginLogout() {
	return { type: types.LOGOUT_USER }
}

function logoutSuccess() {
	return { type: types.LOGOUT_SUCCESS_USER }
}

function logoutError() {
	return { type: types.LOGOUT_ERROR_USER }
}

export function manualLogin(
	data,
	successPath
) {
	return dispatch => {
		dispatch(beginLogin())
		axios.get(`https://swapi.co/api/people/?search=${data.username}`).then(res => {

			if (res.data.results.length) {
				if (res.data.results[0].birth_year == data.password) {
					dispatch(loginSuccess(data));
					browserHistory.push('/search');
				}
				else {
					dispatch(loginError(data));
					alert("wrong username/password!!")
					let loginMessage = "wrong username / password"
					return loginMessage
				}

			}

			else {
				dispatch(loginError(data));
				alert("wrong username/password!!")
				let loginMessage = "wrong username / password"
				return loginMessage
			}
		})
	}
}

export function manualLogout() {
	return dispatch => {
		dispatch(beginLogout())

		return axios.get("/logout")
			.then(response => {
				if (response.data.success) {
					dispatch(logoutSuccess())
					browserHistory.push("/")
				} else {
					dispatch(logoutError())
				}
			})
			.catch(response => {
				if (response instanceof Error) {
				}
			})
	}
}