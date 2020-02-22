module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        root: ['./src'],
        alias: {
          "@store": './src/store',
          "@components": './src/components',
          "@screens": './src/screens',
          "@actions": './src/actions',
          "@constants": './src/constants',
          "@reducers": './src/reducers',
          "@epics": './src/epics',
          "@utils": './src/utils',
        },
      }
    ]
  ]
};
