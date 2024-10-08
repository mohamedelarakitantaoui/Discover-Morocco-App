import React from 'react';
import { useAssets } from 'expo-asset';
import { Text, View, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Link } from 'expo-router';
import {
  TouchableOpacity,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';

const Page = () => {
  const [assets] = useAssets([
    require('@/assets/video/Captivating Image Montage_ Tranquil Courtyard to Cozy Rooftop.mp4'),
  ]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {assets && (
          <Video
            resizeMode={ResizeMode.COVER} // Corrected property usage
            isMuted
            isLooping
            shouldPlay
            source={{ uri: assets[0].uri }}
            style={styles.video}
          />
        )}
        <View style={styles.overlay}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Asalamo!</Text>
          </View>
          <View style={styles.buttons}>
            <Link href="/login" asChild>
              <TouchableOpacity style={styles.buttonL}>
                <Text style={styles.buttonTextL}>Login in</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/signup" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sign up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer: {
    marginTop: 80,
    padding: 20,
  },
  header: {
    fontSize: 36,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#2a9d8f',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  buttonL: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonTextL: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
  },
  button: {
    backgroundColor: Colors.grenno,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
  },
});

export default Page;
