//https://maps.googleapis.com/maps/api/distancematrix/json?
//origins=1.609344,0.8684&destinations=1.909344,0.9984
//&key=AIzaSyDQJC00jb-klLliQkSQtr18tBwS_9wBSUc
import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions,ViewPropTypes,AsyncStorage } from 'react-native';
import { MapView, Marker, Polyline } from 'expo';
import { Constants } from 'expo';
import MapInput from '../components/Mapinput';
import { getLocation } from '../services/Locationservice';
import {Actions, Reducer} from  "react-native-router-flux";
import {getCookie, getAllCookie} from './Cookie';

export default class Home extends React.Component {
	constructor(props){
		super(props);
			this.state = {
			region: {
				latitude: 3.053990,
				longitude: 101.688340,
				latitudeDelta: 0.003,
				longitudeDelta: 0.003,
			},
			taskmarkers: [{
				title: 'Requester Location',
				coordinates: {
					latitude: 3.053990,
					longitude: 101.688340,
				},
			},
			{
				title: 'Worker Location',
				coordinates: {
					latitude:  3.0531,
					longitude: 101.692,
				},
			}],
			coords: [] ,
		};
	}
	componentDidMount() {
		let p = this.props;
		this.setState({
			taskmarkers: [{
				title: 'Requester Location',
					coordinates: {
						latitude: p.plat,
						longitude: p.plng,
					},
				},
				{
					title: p.wname,
					coordinates: {
						latitude: p.wlat,
						longitude: p.wlng,
					},
				}
			],
		});
	}
	render() {
		if(this.props.wname === ""){
			return <View style={styles.container}>
						<Text style={styles.headertitleText}>Welcome to your panel. </Text>
					</View>
		}
		return (
			<View style={styles.container}> 
				{this.state.region['latitude'] ? (
						<MapView
							ref={map=>{this.mapView = map}}
							mapType={"standard"}
							style={{ flex: 1}}
							region={this.state.region}
							showsUserLocation={true}
							clustering={true}
							followUserLocation={true}
							zoomEnabled={true}
							ScrollEnabled={true}
							showsBuildings={false}
							showsMyLocationButton={false}
							showsTraffic={true}
							rotateEnabled={true}
							loadingEnabled={true}
							loadingIndicatorColor="#606060"
							loadingBackgroundColor="#FFFFFF"
							moveOnMarkerPress={true}>
						{this.state.taskmarkers.map((marker, index) => (
							<MapView.Marker
									key={index} 
									coordinate={marker.coordinates}
									title={marker.title}
									>
							</MapView.Marker>
						))} 
						<MapView.Polyline
						coordinates={[
							this.state.taskmarkers[0].coordinates,
							this.state.taskmarkers[1].coordinates,
						]} 
						strokeWidth={3} 
						strokeColor="red" 
						lineCap="square"
						lineJoin="miter"
						/>
				</MapView>
			 ) : null}
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
		},
});