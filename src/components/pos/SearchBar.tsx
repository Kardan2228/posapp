import React from 'react';
import { TextInput } from 'react-native-paper';

export default function SearchBar({ placeholder, onChangeText }: any) {
  return (
    <TextInput
      mode="outlined"
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={{ marginBottom: 16 }}
    />
  );
}
