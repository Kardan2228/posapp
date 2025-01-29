module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-transform-private-methods',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-class-properties',
    'react-native-reanimated/plugin'
  ],
};
