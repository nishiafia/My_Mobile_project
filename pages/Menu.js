import React,{ Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image,AsyncStorage} from 'react-native';
import {Actions} from  "react-native-router-flux";
import {Content,List, ListItem} from 'native-base';
import { Icon} from 'react-native-elements';
import {getCookie, getAllCookie} from './Cookie';


export default class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rid: '',
			hpass: '',
			chkemail: '',
			fname: "",
			isLoggedIn: 'false'
		};
	}
	componentDidMount() {
		var requestersession={};
		getCookie("requesterData")
		.then(cookie =>{
			console.log("cookie>>=",cookie );
			if(typeof cookie !== 'undefined' && cookie !== null){
				requestersession = cookie;
				this.setState({
					wid: requestersession.id,
					hpass: requestersession.hashpass,
					chkemail: requestersession.email,
					fname: requestersession.fullname,
					isLoggedIn: 'true'
				});
			}
		});
	}
	signOut = async() => {
		try {
			await AsyncStorage.clear();
			Actions.login();
		} 	catch(error) {
			console.log('logout =',error);
		}
	}
	render(){
		return (
			<View style={styles.container}>
				<View style={{alignItems: 'center'}}>
					<Image source={require('../images/profileavator.png')} style={{width:150,height:150}} />
					<Text style={styles.profilename}>{this.state.fname}</Text>
				</View>
				<View style={{flex:1,backgroundColor:'#fedc00',marginTop: 20}}>
					<Content >
						<List>
							<ListItem onPress={()=> Actions.home()}>
							<Icon name='home' /><Text style={styles.menuText}> Home</Text>
							</ListItem>
							<ListItem onPress={()=> Actions.tasklist()}>
							<Icon name='all-inclusive' /><Text style={styles.menuText}> Task List</Text>
							</ListItem>
							<ListItem onPress={()=> Actions.tasklistunassigned()}>
							<Icon name='open-with' /><Text style={styles.menuText}>Tasklist (Unassigned)</Text>
							</ListItem>
							<ListItem onPress={()=> Actions.newtask()}>
							<Icon name='open-in-new' /><Text style={styles.menuText}> New Task</Text>
							</ListItem>
							<ListItem onPress={()=> Actions.profile()}>
							<Icon name='face' /><Text style={styles.menuText}> Profile</Text>
							</ListItem>
							<ListItem onPress={()=> Actions.settings()}>
							<Icon name='build' /><Text style={styles.menuText}> Settings</Text>
							</ListItem>
							<ListItem onPress={this.signOut}>
							<Icon name='lock-open' type='Entypo' /><Text style={styles.menuText}> Logout</Text>
							</ListItem>
						</List>
					</Content>
				</View>
			</View>
		);
 }
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'transparent',
		marginVertical:16, 
	  },
	profilename:{
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom:20,
		color:'#26477f',
		textAlign:'center',
	},
	menuText:{
		fontSize: 18,	
		color:'#000',
	},
	rating:{
	},
	
});