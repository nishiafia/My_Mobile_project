import React from 'react';
import { MapView, Marker } from 'expo';

const MyMapView = (props) => {
	return (
		<MapView
			style={{ flex: 1 }}
			region={props.region}
			showsUserLocation={true}
			onRegionChange={(reg) => props.onRegionChange(reg)}>

			<MapView.Marker
			 title="Initial Region"
			 description="This is a description"
			 coordinate={props.region} /> 
			 {props.markers.map(marker => (
			<MapView.Marker 
				coordinate={marker.coordinates}
				title={marker.title}
			/>
			))}
			   
		  
		</MapView>
	)
}

export default MyMapView;