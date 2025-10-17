import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { character } from '../assets'

type FooterProps ={
   text:string,
	 onPress:()=>void
}

const Footer:React.FC<FooterProps> = ({text,onPress}) => {
	return (
		<View style={styles.bottomContainer}>
			<Image source={character} style={styles.characterImage} />
			<View style={styles.bottomRow}>
				<View>
					<Text>{text}</Text>
				</View>
				<TouchableOpacity style={styles.tinuButton} onPress={onPress}>
					<Text style={styles.tinuButtonText}>Ask Tinu</Text>
				</TouchableOpacity>
			</View>
			<Image source={require('../assets/Rectangle.png')} resizeMode="center" style={styles.rectangleImage} />
		</View>
	)
}

export default Footer

const styles = StyleSheet.create({
	bottomContainer: {
		position: 'absolute',
		zIndex: 999999,
		width: '100%',
		bottom: -150,
	},
	characterImage: {
		height: 75,
		width: 70,
		top: 215,
		left: 70,
	},
	bottomRow: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 40,
		top: 220,
		zIndex: 100000000,
	},
	tinuButton: {
		backgroundColor: '#FFB4E2',
		width: 70,
		height: 30,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	tinuButtonText: {
		fontWeight: 'bold',
		fontSize: 12,
	},
	rectangleImage: {
		width: '100%',
	},
})