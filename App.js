import React,{ Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, StatusBar,Header,BackHandler } from 'react-native';
import Routes from './Routes';
import { Permissions, Notifications } from 'expo';
import registerForPushNotificationsAsync from './registerForPushNotificationsAsync';
import { getCookie } from './pages/Cookie';
import { Actions } from  "react-native-router-flux";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		state = { text: '', notification: {}, };
	}
	componentDidMount() {
		getCookie("requesterData")
		.then(cookie =>{
			if(typeof cookie !== 'undefined' && cookie !== null){
				let userId = cookie.id;
				console.log("userId = ", userId);
				registerForPushNotificationsAsync( userId );
				Actions.profile();
			}
		});
		this._notificationSubscription = Notifications.addListener(this._handleNotification);
		console.log('currentscene =', Actions.currentScene);
		this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
	}
	componentWillUnmount() {
		this.backHandler.remove()
	}
	handleBackPress = () => {
		switch (Actions.currentScene) {
			case 'login':
			BackHandler.exitApp()
			break
			default: Actions.pop()
		}
		return true
	}
	_handleNotification = (notification) => {
		this.setState({notification: notification});
		const { data: { text }, origin } = notification;
		console.log('notification1 = ', notification);
		if (origin === 'selected') {
			Actions.tasklist();
		}
		if(origin === 'received'){
			getCookie("requesterData")
			.then(cookie =>{
				if(typeof cookie !== 'undefined' && cookie !== null){
					Actions.profile();
				}
			});
		}
	}
	
	render() {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="#000000" barStyle="light-content" />

				<View style={styles.container2}><Text>UMApps-Requester</Text></View>
				<Routes/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
	},  
	container2: {
		alignItems:'center',
	},
});
