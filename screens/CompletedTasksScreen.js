import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import GlobalStyles, { taskStyles } from '../styles/GlobalStyles';
import { Ionicons } from '@expo/vector-icons';

export default function CompletedTasksScreen() {
  const navigation = useNavigation();
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', auth.currentUser.uid),
      where('isCompleted', '==', true)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() });
      });
      setCompletedTasks(tasks);
    });

    return () => unsubscribe();
  }, []);

  const handleUndo = async (taskId) => {
    await updateDoc(doc(db, 'tasks', taskId), {
      isCompleted: false,
    });
  };

  const handleDelete = async (taskId) => {
    Alert.alert('Emin misin?', 'Bu görevi silmek istiyor musun?', [
      { text: 'Vazgeç', style: 'cancel' },
      {
        text: 'Sil',
        style: 'destructive',
        onPress: async () => {
          await deleteDoc(doc(db, 'tasks', taskId));
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={taskStyles.taskCard}>
      <Text style={taskStyles.taskTitle}>{item.title}</Text>
      {item.dueDate ? (
        <Text style={taskStyles.taskDescription}>Bitiş: {item.dueDate}</Text>
      ) : null}

      <View style={taskStyles.iconRow}>
        <TouchableOpacity onPress={() => handleUndo(item.id)}>
          <Ionicons name="arrow-undo-outline" size={24} color="#f5c518" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash-outline" size={24} color="#f00" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[GlobalStyles.container, { justifyContent: 'flex-start' }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={[GlobalStyles.header, { textAlign: 'left', marginLeft: 12 }]}>Tamamlanan Görevler</Text>
      </View>

      {completedTasks.length === 0 ? (
        <Text style={GlobalStyles.emptyText}>Hiç tamamlanan görev yok.</Text>
      ) : (
        <FlatList
          data={completedTasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
