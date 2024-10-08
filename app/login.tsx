import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo';

const Page = () => {
  const [email, setEmail] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'android' ? 80 : 0;
  const router = useRouter();
  const { signIn } = useSignIn();

  const onSignIn = async () => {
    try {
      const { supportedFirstFactors } = await signIn!.create({
        identifier: email,
      });

      const firstEmailFactor: any = supportedFirstFactors.find(
        (factor: any) => {
          return factor.strategy === 'email_code';
        }
      );
      const { emailAddressId } = firstEmailFactor;
      await signIn!.prepareFirstFactor({
        strategy: 'email_code',
        emailAddressId,
      });

      router.push({
        pathname: '/verify/[email]',
        params: { email, signin: 'true' },
      });
    } catch (err) {
      console.error('Sign in error', JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        if (err.errors[0].code === 'form_identifier_not_found') {
          Alert.alert('Error', err.errors[0].message);
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Discoverma</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your email, we will send you a confirmation code there
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.gray}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            email !== '' ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          onPress={onSignIn}
        >
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.gray,
            }}
          />
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.gray,
            }}
          />
        </View>
        <Link href={'/signup'} replace asChild>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primary,
  },
});

export default Page;
