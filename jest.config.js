module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
  };