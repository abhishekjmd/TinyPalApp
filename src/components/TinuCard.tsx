import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { arrowUp, character, junkFood, modalRectangle, save, script, star, topArrow } from '../assets'
import { BlurView } from '@react-native-community/blur'

type TinuCardProps = {
  handleModalClose: () => void,
  tinuData: [],
  isDoYouKnow: Boolean
}

const TinuCard: React.FC<TinuCardProps> = ({ handleModalClose, tinuData, isDoYouKnow }) => {
  return (
    <Modal transparent animationType="fade" onRequestClose={handleModalClose}>
      <View style={styles.overlay}>
        <BlurView
          style={styles.blurSection}
          blurType="dark"
          blurAmount={2}

          reducedTransparencyFallbackColor="rgba(255,255,255,0.2)"
        />
        <View style={styles.modalContainer}>
          <View style={{ top: 85, right: 5 }}>
            <Text style={styles.modalHeading}>
              What are considered{'\n'} distractions?
            </Text>
            <Image source={character} style={styles.characterImage} />
          </View>
          <View style={{ position: 'absolute', top: -80 }}>
            <View style={styles.scrollContainer}>
              <FlatList
                data={isDoYouKnow ? tinuData.dyk_cards : tinuData.flash_cards}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <View style={styles.scriptCard}>
                    <View style={styles.scriptHeader}>
                      <View style={styles.scriptTag}>
                        <Image source={script} style={styles.scriptIcon} />
                        <Text style={styles.scriptText}>Script</Text>
                      </View>
                      <View style={styles.iconRow}>
                        <Image source={topArrow} style={styles.iconSmall} />
                        <Image source={save} style={styles.iconSmall} />
                      </View>
                    </View>
                    <View style={styles.scriptContent}>
                      <Text style={styles.scriptTitle}>{isDoYouKnow ? item.title : item.title}</Text>
                      <Text style={styles.scriptDescription}>
                        {isDoYouKnow ? item.content : item.content}
                      </Text>
                    </View>
                  </View>
                )}
              >
              </FlatList>
            </View>

            <View style={styles.bottomGradientContainer}>
              <LinearGradient
                colors={['#F3A9A1', '#F3EDF7']}
                start={{ x: 0.2, y: 1 }}
                end={{ x: 0.2, y: 0.2 }}
              >
                <View style={styles.contextRow}>
                  <Image source={star} style={styles.iconSmall} />
                  <Text style={styles.contextText}>Share more context of Arya</Text>
                </View>
                
                  <FlatList
                    data={isDoYouKnow ? tinuData.dyk_cards && tinuData.dyk_cards.slice(0, 2) : tinuData.flash_cards.slice(0, 2)}
                    horizontal={true}
                    scrollEnabled={true}
                    renderItem={({ item, index }) => (
                      <>
                        <View key={index} style={styles.contextChip}>
                          <Image source={junkFood} style={styles.chipIcon} />
                          <Text style={styles.chipText}>{item.title}</Text>
                        </View>
                      </>
                    )}
                    showsHorizontalScrollIndicator={false}
                    style={styles.contextScroll}
                  />

                <FlatList
                  data={isDoYouKnow ? tinuData.dyk_cards && tinuData.dyk_cards.slice(2) : tinuData.flash_cards.slice(2)}
                  horizontal={true}
                  renderItem={({ item, index }) => (
                    <>
                      <View style={styles.contextChip}>
                        <Image source={junkFood} style={styles.chipIcon} />
                        <Text style={styles.chipText}>{item.title}</Text>
                      </View>
                    </>
                  )}
                  showsHorizontalScrollIndicator={false}
                  style={styles.contextScroll}
                />

                <View style={{ width: 400, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="Ask me anything..."
                        placeholderTextColor="black"
                        style={styles.textInput}
                      />
                      <TouchableOpacity style={styles.sendButton}>
                        <Image source={arrowUp} style={styles.iconSmall} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </View>
          <Image source={modalRectangle} style={styles.modalRectangle} />
        </View>
      </View>
    </Modal>
  )
}

export default TinuCard

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
  },
  blurSection: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    height: '50%',
  },
  modalContainer: {
    width: '100%',
  },
  modalHeading: {
    zIndex: 1000,
    position: 'absolute',
    left: 165,
    bottom: 250,
    fontSize: 16,
    color: 'white',
    fontWeight: '200',
    lineHeight: 22,
  },
  characterImage: {
    width: 120,
    resizeMode: 'contain',
    zIndex: 1000,
    position: 'absolute',
    left: 45,
    bottom: 145,
  },
  scrollContainer: {
    zIndex: 50000,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scriptCard: {
    width: 250,
    backgroundColor: '#F0CFD280',
    borderWidth: 1,
    borderColor: '#CDB3C4',
    borderRadius: 25,
    marginHorizontal: 20,
  },
  scriptHeader: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scriptTag: {
    flexDirection: 'row',
    width: 90,
    height: 30,
    backgroundColor: '#CCACC099',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    gap: 5,
  },
  scriptIcon: {
    height: 20,
    width: 20,
  },
  scriptIconSmall: {
    height: 15,
    width: 15,
    resizeMode: 'center',
  },
  scriptText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '600',
  },
  iconRow: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSmall: {
    width: 20,
    height: 20,
  },
  scriptContent: {
    width: '100%',
    padding: 15,
    gap: 5,
  },
  scriptTitle: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
  scriptDescription: {
    color: 'black',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
  },
  bottomGradientContainer: {
    zIndex: 50000,
    width: '100%',
    justifyContent: 'center',
    marginTop: 30
  },
  contextRow: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  contextText: {
    color: '#7B3AD0',
    fontSize: 16,
    fontWeight: '600',
  },
  contextScroll: {
    marginHorizontal: 20,
  },
  contextScrollAlt: {
    width: '100%',
    marginTop: 10,
    marginHorizontal: 20,
  },
  contextChip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 2,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#BBBBBB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    gap: 10,
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF80',
    // minWidth:160,
  },
  chipIcon: {
    height: 30,
    width: 30,
  },
  chipText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 14,
  },
  inputWrapper: {
    width: '100%',
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '80%',
    backgroundColor: 'white',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 40,
  },
  textInput: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  sendButton: {
    backgroundColor: '#D9D9D9',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalRectangle: {
    width: '100%',
    resizeMode: 'contain',
    position: 'absolute',
    top: -1000,
  },
})