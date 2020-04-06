import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,Image, TouchableOpacity, ScrollView, Picker,ActivityIndicator,Modal,TouchableHighlight } from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
const windowSize = require('Dimensions').get('window')
const deviceWidth = windowSize.width;
const deviceHeight = windowSize.height;
export default class Googleplace extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		    address:"",
		    coordinates: "",
		    lat:null,
		    lng:null,
		}
	 }

getAdd(data){
  alert("add",data);
  this.setState(
	 {
	   address: data.formatted_address, // selected address
	   lat: data.geometry.location.lat,//  selected coordinates latitude
	   lng:data.geometry.location.lng, //  selected coordinates longitute

	 }
    );
 console.log("this.state.address",this.state.address); ///to console address
 console.log("this.state.coordinates",this.state.lat,this.state.lng); /// to console coordinates

}
	render() {
  return (
			<GooglePlacesAutocomplete
			placeholder='Enter Location'
			minLength={2}
			autoFocus={true}
			returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
	 		//keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
			listViewDisplayed={false}    // true/false/undefined
			fetchDetails={true}
			renderDescription={row => row.description} 
			onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
			console.log(data, details);
			alert('data = ', data.description);
			this.setState(
				{
				  address: data.description, // selected address
				  coordinates: `${details.geometry.location.lat},${details.geometry.location.lng}` // selected coordinates
				}
			   );
			}}
			styles={{
			  
			textInputContainer: {
			backgroundColor: 'rgba(0,0,0,0)',
			borderBottomWidth:0,
			borderTopWidth:0,
			marginLeft:42,
			//width:400,
			zIndex: 10,
			overflow: 'visible',
			flexGrow: 0,
			flexShrink: 0
			},
			textInput: {
			minWidth: '70%',
			maxWidth: 370,
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
				left: 10,
				right: 10,
				backgroundColor: 'white',
				borderRadius: 20,
				flex: 1,
				elevation: 3,
				zIndex: 500
			   },
			description: {
			fontWeight: 'bold'
			},
			predefinedPlacesDescription: {
			color: '#375c99'
			}
			}}
			query={{
			// available options: https://developers.google.com/places/web-service/autocomplete
			key: 'AIzaSyA1cmZYRFcbOeoKr7gbFjteJNlvBHy0iCI',
			language: 'en', // language of the results
			//types: 'geocode' // default: 'geocode'
			}}
		    
			nearbyPlacesAPI='GooglePlacesSearch'
			debounce={200}
			currentLocation={true}
			//renderRightButton={() => <Text>Custom text after the input</Text>}
			/> 
  );
}}

	