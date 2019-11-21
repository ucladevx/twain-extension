/*global chrome*/
import React from 'react';
import axios from 'axios';

import User from '../models/UserModel'

async function getGoogleAuthToken(callback) {
  return await chrome.identity.getAuthToken({interactive: true}, callback);
}

async function signIn() {
	return await getGoogleAuthToken(async function(token) {
		let body = {
			token: token
		}

		return await axios.post('http://localhost:31337/api/users/signup', body)
	    .then(res => {
			let data = res.data.data

			let user = new User(
				data.id,
				data.first_name,
				data.last_name,
				data.picture_url,
				data.created_at,
			)
			console.log(user)
			return user
	    })
	    .catch(err => err);
	})
	
}

export default { getGoogleAuthToken, signIn };

