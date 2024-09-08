import { configureStore } from '@reduxjs/toolkit';
import { afterAll, beforeEach, expect, test, jest } from '@jest/globals';
import {
  TOrderState,
  createOrder,
  getOrder,
  getOrderRequest,
  orderSlice,
  resetOrder
} from '../services/slices/order';
import { TNewOrderResponse, TOrderResponse } from '@api';
import { TOrder } from '@utils-types';

const newOrder: TOrder = {
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
  }

const expectedOrderState: TOrderState = {
  orderRequest: false,
  order: newOrder,
  error: null
};

const mockOrderState: TNewOrderResponse = {
  success: true,
  order: newOrder,
  name: newOrder.name
};

const initialOrderState: TOrderState = {
  orderRequest: false,
  order: null,
  error: null
};

describe('[Order Reducer] Проверка работы сборки заказа', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: { order: orderSlice.reducer },
      preloadedState: { order: expectedOrderState }
    });
  });

  test('[getOrderRequest] Проверка селектора для orderRequest', () => {
    const orderRequest = getOrderRequest(store.getState());
    expect(orderRequest).toEqual(expectedOrderState.orderRequest);
  });

  test('[getOrder] Проверка селектора для order', () => {
    const order = getOrder(store.getState());
    expect(order).toEqual(expectedOrderState.order);
  });

  test('[resetOrder] Сброс данных о заказе', () => {
    const orderState = orderSlice.reducer(expectedOrderState, resetOrder());
    const { order } = orderState;
    expect(order).toEqual(null);
  });

  test('[createOrder: fulfilled] Проверка получения информации о заказах с сервера', async () => {
    const ingredientsState = orderSlice.reducer(initialOrderState, {
      type: createOrder.fulfilled.type,
      payload: mockOrderState
    });
    expect(ingredientsState).toEqual(expectedOrderState);
  });

  test('[createOrder: rejected] Проверка получения информации о заказах с сервера', async () => {
    const messageText = 'Test error: the message for a check';
    const ingredientsState = orderSlice.reducer(initialOrderState, {
      type: createOrder.rejected.type,
      payload: {
        order: null
      },
      error: {
        message: messageText
      }
    });
    expect(ingredientsState).toEqual({
      order: null,
      orderRequest: false,
      error: messageText
    });
  });
});

afterAll(() => {
  jest.clearAllMocks();
});
