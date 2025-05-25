import React, { useState, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import GlobalStyles, { taskStyles } from '../styles/GlobalStyles';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  useFocusEffect(
    useCallback(() => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const q = query(
        collection(db, 'tasks'),
        where('userId', '==', uid),
        where('isCompleted', '==', false)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedTasks = [];
        const dateMarkers = {};

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.dueDate) {
            const dateStr = data.dueDate;
            fetchedTasks.push({ id: doc.id, ...data });
            dateMarkers[dateStr] = {
              marked: true,
              dotColor: data.importance === 'important' ? '#f00' : '#222',
            };
          }
        });

        setTasks(fetchedTasks);
        setMarkedDates(dateMarkers);
      });

      return () => unsubscribe();
    }, [])
  );

  const tasksForSelectedDate = tasks.filter((task) => task.dueDate === selectedDate);

  return (
    <View style={taskStyles.calendarWrapper}>
      <Text style={taskStyles.calendarLogo}>🐝 TaskBee</Text>

      <Calendar
        markedDates={{
          ...(selectedDate
            ? {
                [selectedDate]: {
                  ...(markedDates[selectedDate] || {}),
                  selected: true,
                  selectedColor: '#f5c518',
                },
              }
            : {}),
          ...markedDates,
        }}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        theme={{ todayTextColor: '#f5c518' }}
      />

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 12 }}>
        {selectedDate ? `${selectedDate} Görevleri:` : 'Tarih seçin'}
      </Text>

      <FlatList
        data={tasksForSelectedDate}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              taskStyles.taskCard,
              item.importance === 'important' && {
                borderColor: '#f5c518',
                borderWidth: 2,
                backgroundColor: '#fffde6',
              },
            ]}
          >
            <View style={taskStyles.taskRow}>
              {item.importance === 'important' && (
                <Ionicons
                  name="alert-circle-outline"
                  size={20}
                  color="#f5c518"
                  style={{ marginRight: 6 }}
                />
              )}
              <Text style={taskStyles.taskTitle}>{item.title}</Text>
            </View>

            {item.description !== '' && (
              <Text style={taskStyles.taskDescription}>{item.description}</Text>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={GlobalStyles.emptyText}>Bu tarih için görev bulunamadı.</Text>
        }
      />
    </View>
  );
}
