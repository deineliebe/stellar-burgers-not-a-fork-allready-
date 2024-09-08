import { configureStore } from '@reduxjs/toolkit';
import { afterAll, expect, test, jest } from '@jest/globals';
import {
  getOrders,
  getUsersOrders,
  initialProfileOrdersState,
  profileOrdersSlice,
  TOrderState
} from '../services/slices/profileOrders';
import { TFeedsResponse } from '@api';

const usersOrders = [
  {
    _id: '66d9e491119d45001b5047a0',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0946'
    ],
    status: 'done',
    name: 'Краторный минеральный био-марсианский бургер',
    createdAt: '2024-09-05T17:04:17.386Z',
    updatedAt: '2024-09-05T17:04:18.457Z',
    number: 52016
  },
  {
    _id: '66d9e491119d45001b50479f',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0946'
    ],
    status: 'done',
    name: 'Краторный минеральный био-марсианский бургер',
    createdAt: '2024-09-05T17:04:17.356Z',
    updatedAt: '2024-09-05T17:04:18.360Z',
    number: 52015
  }
];

const expectedProfileOrdersState: TOrderState = {
  orders: usersOrders,
  loading: false,
  error: null
};

const mockProfileOrderState: TFeedsResponse = {
  success: true,
  orders: usersOrders,
  total: 2,
  totalToday: 0
};

describe('[Profile Orders Reducer] Проверка работы заказов конкретного пользователя', () => {
  test('[getComponents] Проверка селектора для заказов', async () => {
    const store = configureStore({
      reducer: {
        profileOrders: profileOrdersSlice.reducer
      },
      preloadedState: {
        profileOrders: expectedProfileOrdersState
      }
    });
    const components = getOrders(store.getState());
    expect(components).toEqual(usersOrders);
  });

  test('[getUsersOrders: fulfilled] Проверка получения информации о заказах с сервера', async () => {
    const profileOrdersState = profileOrdersSlice.reducer(
      initialProfileOrdersState,
      {
        type: getUsersOrders.fulfilled.type,
        payload: mockProfileOrderState.orders
      }
    );
    expect(profileOrdersState.orders).toEqual(
      expectedProfileOrdersState.orders
    );
  });

  test('[getIngredientsList: rejected] Проверка получения информации о заказах с сервера', async () => {
    const messageText = 'Test error: the message for a check';
    const profileOrdersState = profileOrdersSlice.reducer(
      initialProfileOrdersState,
      {
        type: getUsersOrders.rejected.type,
        payload: {
          orders: []
        },
        error: {
          message: messageText
        }
      }
    );
    expect(profileOrdersState).toEqual({
      orders: [],
      loading: false,
      error: messageText
    });
  });
});

afterAll(() => {
  jest.clearAllMocks();
});
