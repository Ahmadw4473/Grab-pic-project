import { useAuth } from '@clerk/expo'
import { Redirect } from 'expo-router'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export default function MainScreen() {
    const { isLoaded, isSignedIn } = useAuth({ treatPendingAsSignedOut: false })

    if (!isLoaded) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return <Redirect href={isSignedIn ? '/createAlbum' : '/(auth)/signIn'} />
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
