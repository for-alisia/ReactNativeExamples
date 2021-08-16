// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import ShopNavigator from './ShopNavigator';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const NavigatorContainer = (props) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navRef = useRef();

  useEffect(() => {
    if (!isLoggedIn) {
      navRef.current.dispatch(NavigationActions.navigate({ routeName: 'Auth' }));
    }
  }, [isLoggedIn]);
  return <ShopNavigator ref={navRef} />;
};

export default NavigatorContainer;
