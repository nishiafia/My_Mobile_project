import {AsyncStorage} from 'react-native';
import {Actions} from  "react-native-router-flux";


export async function getCookie(key){
	try{
		let value = await AsyncStorage.getItem(key)
		if (value !== null) {
			// We have data!!
			let v = JSON.parse(value);
			//console.log('Value ====', v);
			return v;
		}
	}catch(e){
		console.log("Err", err);
	}
}

export async function getAllCookie(){
	try{
		let value = await AsyncStorage.getAllKeys() // getItem(key)
		console.log('Value ====', value[0]);
		if (value !== null) {
			// We have data!!
			return value[0];
		}
	}catch(err){
		console.log("Err", err);
	}
}

export async function setCookie(email,id,hashpass,fullname){
	try {
		let key = hashpass;
		let v = {email: email, id: id, hashpass: hashpass,fullname:fullname};
		console.log('Value11111111111 ====', v, hashpass);
		await AsyncStorage.setItem("requesterData", JSON.stringify(v));
	} catch (error) {
	// Error saving data
	}
}

export async function removeCookie(key){
	try{
		let value = await AsyncStorage.removeItem(key)
		if (value == null) {
			// We have data!!
			Actions.login();
			//console.log('Value ====', v);
			//return v;
		}
	}catch(e){
		console.log("Err", err);
	}
}


