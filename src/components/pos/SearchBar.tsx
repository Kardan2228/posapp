import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';
import { cartStyles as styles } from '../../styles/components/pos.styles';

interface SearchBarProps {
 value: string;
 onChangeText: (text: string) => void;
 onSubmit?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, onSubmit }) => {
 return (
   <View style={styles.searchContainer}>
     <View style={styles.searchWrapper}>
       <Search size={20} color="#666" style={styles.searchIcon} />
       <TextInput
         style={styles.searchInput}
         value={value}
         onChangeText={onChangeText}
         placeholder="Buscar productos..."
         returnKeyType="search"
         onSubmitEditing={onSubmit}
       />
     </View>
   </View>
 );
};

export default SearchBar;