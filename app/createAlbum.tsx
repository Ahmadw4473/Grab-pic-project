import { StyleSheet, Text, View, TouchableOpacity, Pressable, Modal, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import UploadScreen from './uploadScreen'
import { SafeAreaView } from 'react-native-safe-area-context'

const createAlbum = () => {
  const [modalVisible, setModelVisible] = useState(false)

  let albums = []

  return (
    <SafeAreaView>
      <View>
        <KeyboardAvoidingView>
          <Modal visible={modalVisible} transparent animationType='fade'>

            <TouchableOpacity onPress={() => setModelVisible(false)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)' }}>

              <View style={styles.modalContainer}>
                <View style={styles.modalHandle} />
                <Text style={styles.modalTitle}>Create album</Text>
                <TextInput placeholder='Enter Album Name...' style={styles.modalInput}></TextInput>
                <View style={styles.modalActions}>
                  <Pressable style={styles.modalButton}>
                    <Text style={styles.modalPrimaryText}>Cancel</Text>
                  </Pressable>
                  <Pressable style={styles.modalButton}>
                    <Text style={styles.modalPrimaryText}>Submit</Text>
                  </Pressable>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={() => setModelVisible(true)}>

          <Text>create album</Text>
        </TouchableOpacity>

      </View>
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