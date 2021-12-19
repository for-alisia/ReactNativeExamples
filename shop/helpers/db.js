// @ts-nocheck
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('sbstudio.db');

export const init = () => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS userCart (id INTEGER PRIMARY KEY NOT NULL, productId TEXT NOT NULL, title TEXT NOT NULL, imageUrl TEXT NOT NULL,  qty INTEGER, price INTEGER, pushToken TEXT);',
        [],
        () => {
          res();
        },
        (_, err) => {
          rej(err);
        }
      );
    });
  });

  return promise;
};

export const sqlUpdateInCart = ({ productId, title, imageUrl, qty, price, pushToken }) => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT OR REPLACE INTO userCart (productId, title, imageUrl, qty, price, pushToken) VALUES (?, ?, ?, ?, ?, ?);',
        [productId, title, imageUrl, qty, price, pushToken],
        (_, result) => {
          res(result);
        },
        (_, err) => {
          rej(err);
        }
      );
    });
  });

  return promise;
};

export const sqlDeleteFromCart = (productId) => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM userCart WHERE productId='${productId}';`,
        [],
        (_, result) => {
          res(result);
        },
        (_, err) => {
          rej(err);
        }
      );
    });
  });

  return promise;
};

export const sqlFetchCart = () => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM userCart',
        [],
        (_, result) => {
          res(result);
        },
        (_, err) => {
          rej(err);
        }
      );
    });
  });

  return promise;
};
