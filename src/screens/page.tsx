import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
type Props = {};
const data = [
  {
    id: 1,
    title: 'Task 1',
  },
  {
    id: 2,
    title: 'Task 2',
  },
  {
    id: 3,
    title: 'Task 3',
  },
];

const STORAGE_KEY = 'TODO_LIST';

function Page({}: Props) {
  const [tasks, setTasks] = useState(data);
  const [title, setTitle] = useState('');

  const renderItem = ({ item }: { item: (typeof data)[number] }) => (
    <View style={[styles.boxItem]}>
      <View style={[styles.item]}>
        <Text style={[styles.textItem]}>{item.title}</Text>
        <TouchableOpacity style={[styles.buttonBin]} onPress={() => handleDeleteTask(item.id)}>
          <Ionicons name="trash-sharp" color="#fff" size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleAddTask = (title: string) => {
    let maxId = tasks.length ? tasks[tasks.length - 1].id : 0;
    const newTask = [...tasks, { id: maxId + 1, title: title }];
    setTasks(newTask);
    saveTasks(newTask);
  };

  const handleDeleteTask = (id: number) => {
    const newTask = tasks.filter(task => task.id !== id);
    setTasks(newTask);
    saveTasks(newTask);
  };

  const saveTasks = async (tasks: typeof data) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  };

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={[styles.text]}>To Do List</Text>
      <TextInput
        placeholder="Add a task"
        style={[styles.input]}
        onChangeText={e => setTitle(e)}
      />
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => handleAddTask(title)}
      >
        <Text style={[styles.textBtn]}>Add Task</Text>
      </TouchableOpacity>
      <FlatList data={tasks} renderItem={renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: '#F3F4F6',
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  textBtn: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  boxItem: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 8,
    marginBottom: 8,
  },
  item: {
    padding: 8,
    backgroundColor: '#000',
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textItem: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  buttonBin: {
    backgroundColor: '#000',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
});

export default Page;
