import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

// Components
import { SbText, SbTitle, SbLink } from '../ui';
import TableItem from './TableItem';

// Theme
import theme from '../../theme';

// Utils
import { getTotalPositions, dateFormat } from '../../utils';

const OrderItem = ({ id, items, total, date, status }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <View style={styles.row}>
          <View>
            <SbText>{dateFormat(date)}</SbText>
          </View>
          <View>
            <SbText>{status}</SbText>
          </View>
          <View>
            <SbTitle>{total} руб.</SbTitle>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <SbText>В заказе позиций: {getTotalPositions(items)}</SbText>
          </View>
          <View>
            <SbLink>Подробнее</SbLink>
          </View>
        </View>
      </View>
      <View style={styles.details}>
        <FlatList
          data={items}
          renderItem={({ item, index }) => <TableItem item={item} idx={index} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.padding.s,
  },
  description: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  details: {},
});

export default OrderItem;
