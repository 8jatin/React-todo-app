// components/TodoCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Todo } from '../reducers/todoReducer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

interface TodoCardProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onToggle, onDelete }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleNavigateToDetail = () => {
    navigation.navigate("TodoDetail" as any, { todoId: todo.id });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleNavigateToDetail}>
      <Text style={styles.title}>{todo.title}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, todo.completed ? styles.completedButton : styles.notCompletedButton]} onPress={onToggle}>
          <Text style={styles.buttonText}>{todo.completed ? 'Done' : 'Not Done'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#fff',
  },
  completedButton: {
    backgroundColor: '#27ae60',
  },
  notCompletedButton: {
    backgroundColor: '#e74c3c',
  },
});

export default TodoCard;
