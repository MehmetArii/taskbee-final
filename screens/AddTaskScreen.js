import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import GlobalStyles from '../styles/GlobalStyles';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [importance, setImportance] = useState('normal');
  const [dueDateText, setDueDateText] = useState(''); // Yeni tarih alanı

  const handleAddTask = async () => {
    if (!title || !description) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      await addDoc(collection(db, 'tasks'), {
        title,
        description,
        importance,
        dueDate: dueDateText.trim() !== '' ? dueDateText.trim() : null,
        createdAt: Timestamp.now(),
        userId: auth.currentUser.uid,
        isCompleted: false,
      });

      Alert.alert('Başarılı', 'Görev başarıyla eklendi.');
      setTitle('');
      setDescription('');
      setImportance('normal');
      setDueDateText('');
    } catch (error) {
      Alert.alert('Hata', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={GlobalStyles.container}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={GlobalStyles.logo}>
          🐝 <Text style={{ color: '#222' }}>Task</Text>
          <Text style={{ color: '#f5c518' }}>Bee</Text>
        </Text>

        <TextInput
          placeholder="Görev Başlığı"
          value={title}
          onChangeText={setTitle}
          style={GlobalStyles.input}
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="Açıklama"
          value={description}
          onChangeText={setDescription}
          style={GlobalStyles.textarea}
          placeholderTextColor="#999"
          multiline
        />

        {/* Önemli / Normal Seçimi */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => setImportance('normal')}
            style={[
              GlobalStyles.button,
              {
                backgroundColor: importance === 'normal' ? '#4CAF50' : '#fff',
                borderWidth: 1.5,
                borderColor: '#222',
                flex: 1,
                marginRight: 8,
              },
            ]}
          >
            <Text
              style={[
                GlobalStyles.buttonText,
                { color: importance === 'normal' ? '#fff' : '#000' },
              ]}
            >
              Normal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setImportance('important')}
            style={[
              GlobalStyles.button,
              {
                backgroundColor: importance === 'important' ? '#E53935' : '#fff',
                borderWidth: 1.5,
                borderColor: '#222',
                flex: 1,
              },
            ]}
          >
            <Text
              style={[
                GlobalStyles.buttonText,
                { color: importance === 'important' ? '#fff' : '#000' },
              ]}
            >
              Önemli
            </Text>
          </TouchableOpacity>
        </View>

        {/* Elle girilen bitiş tarihi */}
        <TextInput
          placeholder="Bitiş Tarihi (isteğe bağlı) - Örn: 25.05.2025"
          value={dueDateText}
          onChangeText={setDueDateText}
          style={GlobalStyles.input}
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={GlobalStyles.button} onPress={handleAddTask}>
          <Text style={GlobalStyles.buttonText}>Görevi Kaydet</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
