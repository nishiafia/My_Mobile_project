import React,{ Component } from 'react';
import { StyleSheet, AsyncStorage, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import {Actions} from  "react-native-router-flux";
import ValidationComponent from '../formvalidator/index';
import axios from 'axios';
import SERVERURL from './util';
import {setCookie} from './Cookie';
import registerForPushNotificationsAsync from '../registerForPushNotificationsAsync';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';


export default class Login extends ValidationComponent{
	constructor(props) {
		super(props);
			this.state = {
			email: "",
			password: "",
			};
			this.focusNextField = this.focusNextField.bind(this);
			this.inputs = {};
		}
		componentWillUnmount = () =>{
			AsyncStorage.clear();
		}
		componentDidMount(){
		}

		onSubmit = () => {
			 	this.validate({
				email: {email: true},
				password: {minlength:3, maxlength:7, required: true},
			}
			);
			if(!this.isFieldInError('email') && !this.isFieldInError('password'))
			 {
				var loginData = {};
				loginData.email = this.state.email;
				loginData.password = this.state.password;
				axios.post(SERVERURL + '/login',loginData)
				.then(function (response) {
				// handle success
				let requesterData = response.data;
				console.log('prelogin =', requesterData.email);
				console.log('prelogin1 =', requesterData);
				if(typeof requesterData.id !== 'undefined' && requesterData.id !== 0 ){
					console.log('login =', requesterData);
					registerForPushNotificationsAsync( requesterData.id );
					setCookie(requesterData.email,requesterData.id,requesterData.hashpassword,requesterData.fullname);
					Actions.newtask();
				}else{
					alert('Wrong Infromation');
				}
				})
				.catch(function (error) {
				// handle error
					console.log('er =',error);
				})
				.then(function () {
				// always executed
				});
			} 			
		}
		
		focusNextField(id) {
			this.inputs[id].focus();
			}
	signup(){
		Actions.signup();
	}
	gohome(){
		Actions.home();
	}
	componentWillMount(){
		AsyncStorage.removeItem("newtask");
	}
 	render(){
		return (
			<View style={styles.container}>
				<View style={{alignItems: 'center'}}>
					<Image style={{width: 300, height: 96}} source={require('../images/logo.png')} />
				</View>
					<ReactNativeZoomableView
						maxZoom={1.5}
						minZoom={0.5}
						zoomStep={0.5}
						initialZoom={1}
						bindToBorders={true}
						onZoomAfter={this.logOutZoomState}
						pinchToZoomInSensitivity={3}
						pinchToZoomOutSensitivity={1}
						doubleTapDelay={300}
						style={{
						padding: 1,
						//backgroundColor: 'red',
						}}>
						<Text style={styles.titleText}>Requster Login</Text>
						<TextInput 
							style={ styles.inputBox} 
							name='email' 
							placeholder='Email' 
							placeholderTextColor='#375c99' 
							onChangeText={(email) => this.setState({email})} 
							value={this.state.email} 
							blurOnSubmit={ false }
							onSubmitEditing={() => {this.focusNextField('Password');}} 
							returnKeyType = {"next"} 
							ref={ input => {this.inputs['Email'] = input;}}
						/>
						{
							this.isFieldInError('email') && this.getErrorsInField('email').map((errorMessage, i) => <Text style={styles.errorMsg} key={i}>{errorMessage}</Text>)
						}
						<TextInput
							style={ styles.inputBox} 
							secureTextEntry={true} 
							placeholder='Password'
							placeholderTextColor='#375c99' 
							name='password' 
							onChangeText={(password) => this.setState({password})} 
							value={this.state.password}
							ref={ input => {this.inputs['Password'] = input;}}
							blurOnSubmit={ true }
							returnKeyType = {"next"} 
						/>
						{
							this.isFieldInError('password') && this.getErrorsInField('password').map((errorMessage,i)=> <Text style={styles.errorMsg} key={i}>{errorMessage}</Text>) 
						}
						<TouchableOpacity style={styles.button} onPress= {this.onSubmit} >
							<Text style={styles.buttonText}>Login</Text>
						</TouchableOpacity>
					
						<View style={styles.signupTextCont}>
							<Text style={styles.signupText}>Don't have an account yet?</Text>
							<TouchableOpacity onPress={this.signup}>
								<Text style={styles.signupButton}> Signup</Text>
							</TouchableOpacity>

						</View>
					</ReactNativeZoomableView>
		 </View>
		);
 }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		marginTop: 10,
	},
	inputBox: {
		minWidth: '60%',
		minHeight: '6%',
		maxWidth: 300,
		maxHeight: 50,
		backgroundColor:'#eaf0f9',
		borderRadius: 20,
		paddingHorizontal:16,
		fontSize:16,
		marginVertical:16, 
		borderWidth: 2,
		borderColor:'#d0d9e2',
	},
	titleText: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom:20,
		color:'#26477f',
		marginTop:20,
	},
	button: {
		backgroundColor:'#fedc00',
		borderRadius: 25,
		paddingHorizontal:16, 
		marginVertical:16, 
		minWidth: '60%',
		minHeight: '6%',
		maxWidth: 300,
		maxHeight: 50,
	},
	buttonText:{
		fontSize: 20,
		fontWeight:'500',
		color:'#000000',
		textAlign:'center',
		marginTop:7,
	},
	signupTextCont:{
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingVertical:16,
		flexDirection:'row'
	},
	signupText:{
		color: '#375c99',
		fontSize:16
	},
	signupButton:{
		color:'#26477f',
		fontSize:16,
		fontWeight:'500',
		lineHeight: 20,
	},
	errorMsg:{
		color: '#cc0000',
		}
});