import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../reducers/todoReducer';
import HomeScreen from '../screens/homeScreen';

const store = configureStore({
  reducer: { todos: todoReducer },
});

describe('HomeScreen', () => {

  it('dispatches addTodo when button pressed', () => {
    const {getByText, getByPlaceholderText} = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>  
    );
    
    fireEvent.changeText(getByPlaceholderText('Enter your todo...'), 'New Todo');
    getByText('Add').props.onPress();
    
    const newTodo = store.getState().todos[0];
    expect(newTodo.title).toBe('New Todo');
  });

});