import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import * as Progress from 'react-native-progress';
import Header from '../components/Header';
import { laughingBoy, oneRectangle, } from '../assets';
import TinuCard from '../components/TinuCard';
import { requestBody } from '../config';

const Flashcard = () => {
  const [showModal, setShowModal] = useState(false);
  const [tinuData, setTinuData] = useState();

  const fetchTinuData = async () => {
    try {
      const data = await fetch('https://genai-images-4ea9c0ca90c8.herokuapp.com/p13n_answers', {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify(requestBody)
      })
      const savedData = await data.json();
      setTinuData(savedData)
      console.log('data', savedData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTinuData()
  }, [])

  const handleTinuPress = () => {
    fetchTinuData();
    setShowModal(true);
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Header headingText='Unlearn Old Patterns' subHeadingText='No Distractions 101' />
      <View style={styles.main}>
        {/* Progress bar section */}
        <View style={styles.progress}>
          <Progress.Bar
            progress={1}
            width={20}
            color="#FFFFFF"
            unfilledColor="#C4C4C4"
            borderWidth={0}
            height={4}
            borderRadius={4}
          />
          <Progress.Bar
            progress={0.6}
            width={240}
            color="#FFFFFF"
            unfilledColor="#C4C4C4"
            borderWidth={0}
            height={4}
            borderRadius={4}
          />
          <Progress.Bar
            progress={0}
            width={15}
            color="#FFFFFF"
            unfilledColor="#C4C4C4"
            borderWidth={0}
            height={4}
            borderRadius={4}
          />
          <Progress.Bar
            progress={0}
            width={15}
            color="#FFFFFF"
            unfilledColor="#C4C4C4"
            borderWidth={0}
            height={4}
            borderRadius={4}
          />
          <Progress.Bar
            progress={0}
            width={15}
            color="#FFFFFF"
            unfilledColor="#C4C4C4"
            borderWidth={0}
            height={4}
            borderRadius={4}
          />
          <Progress.Bar
            progress={0}
            width={15}
            color="#FFFFFF"
            unfilledColor="#C4C4C4"
            borderWidth={0}
            height={4}
            borderRadius={4}
          />
        </View>
        <Image source={laughingBoy} resizeMode="cover" style={styles.sickGirlImage} />
        {showModal ? (
          <TinuCard
            isDoYouKnow={false}
            tinuData={tinuData}
            handleModalClose={() => setShowModal(false)} />
        ) : (

          <>
            <Image source={oneRectangle} style={{ width: '100%', resizeMode: 'contain', bottom: 120 }} />
            <View style={{ backgroundColor: '#4C7B9E', height: 360, borderBottomRightRadius: 30, borderBottomLeftRadius: 30, bottom: 200 }}>
              <View style={{ paddingHorizontal: 20, height: '100%', gap: 20, flexDirection: 'row' }}>
                <View style={{ width: 4, height: 220, backgroundColor: 'white', marginTop: 55 }} />
                <View style={{ gap: 20, height: '100%', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }}>What Qualifies as{'\n'}Distractions?</Text>
                  <Text style={{ fontSize: 16, color: 'white', fontWeight: 'semibold', lineHeight: 23 }}>Toys and screens? Obvious{'\n'} distractions. But so are:{'\n'}
                    - “Open your mouth! Here comes an{'\n'} aeroplane wooooo!!”{'\n'}
                    - “Look there’s a bird!”, as the bite{'\n'} goes in child name’s mouth.{'\n'}
                    - “I’m closing my eyes. Let me see{'\n'} who comes to take a bite: you or the{'\n'} cat!”
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
        {/* Bottom Section */}
      </View>
      <Footer
        text='What can I talk about instead?'
        onPress={handleTinuPress}
      />
    </View>

  )
}

export default Flashcard

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#081824',
    flex: 1,
  },
  main: {
    marginTop: 20,
  },
  progress: {
    width: '100%',
    position: 'absolute',
    zIndex: 10000,
    paddingHorizontal: 20,
    paddingTop: 5,
    top: 15,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  sickGirlImage: {
    width: '100%',
    height: 280,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

})