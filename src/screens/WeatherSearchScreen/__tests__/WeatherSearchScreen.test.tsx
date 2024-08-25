import 'react-native';
import React from 'react';
import WeatherSearchScreen from '../index';

import { render, fireEvent } from '@testing-library/react-native';

it('TextInput rendered', () => {
  const { getByTestId } = render( <WeatherSearchScreen /> );
  const input = getByTestId("input");
  fireEvent.changeText(input,'Delhi');
  expect(input.props.value).toBe("Delhi");
});