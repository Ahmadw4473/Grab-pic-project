import { StyleSheet, Text, View, TouchableOpacity, Pressable, Modal, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
// import UploadScreen from './uploadScreen/[uploadScreen]'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { useRouter } from 'expo-router'

const createAlbum = () => {
  const router = useRouter()
  type Album = {
    _id: string,
    albumName: string,
    userId: string
    joiningCode: string
  }
  const [modalVisible, setModelVisible] = useState(false)
  const [joinModalVisible, setJoinModelVisible] = useState(false)
  const [albumNameState, setAlbumNameState] = useState('')
  const [albums, addAlbums] = useState<Album[]>([])
  const [joiningCode, setJoiningCode] = useState('')
  const [joining, setJoining] = useState(false)

  async function albumToBackend() {
    setModelVisible(false)
    const response = await fetch('http://192.168.10.7:3000/api/Albums/createAlbum', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: albumNameState,
        userId: '1234',
        joinCode: 'abc123'
      })
    })
    fetchAlbums()
  }

  async function joinAlbum() {
    try {
      const response = await fetch('http://192.168.10.7:3000/api/Albums/joinAlbum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          joinCode: joiningCode
        })

      })
      const data = await response.json()
      if (data) {
        addAlbums((prev) => { return [...prev, data] })
      }

    }
    catch (error) {
      console.log(error)
    }
  }
  async function fetchAlbums() {
    try {

      const response = await fetch('http://192.168.10.7:3000/api/Albums/getAlbums', {
        method: 'GET'
      })
      let data = await response.json()
      addAlbums(data)
    }
    catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchAlbums()
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView>
          <Modal visible={modalVisible} transparent animationType='fade'>

            <Pressable onPress={() => setModelVisible(false)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)' }}>
              <Text style={styles.modalTitle}>Create album</Text>

              <TextInput placeholder='Enter Album Name...' style={styles.modalInput} onChangeText={(text) => setAlbumNameState(text)} ></TextInput>
              <View style={styles.modalActions}>

                <Pressable style={styles.modalButton} onPress={() => setModelVisible(false)}>
                  <Text style={styles.modalPrimaryText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.modalButton} onPress={albumToBackend}>
                  <Text style={styles.modalPrimaryText}>Submit</Text>
                </Pressable>

              </View>
            </Pressable>
          </Modal>

          <Modal visible={joinModalVisible} transparent animationType='fade'>

            <Pressable onPress={() => setJoinModelVisible(false)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)' }}>
              <Text style={styles.modalTitle}>Join Album</Text>

              <TextInput placeholder='Enter Joining code...' style={styles.modalInput} onChangeText={(text) => setJoiningCode(text)} ></TextInput>
              <View style={styles.modalActions}>

                <Pressable style={styles.modalButton} onPress={() => setJoinModelVisible(false)}>
                  <Text style={styles.modalPrimaryText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.modalButton} onPress={() => {
                  setJoinModelVisible(false)
                  joinAlbum()
                }}>
                  <Text style={styles.modalPrimaryText}>Submit</Text>
                </Pressable>

              </View>
            </Pressable>
          </Modal>
        </KeyboardAvoidingView>

        {
          albums.map((album) => (

            <Pressable key={album._id} onPress={() => router.push({
              pathname: '/uploadScreen/[albumId]',
              params: {
                albumId: album._id
              }
            })}>
              <View style={{ width: 60, height: 60, margin: 20 }}>
                <Text> {album.albumName}</Text>
              </View>
            </Pressable>
          ))
        }
        <View>
          <TouchableOpacity onPress={() => setModelVisible(true)}>
            <Text>create album</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setJoinModelVisible(true)}>
            <Text>Join Album</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default createAlbum

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.45)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },

  modalHandle: {
    width: 42,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#d1d5db',
    alignSelf: 'center',
    marginBottom: 18,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },

  modalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 18,
  },

  modalInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    marginBottom: 14,
  },

  modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },

  modalButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalPrimaryButton: {
    backgroundColor: '#2563eb',
  },

  modalSecondaryButton: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  modalPrimaryText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },

  modalSecondaryText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '700',
  },
})