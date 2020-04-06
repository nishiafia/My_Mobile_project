import React,{ Component, Const } from 'react';
import { StyleSheet } from 'react-native';
import {Scene, Router, Actions, Drawer} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Menu from './pages/Menu';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Tasklist from './pages/Tasklist';
import Taskdetail from './pages/Taskdetail';
import Newtask from './pages/Newtask';
import Tasklistunassigned from './pages/Tasklistunassigned';

const MenuIcon=() =>{return(<Icon name='menu'size={30} ></Icon>)}
const Routes = (name) => {
		return (
			<Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle} sceneStyle={styles.routerScene}>
				<Drawer
					key="drawer"
					drawer
					hideBackImage={false}
					headerBackTitle="back"
					contentComponent={Menu}
					drawerWidth={280}
					drawerIcon={MenuIcon}>
						<Scene key="root" hideNavBar={false}  >
							<Scene key="login" component={Login} title="Login"  initial={true}  drawer={false} hideNavBar={true}/>
							<Scene key="signup" component={Signup} title="Signup"  drawer={false} hideNavBar={true}/>
								<Scene key="home" component={Home} title="Home" passProps={true} drawer={true}    />
								<Scene key="tasklist" component={Tasklist} title="Task List" drawer={true}/>
								<Scene key="newtask" component={Newtask} title="New Task" passProps={true} drawer={true}/>
								<Scene key="profile" component={Profile} title="Profile" drawer={true}/>
								<Scene key="settings" component={Settings} title="Settings" drawer={true}/>
								<Scene key="taskdetail" component={Taskdetail} title="Task Detail" drawer={true}/>
								<Scene key="tasklistunassigned" component={Tasklistunassigned} title="Tasklist (Unassigned)" drawer={true}/>
						</Scene>
				</Drawer>
				
			</Router>
		);
}
export default Routes;
const styles = StyleSheet.create({
navBar: {
	backgroundColor: '#fedc00', // changing navbar color
 	},
	navTitle: {
	color: '#000000', // changing navbar title color
	},
	
});
