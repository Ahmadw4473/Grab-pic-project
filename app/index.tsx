import { StyleSheet, Text, View, Button, Pressable, Alert, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'

const index = () => {

  const [image, setImage] = useState<any>([]);

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permission.granted == false) {
      Alert.alert('Permission denied')
      return
    }

    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      // allowsEditing: true,
      // aspect:,
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
    image.forEach((file: any) => {
      formData.append('image', {
        uri: file.uri,
        name: file.fileName || 'upload.jpg',
        type: file.mimeType || 'image/jpeg',
      } as any);
    });
    const response = await fetch('http://192.168.10.6:3000/api/images/upload', {
      method: 'POST',
      body: formData

    })
    console.log('image uploaded')

  }

  return (
    <ScrollView>
      <View>
        <Button title='upload' onPress={pickImage}></Button>
        {

          image.map((images: any, index: number) => (
            <View key={index}>
              <Image style={styles.image} source={{ uri: images.uri }} />
            </View>
          ))
        }

      </View>
    </ScrollView>

  )
}

export default index

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100
  }
})