import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import SERVERURL from './pages/util';
import axios from 'axios';

const PUSH_ENDPOINT = SERVERURL + '/push-token-requester';

async function registerForPushNotificationsAsync(userId) {
	const { status: existingStatus } = await Permissions.getAsync(
		Permissions.NOTIFICATIONS
	);
	let finalStatus = existingStatus;

	// only ask if permissions have not already been determined, because
	// iOS won't necessarily prompt the user a second time.
	if (existingStatus !== 'granted') {
	// Android remote notification permissions are granted during the app
	// install, so this will only ask on iOS
	const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		finalStatus = status;
	}

	// Stop here if the user did not grant permissions
	if (finalStatus !== 'granted') {
		console.log('Not granted');
		return;
	}

	// Get the token that uniquely identifies this device
	let token = await Notifications.getExpoPushTokenAsync();
	if(token !== null){
		console.log("Token = ", token, "userId = ", userId);
		// POST the token to your backend server from where you can retrieve it to send push notifications.
		let tokenData = {"token": token, "id": parseInt(userId, 10)};
		axios.post(PUSH_ENDPOINT, tokenData)
		.then((response) =>{
			// let userData = response;
			// console.log("response: ", userData);
		})
		.catch((error) =>{
			console.log('notification error =', error);
		});
	}
}
export default registerForPushNotificationsAsync;
