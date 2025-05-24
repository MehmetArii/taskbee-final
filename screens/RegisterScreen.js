import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import GlobalStyles from '../styles/GlobalStyles';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => Alert.alert('Kayıt Başarılı', 'Giriş yapabilirsiniz.'))
      .catch((error) => Alert.alert('Kayıt Hatası', error.message));
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

        <TouchableOpacity style={GlobalStyles.button} onPress={handleRegister}>
          <Text style={GlobalStyles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>

        {/* Giriş Yap Butonu */}
        <Text style={{ marginTop: 20, textAlign: 'center', color: '#666' }}>
          Zaten hesabın var mı?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ textAlign: 'center', color: '#f5c518', marginTop: 4, fontWeight: 'bold' }}>
            Giriş Yap
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
