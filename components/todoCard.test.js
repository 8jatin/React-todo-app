// TodoCard.test.js

import React from 'react';
import { render } from '@testing-library/react-native';
import TodoCard from '../components/TodoCard';

// Mock navigation 
const mockNavigation = {
  navigate: jest.fn()
};

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => mockNavigation
  }
});

describe('TodoCard', () => {

  it('renders todo title', () => {
    const todo = { id: 1, title: 'Test Todo'};
    
    const { getByText } = render(
      <TodoCard 
        todo={todo}
        navigation={mockNavigation}  
      />
    );
    
    expect(getByText('Test Todo')).toBeTruthy();
  });

  it('navigates when pressed', () => {
    const {getByText} = render(
        <TodoCard 
          todo={{id: 1, title: 'Test Todo'}}
          navigation={mockNavigation} 
        />
      );
    
    getByText('Test Todo').props.onPress();
    
    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      'TodoDetail', 
      {todoId: expect.any(Number)}
    );
  });

});