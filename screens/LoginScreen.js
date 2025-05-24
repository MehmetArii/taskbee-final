import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import GlobalStyles from '../styles/GlobalStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => Alert.alert('Giriş Başarılı', 'Hoş geldiniz!'))
      .catch((error) => Alert.alert('Giriş Hatası', error.message));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={GlobalStyles.container}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">
        <Text style={GlobalStyles.logo}>
          🐝 <Text style={{ color: '#222' }}>Task</Text><Text style={{ color: '#f5c518' }}>Bee</Text>
        </Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={GlobalStyles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          style={GlobalStyles.input}
          secureTextEntry
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={GlobalStyles.button} onPress={handleLogin}>
          <Text style={GlobalStyles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>

        {/* Kayıt Ol Butonu */}
        <Text style={{ marginTop: 20, textAlign: 'center', color: '#666' }}>
          Üye değil misin?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{ textAlign: 'center', color: '#f5c518', marginTop: 4, fontWeight: 'bold' }}>
            Kayıt Ol
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
