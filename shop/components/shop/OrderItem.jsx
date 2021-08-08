import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

// Components
import { SbText, SbTitle, SbLink } from '../ui';
import TableList from './TableList';

// Theme
import theme from '../../theme';

// Utils
import { getTotalPositions, dateFormat } from '../../utils';

const OrderItem = ({ id, items, total, date, status }) => {
  const [showDetails, setShowDetails] = useState(false);

  const showDetailsHandler = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <View style={styles.row}>
          <View>
            <SbText bold>{dateFormat(date)}</SbText>
          </View>
          <View>
            <SbText bold>{status}</SbText>
          </View>
          <View>
            <SbTitle>{total}&#x20bd;</SbTitle>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <SbText>В заказе позиций: {getTotalPositions(items)}</SbText>
          </View>
          <View>
            <SbLink onPress={showDetailsHandler}>{showDetails ? 'Скрыть' : 'Подробнее'}</SbLink>
          </View>
        </View>
      </View>
      {showDetails && <TableList items={items} />}
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
});

export default OrderItem;
