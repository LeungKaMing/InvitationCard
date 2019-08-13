import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:1234';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function fetchAPI (ajaxObj) {
	return new Promise((resolve, reject) => {
		axios[ajaxObj.method](ajaxObj.url, ajaxObj.data)
			.then((res) => {
				if (res.data.code === 200) {
					resolve(ajaxObj.onSuccess(res.data))
				} else {
					resolve(ajaxObj.onFailure(res.data))
				}
			})
			.catch((err) => {
				reject(err)
			})
	})
}

export function getActivityList (params) {
	const {onSuccess, onFailure, data} = params
	return fetchAPI({
		method: 'get',
		url: data.activityId ? `/v1/getActivityList?activityId=${data.activityId}` : `/v1/getActivityList`,
		onSuccess,
		onFailure
	})
}

export function getDraftList (params) {
	const {onSuccess, onFailure, data} = params
	return fetchAPI({
		method: 'get',
		url: `/v1/getDraftList?activityId=${data.activityId}`,
		onSuccess,
		onFailure
	})
}

export function saveActivity (params) {
	const {onSuccess, onFailure, data} = params
	return fetchAPI({
		method: 'post',
		url: '/v1/saveActivity',
		data,
		onSuccess,
		onFailure
	})
}

export function publishActivity (params) {
	const {onSuccess, onFailure, data} = params
	return fetchAPI({
		method: 'post',
		url: '/v1/publishActivity',
		data,
		onSuccess,
		onFailure
	})
}