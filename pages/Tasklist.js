import React,{ Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView,Image,Alert} from 'react-native';
import {Actions} from  "react-native-router-flux";
import {Content,List, ListItem, Item} from 'native-base';
import {Table, TableWrapper, Row, Rows, Col, Cols,Cell} from 'react-native-table-component';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import axios from 'axios';
import SERVERURL from './util';
import {getCookie} from './Cookie';
  

export default class Tasklist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tableData:[],
			tableHead: ['Task Type', 'Location', 'Worker', 'Status', 'Action']
		}
	}
	componentDidMount(){
		getCookie("requesterData")
		 .then(cookie =>{
			if(typeof cookie !== 'undefined' && cookie !== null){
				//var getData={}
				axios.get(SERVERURL + '/tasklist?id='+cookie.id)
				.then((response) =>{
					let getData = response.data;
					let tableData = [];
					console.log("response: ", response.data);
					response.data.forEach(element => {
						//tableData.push([element.tasktype, element.taskplacename, element.fullname, element.taskstatus, element.id]);
						tableData.push(element);
					});
					this.setState({tableData: tableData});
					console.log('table =',tableData);
				})
				.catch((error) =>{
					// handle error
					console.log('er =',error);
				});
			}
		});
	}
	_detailTask =(id) =>{
		const { navigate } = this.props.navigation;
		Actions.taskdetail({taskid: id});
	}
	render(){
		let loopArray = [];
		this.state.tableData.forEach((elm, index) =>{
			loopArray
				.push(<List style={styles.listDesign} key={index}>
							<ListItem style={styles.listItemView}  noBorder >
								<Text style={styles.paragraph} numberOfLines={1}>{elm.tasktype.substr(0, 4)}..</Text>
							</ListItem>
							<ListItem style={styles.listItemView} noBorder >
								<Text style={styles.paragraph} numberOfLines={1}>{elm.taskplacename.substr(0, 6)}..</Text>
							</ListItem>
							<ListItem style={styles.listItemView}  noBorder>
								<Text style={styles.paragraph} numberOfLines={1}>{elm.fullname.substr(0, 6)}..</Text>
							</ListItem>
							<ListItem style={styles.listItemView}  noBorder>
								<Text style={styles.paragraph} numberOfLines={1}>{elm.taskstatus.substr(0, 4)}..</Text>
							</ListItem>
							<ListItem style={styles.listItemViewNoBorder} noBorder>
								<TouchableOpacity onPress={() => this._detailTask(elm.id)}>
									<View style={styles.btn}>
										<Text style={styles.btnText}>Details</Text>
									</View>
								</TouchableOpacity>
							</ListItem>
						</List>
			);
		});
		return (
			<View style={styles.container}>
				<View style={{alignItems: 'center'}} ><Text style={styles.headertitleText} >Task List</Text></View>
				<ScrollView style={styles.dataWrapper}>
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
						}}>
						<Content style={styles.contentbody} >
							<List style={styles.listheader} >
								<ListItem  noBorder style={styles.listsubhead} >
								<Text style={styles.titletext}>Type</Text>
								</ListItem>
								<ListItem   noBorder style={styles.listsubhead} >
								<Text style={styles.titletext}>Location</Text>
								</ListItem>
								<ListItem  noBorder style={styles.listsubhead} >
								<Text style={styles.titletext}>Worker</Text>
								</ListItem>
								<ListItem  noBorder  style={styles.listsubhead}>
								<Text style={styles.titletext}>Status</Text>
								</ListItem>
								<ListItem   noBorder  style={styles.listsubheadlast}>
								<Text style={styles.titletext}>Action</Text>
								</ListItem>
							</List>
								{loopArray}
						</Content>
					</ReactNativeZoomableView>
				</ScrollView>
		 </View>
		);
 }}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	headertitleText: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom:20,
		color:'#26477f',
		marginTop:10,
		
		},
	titletext:{
		fontSize: 8,	
		color:'#414f66',
		},
	header: {
		height: 50,
		backgroundColor: '#d0d9e2' 
		},
 	text: { 
		textAlign: 'left', 
		fontWeight: '200' 
	},
	paragraph: {
		textAlign: 'left', 
		fontSize: 7,
	},
	row: { flexDirection: 'row', height: 50 },
	btn: {
		alignItems:'center',
		},
	btnText: { 
		fontSize: 7,
		color:'#26477f',
		justifyContent: 'center',
		},
	contentbody: {
		margin: 5,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#414f66',
		width: '98%',
		},
	listheader: {
		height: 50,
		backgroundColor: '#d0d9e2' ,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginTop:10,
		},
	listDesign: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		borderBottomWidth: 1,
		borderColor: 'grey',
		marginBottom: 1,
		fontSize: 7,
		},
	listItemView:{
		marginBottom:0,
		borderRightWidth: 1,
		borderColor: 'grey',
		fontSize: 7,
		height: 45,
		width: 50,
	},
	listItemViewNoBorder:{
		marginBottom:0,
		borderColor: 'grey',
		fontSize: 7,
		//height: 45,
		width: 45,
	},
	listsubhead:{
		width: 50,
	},
	listsubheadlast:{
		width: 45,
	}
});
