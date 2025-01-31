import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { searchStyles as styles } from '../../styles/pos.styles';
import { Category } from '../../types';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => (
  <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false}
    style={styles.categoryContainer}
  >
    <TouchableOpacity
      style={[
        styles.categoryTab,
        !selectedCategory && styles.categoryTabSelected
      ]}
      onPress={() => onSelectCategory(null)}
    >
      <Text style={styles.categoryText}>Todos</Text>
    </TouchableOpacity>
    {categories.map(category => (
      <TouchableOpacity
        key={category.id}
        style={[
          styles.categoryTab,
          selectedCategory === category.id && styles.categoryTabSelected
        ]}
        onPress={() => onSelectCategory(category.id)}
      >
        <Text style={styles.categoryText}>{category.name}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export default CategoryTabs;