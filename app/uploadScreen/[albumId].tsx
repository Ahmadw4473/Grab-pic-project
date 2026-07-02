import { StyleSheet, Text, View, Alert, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

const UploadScreen = () => {

  type fetchedImages = {
    _id: string,
    imageUrl: string,
    userid: string,
    orignalName: string,
    albumName: string
  }

  const { albumId } = useLocalSearchParams()
  const [image, setImage] = useState<any>([]);
  const [fetchedImages, setFetchedImages] = useState<fetchedImages[]>([])

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permission.granted === false) {
      Alert.alert('Permission denied')
      return
    }

    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsMultipleSelection: true,
      quality: 1,
    })

    if (!image.canceled && image.assets && image.assets.length > 0) {
      let uris = image.assets.map((assets) => {
        return assets
      })
      setImage((prev: any) => {
        return [...prev, ...uris]
      });
      uploadImageToCloud(image.assets);
    }

  }

  async function uploadImageToCloud(image: any) {
    const formData = new FormData();
    formData.append('userId', '1234')
    formData.append('albumId', `${albumId}`)
    image.forEach((file: any) => {
      formData.append('image', {
        uri: file.uri,
        name: file.fileName || 'upload.jpg',
        type: file.mimeType || 'image/jpeg',
      } as any);
    });
    const response = await fetch('http://192.168.10.7:3000/api/images/upload', {
      method: 'POST',
      body: formData

    })
    console.log('image uploaded', await response.text())

    fetchImages()

  }

  async function fetchImages() {
    const response = await fetch('http://192.168.10.7:3000/api/images/getImages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ albumId })
    })

    const data = await response.json()
    setFetchedImages(data)

  }

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Images</Text>
        <View style={styles.imageContainer}>
          <View>
            {
              fetchedImages.map((image) => (

                <View key={image._id}>
                  <Image style={styles.image} source={{ uri: image.imageUrl }} />
                </View>
              ))
            }
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.button}>
              <Text style={styles.text}>upload</Text>
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView >

  )
}

export default UploadScreen

const styles = StyleSheet.create({
  imageContainer: {
    height: 1000,
    // width: '100%'
    padding: 20
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  heading: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    margin: 20,
    marginVertical: 0
  },
  bottomContainer: {

    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: 8,
    backgroundColor: '#F7F7F9', // Matches screen background so content hides cleanly behind it
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',

  },
  image: {
    height: 150,
    width: 150
  },
  button: {
    width: '90%',
    paddingVertical: 16, // Matches the comfortable mobile tap height
    borderRadius: 12,    // Smoothly rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
})
