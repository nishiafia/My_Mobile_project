import React, { Component } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class MapInput extends React.Component {
	render() {
	return (
			<GooglePlacesAutocomplete
							placeholder='Search'
							minLength={4}
							autoFocus={false}
							returnKeyType={'search'} 
							listViewDisplayed={true}
							fetchDetails={true}
							onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
									alert('data=', details);
									this.props.notifyChange(details.geometry.location);
								}
							}
							query={{
									key: 'AIzaSyA1cmZYRFcbOeoKr7gbFjteJNlvBHy0iCI',
									language: 'en'
							}}
							styles={{
		
								textInputContainer: {
									backgroundColor: 'rgba(0,0,0,0)',
									borderBottomWidth:0,
									borderTopWidth:0,
									marginLeft:20,
									//width:400,
									zIndex: 10,
									overflow: 'visible',
									flexGrow: 0,
									flexShrink: 0
								},
								textInput: {
									minWidth: '90%',
									maxWidth: 400,
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
							nearbyPlacesAPI='GooglePlacesSearch'
							debounce={200}
							
			/>
	);
	}
}



	
 