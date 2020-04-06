import React,{ Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView,Image, Alert,Modal,TouchableHighlight,ActivityIndicator} from 'react-native';
import {Actions} from  "react-native-router-flux";
import {Content,List, ListItem} from 'native-base';
import { Rating } from 'react-native-elements';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import axios from 'axios';
import SERVERURL from './util';
import {getCookie} from './Cookie';

export default class Taskdetail extends React.Component {
	constructor(props){
		super(props);
			this. state = {
				showHideModal: false,
				showWorkerModal: false
			}
}
componentDidMount(){
	console.log("taskid =", this.props.taskid);
	var taskid= this.props.taskid;
	getCookie("requesterData")
		.then(cookie =>{
			if(typeof cookie !== 'undefined' && cookie !== null){
				axios.get(SERVERURL + '/taskdetail?id='+taskid)
				.then((response) =>{
					let taskData = response.data;
					console.log("response: ", response.data);
					this.setState({
						fullname: taskData.fullname,
						address: taskData.taskaddress,
						tasktype: taskData.tasktype,
						taskdetail: taskData.taskdetail,
						taskstatus: taskData.taskstatus,
						taskamount: taskData.amount,
						taskamounttype: taskData.amounttype,
						amountstatus: taskData.amountstatus,
						taskdate: taskData.taskdate,
						wrating: taskData.wrating,
						avgrating: taskData.avgrating,
						mobile: taskData.mobile,
						workerid: taskData.workerid
					}, ()=>{
						console.log("state =", this.state);
					});
				})
				.catch((error) =>{
					// handle error
					console.log('er =',error);
				});
			}
		});
}
	ratingCompleted =(rating)=> {
		var ratdata={};
		var tid= this.props.taskid;
		console.log("tid: ", tid);
		console.log("ratt: ", rating);
		ratdata.id= tid;
		ratdata.wrating= rating;
		//ratdata.worker_id= this.state.workerid;
		axios.post(SERVERURL + '/rat', ratdata)
		.then((response) =>{
			console.log("res: ", response.data);
			this.setState({
				//amountstatus: response.data.amountstatus,
			
			}, ()=>{
				//console.log("state =", this.state);
			});

		})
		.catch((error) =>{
		// handle error
		console.log('er =',error);
		});
	}
	workerInfo = () =>{
		this.setState({showWorkerModal: true});	
	}
	WorkerModalclose =() =>{
		this.setState({showWorkerModal: false});	
		//Actions.tasklist();
	}
	makePayment =() =>{
		Alert.alert(
			'Do You Want to Make Payment?',
			'',
			[
				{text: 'No',onPress: () => console.log('No Pressed'),style: 'cancel'},
				{text: 'Yes', onPress: () =>{this.paymentdone()}},
			],
			{cancelable: false},
		);
	}
	paymentdone =() =>{
		var tid= this.props.taskid;
		axios.get(SERVERURL + '/payment?id='+tid)
		.then((response) =>{
			console.log("response: ", response.data);
			this.setState({
				amountstatus: response.data.amountstatus,
			
			}, ()=>{
				//console.log("state =", this.state);
				Alert.alert("Payment Done");
			});

		})
		.catch((error) =>{
		// handle error
		console.log('er =',error);
		});
	}
	submitNclose = () =>{
		this.setState({showHideModal: true}, ()=>{
			setTimeout(() =>{
				this.setState({showHideModal: false});
				//Actions.home();
				//this.setState({showWorkerModal: true});
			}, 5000)
		})
	}
	returnTask=() =>{
		Actions.jobhistory();
	}
 render(){
	const { rating } = this.props;
	const ratingFinal= this.props;
	const { navigate } = this.props.navigation;
	
	/*ratingCompleted = (rating) => { this.setState({ratingFinal:rating}); 
		Alert.alert("Your Rating is: " + ratingFinal);
		console.log('Rating is: ' + ratingFinal);
	}*/
		return (
			<View style={styles.container}>
				<View style={{alignItems: 'center'}} ><Text style={styles.headertitleText} >Task Details</Text></View>
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
								startingValue={this.state.avgrating}
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
								<Text style={styles.jobstatus}>Please Wait a Moment!</Text>
								</View>
								</View>
						</Modal>}
						<ScrollView >
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
								<Content >
									<List style={styles.listDesign}>
									<ListItem style={styles.listItemView} noBorder={true}>
									<View style={{alignItems: 'flex-end',flex:1}}>
									<Rating
										imageSize={20}
										readonly={false}
										startingValue={this.state.wrating}
										fractions={0}
										ratingCount={5}
										showRating={false}
										type="star"
										style={styles.ratingstyle}
										ratingColor="#f1c40f"
										ratingTextColor="#26477f"
										onFinishRating={this.ratingCompleted}
										/>
										</View>
											</ListItem>
											<ListItem style={styles.listItemView} noBorder={true}>
													<Text style={styles.titletext} >Task Location:</Text><Text   style={styles.paragraph}>{this.state.address}</Text>
											</ListItem>
											<ListItem noBorder>
													<Text style={styles.titletext}>Task Category:</Text><Text >{this.state.tasktype}</Text>
											</ListItem>
											<ListItem noBorder>
													<Text style={styles.titletext}>Task Deatils:</Text><Text >{this.state.taskdetail}</Text>
											</ListItem>
											<ListItem noBorder>
												<Text  style={styles.titletext}>Worker:</Text>
													<TouchableOpacity onPress={this.workerInfo}>
														<Text style={styles.workername}>{this.state.fullname}</Text>
													</TouchableOpacity>
											</ListItem>
											<ListItem noBorder>
													<Text style={styles.titletext}>Task Status:</Text><Text >{this.state.taskstatus}</Text>
											</ListItem>
											<ListItem noBorder>
													<Text  style={styles.titletext}>Time :</Text><Text >{this.state.taskdate} {"\n"}20/04/2019 03:00 pm</Text>
											</ListItem>
											<ListItem noBorder>
													<Text style={styles.titletext}>Task Amount:</Text><Text >{this.state.taskamount} RM / {this.state.taskamounttype}</Text>
											</ListItem>
											{this.state.taskstatus=='Done' &&
											<ListItem style={{alignItems: 'center',justifyContent: 'center'}}>
												<View  style={styles.button}>
													
													{this.state.amountstatus=='0'?
													<TouchableOpacity onPress={this.makePayment} >		
														<Text style={styles.acceptButton}>Make Payment</Text>
													</TouchableOpacity> : <Text style={styles.acceptButton}>Payment Done</Text> 
													}	
												</View>									
											</ListItem>
											}
											
									</List>
								</Content>
							</ReactNativeZoomableView>
						</ScrollView>
		 	</View>
		);
 }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headertitleText: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom:20,
		color:'#26477f',
		marginTop:10,
		
		},
	titletext:{
		fontSize: 18,	
		color:'#414f66',
		fontWeight: 'bold',
		width:150,
		textAlignVertical: 'auto',
		flexWrap: 'wrap',
		},
	cancelButton:{
		color:'red',
		fontSize:16,
		fontWeight:'500',
	},
	acceptButton:{
		color:'black',
		fontSize:16,
		fontWeight:'500',
	},
	listDesign: {
		margin:10,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: '#414f66'			
	},
	listItemView:{
		marginBottom:0,
	},
	buttonstyle:{
		flexDirection:'row',
	},
	button: {
		backgroundColor:'#fedc00',
		borderRadius: 10,
		margin:10, 
		width:150,
		height:40,
		alignItems: 'center',
		justifyContent: 'center',
	},
	paragraph: {
		flexWrap: 'wrap',
		flex:1,
	  },
	workername:{
		fontWeight: 'bold',
		color:'#414f66',
	},
	ratingstyle: {
		flexDirection: 'row',
		
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
	activityIndicator:{
		flex: 1,
		justifyContent:'center',
		alignItems:'center',
		height: 80
		},
	jobstatus:{
		color:'green',
		fontSize:16,
		fontWeight:'bold',
		textAlign: 'center',
	},
});