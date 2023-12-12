import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux'; 
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../reducers/todoReducer';
import TodoDetailScreen from '../screens/todoDetailScreen';

const store = configureStore({
  reducer: { todos: todoReducer },
});
const todo = { id: 1, title: 'Test Todo' };

describe('TodoDetailScreen', () => {

  it('updates todo title when edited', () => {
    const { getByText, getByDisplayValue } = render(
      <Provider store={store}>
        <TodoDetailScreen /> 
      </Provider>
    );
    
    fireEvent.changeText(getByDisplayValue(todo.title), 'Updated Title');
    getByText('Confirm Changes').props.onPress();
    
    const updatedTodo = store.getState().todos.find(t => t.id === todo.id); 
    expect(updatedTodo.title).toBe('Updated Title');
  });
  
});