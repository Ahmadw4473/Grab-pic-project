import { useAuth, useClerk, useUser } from '@clerk/expo'
import { useSignIn } from '@clerk/expo/legacy'
import { Redirect, useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    Button,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'

const SignIn = () => {
    const { user } = useUser()
    const router = useRouter()
    const { isLoaded: isAuthLoaded, isSignedIn } = useAuth({ treatPendingAsSignedOut: false })
    const { setActive } = useClerk()
    const { signIn, isLoaded: isSignInLoaded } = useSignIn()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const authReady = isAuthLoaded && isSignInLoaded

    async function handleSignIn() {
        if (!signIn || !setActive) return

        setIsSubmitting(true)
        try {
            const result = await signIn.create({
                identifier: email.trim(),
                password,
            })

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId })
            } else {
                Alert.alert('Sign in needs another step', result.status ?? 'Unknown status')
            }
        } catch (error: any) {
            Alert.alert('Sign in failed', getClerkError(error))
        } finally {
            setIsSubmitting(false)
        }
    }

    function goToSignUp() {
        router.push({
            pathname: '/(auth)/SignUp',
            params: { email: email.trim() },
        })
    }

    if (!authReady) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if (isSignedIn) {
        return <Redirect href={{
            pathname: '/albumScreen/[userId]',
            params: {
                userId: user?.id
            }
        }} />
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Text style={styles.title}>Sign in</Text>

            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="Email"
                style={styles.input}
                value={email}
            />
            <TextInput
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                value={password}
            />
            <View style={styles.buttonRow}>
                <Button disabled={isSubmitting} title="Sign in" onPress={handleSignIn} />
            </View>
            <Button title="Need an account? Sign up" onPress={goToSignUp} />
        </KeyboardAvoidingView>
    )
}

function getClerkError(error: any) {
    return error?.errors?.[0]?.longMessage || error?.errors?.[0]?.message || error?.message || 'Something went wrong'
}

export default SignIn

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        gap: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: '#4b5563',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
    },
    buttonRow: {
        marginTop: 4,
    },
})
