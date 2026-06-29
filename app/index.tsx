import { useAuth, useClerk, useUser } from '@clerk/expo'
import { useSignIn, useSignUp } from '@clerk/expo/legacy'
import { useState } from 'react'
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

type AuthMode = 'signIn' | 'signUp' | 'verify'

export default function MainScreen() {
    const { isLoaded: isAuthLoaded, isSignedIn } = useAuth({ treatPendingAsSignedOut: false })
    const { user } = useUser()
    const { setActive, signOut } = useClerk()
    const { signIn, isLoaded: isSignInLoaded } = useSignIn()
    const { signUp, isLoaded: isSignUpLoaded } = useSignUp()

    const [mode, setMode] = useState<AuthMode>('signIn')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const authReady = isAuthLoaded && isSignInLoaded && isSignUpLoaded

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

    async function handleSignUp() {
        if (!signUp) return

        setIsSubmitting(true)
        try {
            await signUp.create({
                emailAddress: email.trim(),
                password,
            })

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
            setMode('verify')
        } catch (error: any) {
            Alert.alert('Sign up failed', getClerkError(error))
        } finally {
            setIsSubmitting(false)
        }
    }

    async function handleVerify() {
        if (!signUp || !setActive) return

        setIsSubmitting(true)
        try {
            const result = await signUp.attemptEmailAddressVerification({ code: code.trim() })

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId })
            } else {
                Alert.alert('Verification needs another step', result.status ?? 'Unknown status')
            }
        } catch (error: any) {
            Alert.alert('Verification failed', getClerkError(error))
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!authReady) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if (isSignedIn) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Signed in</Text>
                <Text style={styles.subtitle}>{user?.primaryEmailAddress?.emailAddress}</Text>
                <View style={styles.buttonRow}>
                    <Button title="Sign out" onPress={() => signOut()} />
                </View>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >
            <Text style={styles.title}>
                {mode === 'signIn' ? 'Sign in' : mode === 'signUp' ? 'Create account' : 'Verify email'}
            </Text>

            {mode !== 'verify' ? (
                <>
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
                        <Button
                            disabled={isSubmitting}
                            title={mode === 'signIn' ? 'Sign in' : 'Sign up'}
                            onPress={mode === 'signIn' ? handleSignIn : handleSignUp}
                        />
                    </View>
                    <Button
                        title={mode === 'signIn' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
                        onPress={() => setMode(mode === 'signIn' ? 'signUp' : 'signIn')}
                    />
                </>
            ) : (
                <>
                    <Text style={styles.subtitle}>Enter the code sent to {email}</Text>
                    <TextInput
                        keyboardType="number-pad"
                        onChangeText={setCode}
                        placeholder="Verification code"
                        style={styles.input}
                        value={code}
                    />
                    <View style={styles.buttonRow}>
                        <Button disabled={isSubmitting} title="Verify" onPress={handleVerify} />
                    </View>
                    <Button title="Back" onPress={() => setMode('signUp')} />
                </>
            )}
        </KeyboardAvoidingView>
    )
}

function getClerkError(error: any) {
    return error?.errors?.[0]?.longMessage || error?.errors?.[0]?.message || error?.message || 'Something went wrong'
}

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
