import React, { Component } from 'react';
import { StyleSheet,AsyncStorage, Text,TouchableWithoutFeedback, View, TextInput,Image, TouchableOpacity, ScrollView, Picker,ActivityIndicator,Modal,TouchableHighlight, KeyboardAwareScrollView, Keyboard} from 'react-native';
import {Actions} from  "react-native-router-flux";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import ValidationComponent from '../formvalidator/index';
import { Rating } from 'react-native-elements'; 
import axios from 'axios';
import SERVERURL from './util';
import {getCookie} from './Cookie';


export default class Newtask extends ValidationComponent{
	constructor(props){
		super(props);
			this.state = {
					showHideModal: false,
					showWorkerModal: false,
					address:"",
					latitude:"",
					longitude:"",
					placename:"",
					fullname:"",
					mobile:"",
					arating:"",
					taskdetail:"",
					amount:"",
		
			};
			this.focusNextField = this.focusNextField.bind(this);
			this.inputs = {};
	}
	focusNextField(id) {
		this.inputs[id].focus();
	}
	componentDidMount()
	{
		getCookie("requesterData")
		.then(cookie =>{
			if(typeof cookie !== 'undefined' && cookie !== null){
			}
		})
	}
	submitNclose = () =>{
		getCookie("requesterData")
		.then(cookie =>{
			if(typeof cookie !== 'undefined' && cookie !== null){
				var taskData = {};
				taskData.id = 0
				taskData.amounttype = this.state.amounttypeValue;
				this.setState({showHideModal: true});
				taskData.taskplacename = this.state.placename;
				taskData.taskaddress = this.state.address;
				taskData.latitude = this.state.latitude;
				taskData.longitude = this.state.longitude;
				taskData.tasktype = this.state.pickerValue;
				taskData.taskdetail = this.state.taskdetail;
				taskData.amount = parseFloat(this.state.amount);
				taskData.taskstatus = 'New';
				taskData.workerid = 0
				taskData.requesterid = cookie.id;
				console.log('rs data =', taskData);
				axios.post(SERVERURL + '/newtask',taskData)
				.then(response => {
				// handle success
					let workerData = response.data;
					console.log('rsrrrrrr =', workerData);
					//var md="";
					if(workerData=='405')
					{
						setTimeout(() =>{
							this.setState({showHideModal: false});
							alert('No worker found at this moment.\n Task will assign later.');
							Actions.tasklistunassigned();
						}, 5000);
					}
					if(typeof workerData !=='undefined' && workerData !== '405'){
						let gps = workerData.GpsSetting;
						this.setState({
							fullname: workerData.fullname,
							arating: workerData.avgrating,
							mobile: workerData.mobile,
							wlatitude: gps.lat,
							wlongitude: gps.long,
						})
						this.setState({showHideModal: false});
						//Actions.home();
						this.setState({showWorkerModal: true});
						
					}else{
						alert('Task Not Assign');
					}
					//Actions.login();
				})
				.catch(function (error) {
					// handle error
					console.log('erfinal =',error);
				})
				.then(function () {
					// always executed
				}); 

				
			}
		})
	}
	WorkerModalclose =() =>{
		this.setState({showWorkerModal: false});
		console.log("gps =" + this.state.amount);
		Actions.home({
				wname: this.state.fullname,
				wlat:this.state.wlatitude,
				wlng:this.state.wlongitude,
				plat:this.state.latitude,
				plng:this.state.longitude
			});
	}
	render() {
		const { rating } = this.props;
		console.log('this.props =', this.props.hashpassword);
		return (
		<View style={styles.container}>
		<View style={{alignItems: 'center'}} >
				<Text style={styles.headertitleText} >Post Your New Task </Text>
			</View>
			{this.state.showHideModal &&
			<Modal
				animationType="fade"
				transparent={true}
				visible={this.state.showHideModal}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
				}}>
				<View  style={styles.modalBackgroundStyle}>
					<View style={styles.innerContainerTransparentStyle}>
						<ActivityIndicator
							size={"large"}
							color='#000'
							animating={true} 
						/>
						<Text style={styles.workersearch}>We are finding nearest worker! </Text>
					</View>
				</View>
			</Modal>}
			{this.state.showWorkerModal &&
			<Modal
				animationType="fade"
				transparent={true}
				visible={this.state.showWorkerModal}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
				}}>
				<View  style={styles.modalBackgroundStyle}>
					<View style={styles.innerContainerWorkerTransparentStyle}>
						<Image source={require('../images/profileavator.png')} />
						<Text style={styles.profilename}>{this.state.fullname}</Text>
						<Text style={styles.phone}>{this.state.mobile}</Text>
						<Rating
							imageSize={20}
							readonly={true}
							startingValue={this.state.arating}
							fractions={1}
							ratingCount={5}
							showRating={false}
							type="star"
							style={styles.ratingstyle}
							ratingColor="#f1c40f"
							ratingTextColor="#26477f"
							/>
						<TouchableHighlight 
						onPress={this.WorkerModalclose}>
						<Text style={styles.closeButton}>OKAY</Text>
						</TouchableHighlight>
					</View>
				</View>
			</Modal>}
			
			<View >
					<Text style={styles.titleText}>Location</Text>
					<GooglePlacesAutocomplete
						placeholder='Enter Location'
						minLength={4}
						autoFocus={false}
						returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
						keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
						listViewDisplayed='false'    // true/false/undefined
						fetchDetails={true}
						renderDescription={(row) => row.description || row.vicinity}
						onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
						//alert("address="+details.vicinity);
						this.setState(
						{
							address: details.vicinity, // selected address
							placename: details.name, 
							latitude: details.geometry.location.lat,
							longitude: details.geometry.location.lng,
							//coordinates: `${details.geometry.location.lat},${details.geometry.location.lng}` // selected coordinates
						}
						);
						}}
						styles={{
							textInputContainer: {
							backgroundColor: 'rgba(0,0,0,0)',
							borderBottomWidth:0,
							borderTopWidth:0,
							marginLeft:42,
							marginRight:42,
							zIndex: 10,
							overflow: 'visible',
							flexGrow: 0,
							flexShrink: 0
						},
						textInput: {
							height: 50,
							color: '#375c99',
							fontSize: 16,
							backgroundColor:'#eaf0f9',
							borderWidth: 2,
							borderColor:'#d0d9e2',
							borderRadius: 20,
						},
						listView: {
							position: 'absolute',
							top: 60,
							left: 50,
							right: 0,
							backgroundColor: 'white',
							borderRadius: 10,
							flex: 1,
							elevation: 3,
							zIndex: 500,
							width: 400,
						},
						description: {
							fontWeight: 'bold',
							color: '#26477f',
							fontSize:16,
						},
						predefinedPlacesDescription: {
							color: '#26477f',
						},
						
						}}
						query={{
							// available options: https://developers.google.com/places/web-service/autocomplete
							key: 'AIzaSyA1cmZYRFcbOeoKr7gbFjteJNlvBHy0iCI',
							language: 'en', // language of the results
							types: 'geocode' // default: 'geocode'
						}}

						nearbyPlacesAPI='GooglePlacesSearch'
						debounce={200}
						currentLocation={true}
						currentLocationLabel='Current location'
						renderLeftButton={()  => {}}
						renderRightButton={() => {}}
					/> 
					
				</View>
				<View style={styles.newtask}>
				<Text style={styles.titleTexttype}>Task Type</Text>
				<View style={{borderWidth:2,borderColor:'#d0d9e2', backgroundColor:'#eaf0f9',borderRadius:20,marginTop:10}}>
				
				<Picker 
					style={{
						minWidth: '82%',
						minHeight: '6%',
						maxWidth: 390,
						maxHeight: 45,
						color: '#375c99'
					}}
					selectedValue={(this.state && this.state.pickerValue) || 'Select Task Type'}
					onValueChange={(value) => {
						this.setState({pickerValue: value});
					}}
				>
					<Picker.Item label='Please select Task Type' value=''/>
					<Picker.Item label={'Plumber'} value={'Plumber'} />
					<Picker.Item label={'Electrician'} value={'Electrician'} />
					<Picker.Item label={'AC Maker'} value={'AC Maker'} />
					<Picker.Item label={'Painter'} value={'Painter'} />
					<Picker.Item label={'Home tutor'} value={'Home tutor'} />
				</Picker>
			</View>
			

				<Text style={styles.titleText}>Task Detail</Text>
				<TextInput 
					multiline={true} 
					numberOfLines={4} 
					style={ styles.textArea}
					name='taskdetail' 
					placeholder='taskdetail'  
					placeholderTextColor='#375c99' 
					onChangeText={(taskdetail) => this.setState({taskdetail})} 
					value={this.state.taskdetail} 
					blurOnSubmit={true}
					onSubmitEditing={() => {this.focusNextField('amount');}} 
					returnKeyType = {"next"} 
					onPress={() => Keyboard.dismiss()}
				/>
			
			
				<Text style={styles.titleText}>Amount</Text>	
				<View style={styles.amountTextCont}> 
				<TextInput 
					style={ styles.inputBoxamount} 
					name='amount'  
					placeholder='amount'
					placeholderTextColor='#375c99' 
					onChangeText={(amount) => this.setState({amount})} 
					value={this.state.amount} 
					blurOnSubmit={ true }
					//onSubmitEditing={() => {this.focusNextField('amounttypeValue');}} 
					returnKeyType = {"next"} 
					ref={ input => {this.inputs['amount'] = input;}}
					keyboardType='numeric'
					
				/>
					<View style={{borderWidth:1,borderColor:'#d0d9e2', backgroundColor:'#eaf0f9',borderRadius:15,marginLeft: 20}}>
				
				<Picker 
					style={{
						width: 160,
						height: 45,
						color: '#375c99'
					}}
					selectedValue={(this.state && this.state.amounttypeValue) || 'Total'}
					onValueChange={(value) => {
						this.setState({amounttypeValue: value});
					}}
				>
					<Picker.Item label={'Total'} value={'Total'} />
					<Picker.Item label={'Per Hour'} value={'PerHour'} />
					<Picker.Item label={'Weekly'} value={'Weekly'} />
					<Picker.Item label={'Monthly'} value={'Monthly'} />
				</Picker>
			</View>
			</View>
				<TouchableOpacity style={styles.button} onPress={this.submitNclose}>
					<Text style={styles.buttonText}>Submit Task</Text>
				</TouchableOpacity>
			</View>
			
			</View>
		
	);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containerTop: {
		flexDirection: 'row',
		paddingBottom: 30,
		zIndex: 200,
	 },
  
	headertitleText: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom:20,
		color:'#26477f',
		zIndex: 0,
		marginTop:10,
	},
	
	newtask:{
		marginTop:70,
		alignItems: 'center',
		justifyContent: 'center',
		//backgroundColor:'blue'
	
	},
	inputBox: {
		minWidth: '82%',
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
	inputBoxamount: {
		width: 160,
		height: 50,
		backgroundColor:'#eaf0f9',
		borderRadius: 20,
		paddingHorizontal:16,
		fontSize:16,
		//marginVertical:16, 
		borderWidth: 2,
		borderColor:'#d0d9e2',
	},
	button: {
		backgroundColor:'#fedc00',
		borderRadius: 25,
		paddingHorizontal:16, 
		marginVertical:16, 
		minWidth: '60%',
		minHeight: '6%',
		maxWidth: 390,
		maxHeight: 40,
	},
	buttonText:{
		fontSize: 20,
		fontWeight:'500',
		color:'#000',
		textAlign:'center',
		marginTop:5,
	},
	titleText:{
		fontSize: 16,	
		color:'#414f66',
		textAlign: 'center',
		marginTop:10,
	},
	titleTexttype:{
		fontSize: 16,	
		color:'#414f66',
		textAlign: 'center',
	},
	textArea: {
		minWidth: '82%',
		minHeight: '6%',
		maxWidth: 400,
		maxHeight: 150,
		justifyContent: "flex-start",
		textAlignVertical:'top',
		backgroundColor:'#eaf0f9',
		borderRadius: 20,
		paddingHorizontal:10,
		fontSize:16,
		paddingTop:10,
		marginTop:10,
		color: '#375c99',
		borderWidth: 2,
		borderColor:'#d0d9e2',
		},
	activityIndicator:{
		flex: 1,
		justifyContent:'center',
		alignItems:'center',
		height: 80
		},
	 modalBackgroundStyle: {
		backgroundColor: 'rgba(52, 52, 52, 0.8)',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'column',
	},
	innerContainerTransparentStyle: {
		backgroundColor: '#fff',
		padding: 20,
		borderRadius:10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		width:200,
		height:200
	},
	innerContainerWorkerTransparentStyle: {
		backgroundColor: '#fff',
		padding: 20,
		borderRadius:10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		width:300,
	},
	modalText: {
		fontSize: 20,
		paddingBottom:20,
		
		},
	modalTexttitle: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom:20,
		textDecorationLine: 'underline',
		textTransform: 'uppercase',
		},
	closeButton:{
		color:'grey',
		fontSize:16,
		fontWeight:'500',
		textAlign: 'center',
		paddingTop:20,
	},
	workersearch:{
		color:'red',
		fontSize:16,
		fontWeight:'bold',
		textAlign: 'center',
	},
	profilename:{
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom:10,
		color:'#26477f',
		textAlign:'center',
	},
	phone:{
		fontSize: 20,
		fontWeight: '500',
		paddingBottom:10,
		color:'#26477f',
		textAlign:'center',
	},
	ratingstyle: {
		flexDirection: 'row',
	},
	amountTextCont:{
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingVertical:16,
		flexDirection:'row'
	},
});