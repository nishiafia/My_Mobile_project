import React,{ Component,Fragment } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView,Image,Picker } from 'react-native';
import {Actions} from  "react-native-router-flux";
import {Content,List, ListItem} from 'native-base';
import ValidationComponent from '../formvalidator/index';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import axios from 'axios';
import SERVERURL from './util';
import {getCookie} from './Cookie';

export default class Profile extends ValidationComponent{
	constructor(props) {
		super(props);
			this.state = {
				fullname: "",
				address: "",
				email: "",
				mobile: ""
			};
		
			this.focusNextField = this.focusNextField.bind(this);
			this.inputs = {};

	}
		focusNextField(id) {
			this.inputs[id].focus();
		}

		componentDidMount(){
			getCookie("requesterData")
			.then(cookie =>{
				if(typeof cookie !== 'undefined' && cookie !== null){
					axios.get(SERVERURL + '/requester?id=' + cookie.id)
					.then((response) =>{
						let userData = response.data;
						this.setState({
							fullname: userData.fullname,
							address: userData.address,
							email: userData.email,
							mobile: userData.mobile
						}, ()=>{
							console.log("state =", this.state);
						});
						console.log("response: ", response.data.address);
					})
					.catch((error) =>{
						console.log('Profile error =', error);
					});
				}
			});
		}
		saveProfile = () => {

			var profileData = {};
			getCookie("requesterData")
			.then(cookie =>{
				if(typeof cookie !== 'undefined' && cookie !== null){
					profileData.id = cookie.id
					console.log('ridd1 =', cookie.id);
					profileData.fullname = this.state.fullname;
					profileData.mobile = this.state.mobile;
					profileData.email= this.state.email;
					profileData.address = this.state.address;
					profileData.password = this.state.password;
					//loginData.mobile = "123456"
					axios.post(SERVERURL + '/register',profileData)
					.then(function (response) {
					// handle success
						console.log('rs =', response.data);
						if(response.data){
							alert("Update Successful");
							//Actions.login();
							}else{
								alert('Wrong');
							}
					})
					.catch(function (error) {
						// handle error
						console.log('er =',error);
					});
				}
			});
		}
		
 render(){  
		const { rating } = this.props;
		return (
			<View style={styles.container}>
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
				<View style={{alignItems: 'center',marginTop:10}}>
					<Image source={require('../images/profileavator.png')} style={{width:120,height:120}} ></Image>
					<Text style={styles.profilename}>{this.state.fullname}</Text>
				</View>
				
				<ScrollView>
					<Content>
						<List style={styles.listDesign}>
							<ListItem style={styles.listItemView} noBorder={true}>
								<Text style={styles.titleText}>Full Name</Text>
								<TextInput 
									style={ styles.inputBox}  
									placeholder="fullname"
									onChangeText={(fullname) => this.setState({fullname})} 
									value={this.state.fullname} 
									blurOnSubmit={ false }
									onSubmitEditing={() => {this.focusNextField('email');}} 
									returnKeyType = {"next"} 
									ref={ input => {this.inputs['fullname'] = input;}}
								>
								</TextInput>
							</ListItem>
							<ListItem style={styles.listItemView} noBorder={true}>
								<Text style={styles.titleText}>Email</Text>
								<TextInput 
									style={ styles.inputBox} 
									placeholder="email"
									onChangeText={(email) => this.setState({email})}
									value={this.state.email} 
									blurOnSubmit={ false }
									onSubmitEditing={() => {this.focusNextField('mobile');}} 
									returnKeyType = {"next"} 
									ref={ input => {this.inputs['email'] = input;}}
									editable={false}
								 >
								</TextInput>
							</ListItem>
							<ListItem style={styles.listItemView} noBorder={true}>
								<Text style={styles.titleText}>Mobile</Text>
								<TextInput 
									style={ styles.inputBox} 
									placeholder="mobile"
									onChangeText={(mobile) => this.setState({mobile})}
									value={this.state.mobile} 
									blurOnSubmit={ false }
									onSubmitEditing={() => {this.focusNextField('address');}} 
									returnKeyType = {"next"} 
									ref={ input => {this.inputs['mobile'] = input;}}
								>
								</TextInput>
							</ListItem>
							<ListItem style={styles.listItemView} noBorder={true}>
								<Text style={styles.titleText}>Address</Text>
								<TextInput
									multiline={true} 
									numberOfLines={4} 
									style={ styles.textArea} 
									placeholder="address"
									onChangeText={(address) => this.setState({address})}
									value={this.state.address} 
									blurOnSubmit={ false }
									onSubmitEditing={() => {this.focusNextField('password');}} 
									returnKeyType = {"next"} 
									ref={ input => {this.inputs['address'] = input;}}
								>
								</TextInput>
			
							</ListItem>
							<ListItem style={styles.listItemView} noBorder={true}>
								<Text style={styles.titleText}>Password</Text>
								<TextInput 
									style={ styles.inputBox} 
									secureTextEntry={true}
									placeholder="password"
									onChangeText={(password) => this.setState({password})}
									value={this.state.password} 
									blurOnSubmit={ true }
									returnKeyType = {"done"} 
									ref={ input => {this.inputs['password'] = input;}}
								>
								</TextInput>
							</ListItem>
								<ListItem style={{alignItems: 'center',justifyContent: 'center'}} noBorder={true}>
									<TouchableOpacity style={styles.button} onPress={this.saveProfile}>
									<Text style={styles.buttonText}>Save</Text>
									</TouchableOpacity>
							</ListItem>
						</List>
					</Content>
				</ScrollView>
				</ReactNativeZoomableView>
		 </View>
		
	);
}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headertitleText: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom:20,
		color:'#26477f',
	},
	inputBox: {
		minWidth: '60%',
		maxWidth: 250,
		minHeight: '6%',
		maxHeight: 50,
		backgroundColor:'#eaf0f9',
		borderRadius: 20,
		paddingHorizontal:10,
		fontSize:20,
		borderWidth: 2,
		borderColor:'#d0d9e2',
		fontSize:16,
		color:'#375c99',
	},
	textArea: {
		height: 150,
		minWidth: '48%',
		maxWidth: 250,
		justifyContent: "flex-start",
		textAlignVertical:'top',
		backgroundColor:'#eaf0f9',
		borderRadius: 20,
		paddingHorizontal:10,
		fontSize:20,
		paddingTop:10,
		marginTop:10,
		color: '#375c99',
		borderWidth: 2,
		borderColor:'#d0d9e2',
		},
	listDesign: {
		margin:5,
	},
	listItemView:{
		marginBottom:0,
	},
	button: {
		backgroundColor:'#fedc00',
		borderRadius: 20,
		paddingHorizontal:0, 
		marginVertical:0, 
		minWidth: '60%',
		maxWidth: 200,
		height:50,
	},
	buttonText:{
		fontSize: 20,
		fontWeight:'500',
		color:'#000',
		textAlign:'center',
		marginTop:7,
		},
	titleText:{
		fontSize: 18,	
		color:'#414f66',
		width:100,
	},
	profilename:{
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom:20,
		color:'#26477f',
		textAlign:'center',
	},
});