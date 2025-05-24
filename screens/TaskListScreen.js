import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import GlobalStyles, { taskStyles } from '../styles/GlobalStyles';

const TaskListScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', uid),
      where('isCompleted', '==', false)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allTasks = [];
      querySnapshot.forEach((doc) => {
        allTasks.push({ id: doc.id, ...doc.data() });
      });

      const sortedTasks = [
        ...allTasks.filter((t) => t.importance === 'important'),
        ...allTasks.filter((t) => t.importance !== 'important'),
      ];
      setTasks(sortedTasks);
    });

    return () => unsubscribe();
  }, []);

  const openModal = (task) => {
    setSelectedTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalVisible(false);
  };

  const completeTask = async (taskId) => {
    try {
      await updateDoc(doc(db, 'tasks', taskId), { isCompleted: true });
      setModalVisible(false);
    } catch (error) {
      console.log('Tamamlama hatası:', error);
    }
  };

  const updateTask = async () => {
    try {
      await updateDoc(doc(db, 'tasks', selectedTask.id), {
        title: editedTitle,
        description: editedDescription,
      });
      closeModal();
    } catch (error) {
      Alert.alert('Hata', 'Görev güncellenemedi.');
    }
  };

  const renderTaskItem = ({ item }) => (
    <TouchableOpacity
      style={[
        taskStyles.taskCard,
        item.importance === 'important' && {
          borderColor: '#f5c518',
          borderWidth: 2,
          backgroundColor: '#fffde6',
        },
      ]}
      onPress={() => openModal(item)}
      activeOpacity={0.9}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
        {item.importance === 'important' && (
          <Ionicons name="alert-circle-outline" size={20} color="#f5c518" style={{ marginRight: 6 }} />
        )}
        <Text style={taskStyles.taskTitle}>{item.title}</Text>
      </View>
      {item.dueDate && (
        <Text style={taskStyles.taskDescription}>Bitiş: {item.dueDate}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[GlobalStyles.container, { position: 'relative', paddingBottom: 60 }]}>
      {/* Arka plan marka logosu */}
      <Text style={GlobalStyles.bgLogo}>🐝 TaskBee</Text>

      {/* Başlık */}
      <Text style={GlobalStyles.header}>Görev Listesi</Text>

      {/* Liste */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTaskItem}
        ListEmptyComponent={<Text style={GlobalStyles.emptyText}>Henüz görev yok.</Text>}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={taskStyles.modalBackground}>
          <View style={taskStyles.modalContainer}>
            <Text style={taskStyles.modalTitle}>Görevi Güncelle</Text>

            <TextInput
              style={GlobalStyles.input}
              value={editedTitle}
              onChangeText={setEditedTitle}
              placeholder="Başlık"
            />
            <TextInput
              style={[GlobalStyles.input, { height: 80 }]}
              value={editedDescription}
              onChangeText={setEditedDescription}
              placeholder="Açıklama"
              multiline
            />

            <View style={taskStyles.iconRow}>
              <TouchableOpacity onPress={updateTask}>
                <Ionicons name="checkmark-done-outline" size={30} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => completeTask(selectedTask.id)}>
                <Ionicons name="checkmark-done-circle-outline" size={28} color="#f5c518" />
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close-circle-outline" size={30} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TaskListScreen;
