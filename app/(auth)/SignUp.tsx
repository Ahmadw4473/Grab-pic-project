import { useClerk } from '@clerk/expo'
import { useSignUp } from '@clerk/expo/legacy'
import { useLocalSearchParams, useRouter } from 'expo-router'
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

type SignUpStep = 'form' | 'verify'

const SignUp = () => {
    const router = useRouter()
    const params = useLocalSearchParams<{ email?: string }>()
    const { setActive } = useClerk()
    const { signUp, isLoaded: isSignUpLoaded } = useSignUp()

    const [step, setStep] = useState<SignUpStep>('form')
    const [email, setEmail] = useState(params.email ?? '')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSignUp() {
        if (!signUp) return

        setIsSubmitting(true)
        try {
            await signUp.create({
                emailAddress: email.trim(),
                password,
            })

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
            setStep('verify')
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

    if (!isSignUpLoaded) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Text style={styles.title}>{step === 'form' ? 'Create account' : 'Verify email'}</Text>

            {step === 'form' ? (
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
                        <Button disabled={isSubmitting} title="Sign up" onPress={handleSignUp} />
                    </View>
                    <Button title="Already have an account? Sign in" onPress={() => router.push('/(auth)/signIn')} />
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
                    <Button title="Back" onPress={() => setStep('form')} />
                </>
            )}
        </KeyboardAvoidingView>
    )
}

function getClerkError(error: any) {
    return error?.errors?.[0]?.longMessage || error?.errors?.[0]?.message || error?.message || 'Something went wrong'
}

export default SignUp

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
