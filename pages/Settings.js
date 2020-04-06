import React,{ Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,  Modal, TouchableHighlight, Alert } from 'react-native';
import {Content,List, ListItem} from 'native-base';
import { Icon } from 'react-native-elements';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';


export default class Settings extends React.Component {
	state = {
		termModal: false,
		privacyModal: false,
		helpModal: false
	};

	settermModalVisible = () =>{
		this.setState({termModal: true});
	}
	settermModalclose = () =>{
		this.setState({termModal: false});
	}
	setprivacyModalVisible = () =>{
		this.setState({privacyModal: true});
	}
	setprivacyModalclose = () =>{
		this.setState({privacyModal: false});
	}
	sethelpModalVisible = () =>{
		this.setState({helpModal: true});
	}
	sethelpModalclose = () =>{
		this.setState({helpModal: false});
	}
	
 render(){
	const { termModal, privacymodal, modal3 } = this.state;
		return (
		<View style={styles.container}>
			<View style={{alignItems: 'center'}} ><Text style={styles.headertitleText} >Settings</Text></View>
				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.termModal}
					onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					}}>
						<View  style={styles.modalBackgroundStyle}>
							<View style={styles.innerContainerTransparentStyle}>
							<Text style={styles.modalTexttitle}>Terms and Conditions</Text>
							<Text style={styles.modalText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
								<TouchableHighlight onPress={this.settermModalclose}>
								<Text style={styles.closeButton}>CLOSE</Text>
								</TouchableHighlight>
							</View>
						</View>
				</Modal>

				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.privacyModal}
					onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					}}>
						<View  style={styles.modalBackgroundStyle}>
							<View style={styles.innerContainerTransparentStyle}>
							<Text style={styles.modalTexttitle}>Privacy</Text>
							<Text style={styles.modalText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
								<TouchableHighlight onPress={this.setprivacyModalclose}>
								<Text style={styles.closeButton}>CLOSE</Text>
								</TouchableHighlight>
							</View>
						</View>
				</Modal>

				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.helpModal}
					onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					}}>
						<View  style={styles.modalBackgroundStyle}>
							<View style={styles.innerContainerTransparentStyle}>
							<Text style={styles.modalTexttitle}>Help</Text>
							<Text style={styles.modalText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
							<TouchableHighlight onPress={this.sethelpModalclose}>
							<Text style={styles.closeButton}>CLOSE</Text>
							</TouchableHighlight>
							</View>
						</View>
				</Modal>
				
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
						<List>
							<ListItem style={styles.listItemView}>
							    <Icon name='control-point' color='#f44242' />
								<TouchableOpacity onPress={this.settermModalVisible}>
								<Text style={styles.titletext} >  Terms And Conditions</Text>
								</TouchableOpacity>
							</ListItem>
							<ListItem>
							  	<Icon name='security' color='#f44242' />
								<TouchableOpacity onPress={this.setprivacyModalVisible}>
									<Text style={styles.titletext}> Privacy</Text>
								</TouchableOpacity>
							</ListItem>
							{/*<ListItem>
								<Icon name='contacts' color='#f44242' />
								<TouchableOpacity onPress={this.invitefriend}>
									<Text style={styles.titletext}> Invite A Friend</Text>
								</TouchableOpacity>
							</ListItem>*/}
							<ListItem noBorder>
								<Icon name='help-outline' color='#f44242' />
								<TouchableOpacity onPress={this.sethelpModalVisible}>
									<Text style={styles.titletext}> Help</Text>
								</TouchableOpacity>
							</ListItem>
							
						</List>
					</Content>
				</ReactNativeZoomableView>	
		 </View>
		);
 }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
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
		},
	listItemView:{
		marginBottom:0,
	},
	paragraph: {
		flexWrap: 'wrap',
		flex:1,
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
		minWidth: '90%',
		maxWidth: 400,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#414f66',
		alignItems:'center',
		justifyContent: 'center',
		//marginLeft: 40,

	},
	modalText: {
		fontSize: 20,
		paddingBottom:20,
		marginLeft:10,
		
		},
	modalTexttitle: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom:20,
		textDecorationLine: 'underline',
		textTransform: 'uppercase',
		},
	closeButton:{
		color:'red',
		fontSize:16,
		fontWeight:'500',
		textAlign: 'center',
		},
	
});