<GooglePlacesAutocomplete
				placeholder='Enter Location'
				minLength={4}
				autoFocus={true}
				returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
				keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
				listViewDisplayed={true}    // true/false/undefined
				fetchDetails={true}
				onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
					console.log(data, details);
					alert('data = ', data);
				}}
				styles={{
					textInputContainer: {
						backgroundColor: 'rgba(0,0,0,0)',
						borderBottomWidth:0,
						borderTopWidth:0,
						marginLeft:20,
					},
					textInput: {
						minWidth: '82%',
						maxWidth: 390,
						height: 50,
						color: '#375c99',
						fontSize: 16,
						backgroundColor:'#eaf0f9',
						borderWidth: 2,
						borderColor:'#d0d9e2',
						borderRadius: 20,
						
					},
					description: {
						fontWeight: 'bold'
					},
					predefinedPlacesDescription: {
						color: '#375c99'
					}
				}}
				currentLocation={true}
				currentLocationLabel="Current location"
				query={{
					// available options: https://developers.google.com/places/web-service/autocomplete
					key: 'AIzaSyA1cmZYRFcbOeoKr7gbFjteJNlvBHy0iCI',
					language: 'en', // language of the results
					//types: 'geocode' // default: 'geocode'
					types: '(cities)'
				}}
				renderDescription={row => row.description}
				nearbyPlacesAPI='GooglePlacesSearch'
				debounce={200}/> 



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
	
	newtask:{
		margin:10,
		alignItems: 'center',
		justifyContent: 'center',
	
	},
	button: {
		backgroundColor:'#d0d9e2',
		borderRadius: 25,
		paddingHorizontal:16, 
		marginVertical:16, 
		minWidth: '60%',
		minHeight: '6%',
		maxWidth: 390,
		maxHeight: 40,
	},
	buttonText:{
		fontSize: 20,
		fontWeight:'500',
		color:'#26477f',
		textAlign:'center',
		marginTop:5,
	},
	titleText:{
		fontSize: 20,	
		color:'#414f66',
	},
	textArea: {
		minWidth: '82%',
		minHeight: '6%',
		maxWidth: 400,
		maxHeight: 150,
		justifyContent: "flex-start",
		textAlignVertical:'top',
		backgroundColor:'#eaf0f9',
		borderRadius: 20,
		paddingHorizontal:10,
		fontSize:16,
		paddingTop:10,
		marginTop:10,
		color: '#375c99',
		borderWidth: 2,
		borderColor:'#d0d9e2',
		},
	activityIndicator:{
		flex: 1,
		justifyContent:'center',
		alignItems:'center',
		height: 80
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
	workersearch:{
		color:'red',
		fontSize:16,
		fontWeight:'bold',
		textAlign: 'center',
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
	ratingstyle: {
		flexDirection: 'row',
		
		
	},
});
