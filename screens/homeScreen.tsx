// screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addTodo, toggleTodo, deleteTodo } from '../reducers/todoReducer';
import TodoCard from '../components/todoCard';

const HomeScreen: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const todo = {
        id: Date.now(),
        title: newTodo,
        description: '',
        completed: false,
        createdAt: new Date().toISOString(), // Convert Date to string
      };
      dispatch(addTodo(todo));
      setNewTodo('');
    }
  };

  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your todo..."
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}
        />
        <Button title="Add" onPress={handleAddTodo} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoCard
            todo={item}
            onToggle={() => handleToggle(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
});

export default HomeScreen;
