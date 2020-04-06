import React,{ Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity ,Image } from 'react-native';
import {Actions} from  "react-native-router-flux";
import ValidationComponent from '../formvalidator/index';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import axios from 'axios';
var SERVERURL = 'http://192.168.0.186';

export default class Signup extends ValidationComponent{
	constructor(props) {
		super(props);
			this.state = {
			email: "",
			password: "",
			};
			this.focusNextField = this.focusNextField.bind(this);
			this.inputs = {};
		}
		focusNextField(id) {
			this.inputs[id].focus();
		}
		onSubmit = () => {

				// Call ValidationComponent validate method
				this.validate({
				email: {email: true},
				password: {minlength:3, maxlength:7, required: true},
				}
				);
				if(!this.isFieldInError('email') && !this.isFieldInError('password'))
				{
					var loginData = {};
					loginData.id = 0
					loginData.email = this.state.email;
					loginData.password = this.state.password;
					axios.post(SERVERURL + '/requesterregister',loginData)
					.then(function (response) {
					// handle success
						console.log('signup =', response.data);
						if(response.data == true){
							alert("Registration Successful");
							Actions.login();
						  }else{
							  alert('This Email ID Already Exists');
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
		signin(){ Actions.login();}
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
						<Text style={styles.titleText}>Create Requster Account</Text>
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
							returnKeyType = {"done"} 
						/>
						{
							this.isFieldInError('password') && this.getErrorsInField('password').map((errorMessage,i)=> <Text style={styles.errorMsg} key={i}>{errorMessage}</Text>) 
						}
							<TouchableOpacity style={styles.button} onPress={this.onSubmit}>
								<Text style={styles.buttonText}>Signup</Text>
							</TouchableOpacity>
						<View style={styles.signinTextCont}>
								<Text style={styles.signinText}>Already have an account?</Text>
							<TouchableOpacity onPress={this.signin}>
								<Text style={styles.signinButton}> SignIn</Text>
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
		//justifyContent: 'center',
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
		borderRadius: 20,
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
		color:'#000',
		textAlign:'center',
		marginTop:7,
	},
	signinTextCont:{
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingVertical:16,
		flexDirection:'row'
	},
	signinText:{
		color: '#375c99',
		fontSize:16
	},
	signinButton:{
		color:'#26477f',
		fontSize:16,
		fontWeight:'500'
	},
	errorMsg:{
		color: '#cc0000',
		}
});