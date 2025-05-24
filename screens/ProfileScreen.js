import React, { useEffect, useState, useCallback } from 'react';
import {View, Text, Image, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import styles, { profileStyles } from '../styles/GlobalStyles';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({ navigation }) => {
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const user = auth.currentUser;

  const fetchTasks = async () => {
    try {
      const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      let total = 0;
      let completed = 0;
      querySnapshot.forEach((doc) => {
        total++;
        if (doc.data().isCompleted) completed++;
      });
      setTotalTasks(total - completed);
      setCompletedTasks(completed);
    } catch (error) {
      console.log('Görevleri alma hatası:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user) fetchTasks();
    }, [user])
  );

  const handleSignOut = () => {
    signOut(auth)
  .then(() => {
    Alert.alert('Çıkış Başarılı', 'Başarıyla çıkış yaptınız.');
  })
  .catch((error) => {
    Alert.alert('Çıkış Hatası', error.message);
  });

  };

  return (
    <SafeAreaView style={[styles.container, { alignItems: 'center' }]}>
      <Text style={profileStyles.brandBig}>🐝 TaskBee</Text>

      <Image
        source={require('../assets/profile.png')}
        style={profileStyles.avatar}
      />
      <Text style={profileStyles.name}>{user?.email}</Text>

      <View style={profileStyles.statsRow}>
        <TouchableOpacity
          style={[profileStyles.statBox, { backgroundColor: '#f5c518' }]}
          onPress={() => navigation.navigate('TaskList')}
        >
          <Text style={profileStyles.statValue}>{totalTasks}</Text>
          <Text style={profileStyles.statLabel}>Aktif Görev</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[profileStyles.statBox, { backgroundColor: '#f5c518' }]}
          onPress={() => navigation.navigate('CompletedTasks')}
        >
          <Text style={[profileStyles.statValue, { color: '#000' }]}>{completedTasks}</Text>
          <Text style={[profileStyles.statLabel, { color: '#000' }]}>Tamamlanan</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={profileStyles.logoutBtnWide} onPress={handleSignOut}>
        <Text style={profileStyles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;
