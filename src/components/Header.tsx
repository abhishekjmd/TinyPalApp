import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { arrowLeft } from '../assets'
import { useNavigation } from '@react-navigation/native'

type HeaderProps = {
  headingText:string,
  subHeadingText:string
}

const Header:React.FC<HeaderProps> = ({headingText,subHeadingText}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconWrapper}  >
        <Image source={arrowLeft} style={styles.arrowIcon} />
      </TouchableOpacity>
      <View style={styles.headerTextWrapper}>
        <Text style={styles.headingText}>{headingText}</Text>
        <Text style={styles.subHeadingText}>{subHeadingText}</Text>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  iconWrapper: {},
  arrowIcon: {
    width: 20,
    height: 20,
  },
  headerTextWrapper: {
    borderLeftWidth: 1,
    borderLeftColor: '#FFFFFF80',
    paddingLeft: 15,
    width: '80%',
  },
  headingText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 14,
  },
  subHeadingText: {
    color: '#FFFFFF80',
    fontSize: 12,
  },
})