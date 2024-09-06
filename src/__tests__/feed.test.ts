import { configureStore } from '@reduxjs/toolkit';
import {
  feedsSlice,
  getOrdersInfo,
  getTotalFeeds,
  getTotalTodayFeeds,
  getFeedsInfo,
  TFeedsState
} from '../services/slices/feed';
import { TFeedsResponse } from '../utils/burger-api';
import { afterAll, beforeEach, expect, test, jest } from '@jest/globals';

const expectedFeedState: TFeedsState = {
  orders: [
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
    },
    {
      _id: '66d9e487119d45001b50479e',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0946'
      ],
      status: 'done',
      name: 'Краторный минеральный био-марсианский бургер',
      createdAt: '2024-09-05T17:04:07.077Z',
      updatedAt: '2024-09-05T17:04:08.088Z',
      number: 52014
    }
  ],
  total: 51642,
  totalToday: 49,
  loading: false,
  error: null
};

const mockFeedState: TFeedsResponse = {
  success: true,
  orders: expectedFeedState.orders,
  total: 51642,
  totalToday: 49
};

const initialFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

describe('[Feed Reducer] Проверка работы ленты заказов', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: { feed: feedsSlice.reducer },
      preloadedState: { feed: expectedFeedState }
    });
  });

  test('[getOrdersInfo] Проверка селектора для orders', async () => {
    const orders = getOrdersInfo(store.getState());
    expect(orders).toEqual(expectedFeedState.orders);
  });

  test('[getTotalFeeds] Проверка селектора для total', async () => {
    const total = getTotalFeeds(store.getState());
    expect(total).toEqual(expectedFeedState.total);
  });

  test('[getTotalTodayFeeds] Проверка селектора для totalToday', async () => {
    const totalToday = getTotalTodayFeeds(store.getState());
    expect(totalToday).toEqual(expectedFeedState.totalToday);
  });

  test('[getFeedsInfo: fulfilled] Проверка получения информации о заказах с сервера', async () => {
    const feedState = feedsSlice.reducer(initialFeedState, {
      type: getFeedsInfo.fulfilled.type,
      payload: mockFeedState
    });
    expect(feedState).toEqual(expectedFeedState);
  });

  test('[getFeedsInfo: rejected] Проверка получения информации о заказах с сервера', async () => {
    const messageText = 'Test error: the message for a check';
    const feedState = feedsSlice.reducer(initialFeedState, {
      type: getFeedsInfo.rejected.type,
      payload: {
        orders: [],
        total: 0,
        totalToday: 0
      },
      error: {
        message: messageText
      }
    });
    expect(feedState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: messageText,
      loading: false
    });
  });
});

afterAll(() => {
  jest.clearAllMocks();
});
