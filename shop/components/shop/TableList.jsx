import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

// Components
import TableItem from './TableItem';

// Theme
import theme from '../../theme';

const TableList = ({ items }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item, index }) => <TableItem item={item} idx={index} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.margin.s,
  },
});

export default TableList;
