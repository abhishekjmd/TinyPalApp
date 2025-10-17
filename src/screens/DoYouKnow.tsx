import {
  Button,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  arrowLeft,
  arrowUp,
  bottomTapBackground,
  character,
  crossArrow,
  doYouKnow,
  ellipse,
  junkFood,
  modalRectangle,
  save,
  script,
  sickGirl,
  star,
  topArrow,
} from '../assets';
import * as Progress from 'react-native-progress';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TinuCard from '../components/TinuCard';
import { requestBody } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DoYouKnow = () => {
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
      <Header headingText="Unlearn Old Patterns" subHeadingText="Distractions=No No!" />
      <View style={styles.main}>
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
            width={300}
            color="#FFFFFF"
            unfilledColor="#C4C4C4"
            borderWidth={0}
            height={4}
            borderRadius={4}
          />
        </View>

        <Image source={sickGirl} resizeMode="cover" style={styles.sickGirlImage} />

        {showModal ? (
          <TinuCard
            isDoYouKnow={true}
            tinuData={tinuData}
            handleModalClose={() => setShowModal(false)}
          />
        ) : (
          <View>
            <Image source={doYouKnow} style={styles.doYouKnowImage} />
            <View style={styles.contentWrapper}>
              <View style={styles.cardRow}>
                <View style={styles.textCard}>
                  <Text style={styles.cardText}>Eating with distractions</Text>
                </View>
                <Image source={crossArrow} style={styles.crossArrowImage} />
                <View style={styles.textCard}>
                  <Text style={styles.cardText}>Higher rates of healthy food refusal</Text>
                </View>
              </View>

              <View style={styles.descriptionWrapper}>
                <Text style={styles.descriptionText}>
                  One study found that kids were twice as likely to become picky eaters when they ate with distractions
                </Text>
              </View>

              <View style={styles.journalWrapper}>
                <Text style={styles.journalText}>Journal of Applied Developmental Psychology</Text>
              </View>
            </View>

            <Image source={ellipse} style={styles.ellipseImage} />
          </View>
        )}
      </View>

      <Footer
        text="What are considered distractions?"
        onPress={handleTinuPress}
      />
    </View>
  );
};

export default DoYouKnow;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#270b13',
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
    height: 320,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  doYouKnowImage: {
    position: 'absolute',
    zIndex: 50000,
    height: 80,
    width: 150,
    resizeMode: 'contain',
    top: -150,
    left: 130,
  },
  contentWrapper: {
    width: '100%',
    flexDirection: 'column',
    paddingHorizontal: 10,
    position: 'absolute',
    zIndex: 70000,
    top: -35,
  },
  cardRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textCard: {
    borderWidth: 1.5,
    borderColor: 'white',
    width: 130,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 20,
    backgroundColor: '#df8ea5',
  },
  cardText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 18,
  },
  crossArrowImage: {
    width: 45,
    height: 45,
  },
  descriptionWrapper: {
    padding: 40,
  },
  descriptionText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    lineHeight: 20,
  },
  journalWrapper: {
    marginTop: 40,
  },
  journalText: {
    textAlign: 'center',
    color: '#FCCCA8',
    fontSize: 15,
    lineHeight: 20,
    textDecorationLine: 'underline',
  },
  ellipseImage: {
    position: 'absolute',
    zIndex: 10000,
    width: '100%',
    bottom: -320,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

});
