import { useAuth } from '@clerk/expo'
import { Redirect } from 'expo-router'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useUser } from '@clerk/expo'
export default function MainScreen() {
    const { isLoaded, isSignedIn } = useAuth({ treatPendingAsSignedOut: false })
    const { user } = useUser()

    if (!isLoaded) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
    if (!isSignedIn) {
        return <Redirect href="/(auth)/signIn" />
    }
    return (
        <Redirect
            href={{
                pathname: '/albumScreen/[userId]',
                params: {
                    userId: user?.id,
                },
            }}
        />
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
