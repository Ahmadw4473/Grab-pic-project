import { StyleSheet, Text, View, Button, Pressable, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Assets } from '@react-navigation/elements';

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
    }

  }

  return (
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

  )
}

export default index

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100
  }
})