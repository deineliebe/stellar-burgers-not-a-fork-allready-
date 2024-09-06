import { configureStore } from '@reduxjs/toolkit';
import {
  ingredientsSlice,
  getIngredientsLoadingState,
  getIngredients,
  getIngredientsList,
  TIngredientsState
} from '../services/slices/ingredients';
import { afterAll, beforeEach, expect, test, jest } from '@jest/globals';
import { TIngredientsResponse } from '@api';

const expectedIngredientsState = {
  ingredients: {
    data: [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      }
    ],
    success: true
  },
  loading: false,
  error: null
};

const mockIngredientsState: TIngredientsResponse = {
  success: true,
  data: expectedIngredientsState.ingredients.data
};

const initialIngredientsState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

describe('[Ingredients Reducer] Проверка доступа к ингредиентам', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: ingredientsSlice.reducer,
      preloadedState: {
        ingredients: expectedIngredientsState.ingredients.data,
        loading: false,
        error: null
      }
    });
  });

  test('[getIngredientsLoadingState] Проверка селектора для loading', async () => {
    const loading = getIngredientsLoadingState(store.getState());
    expect(loading).toEqual(false);
  });

  test('[getIngredients] Проверка селектора для ingredients', async () => {
    const ingredients = getIngredients(store.getState());
    expect(expectedIngredientsState.ingredients.data).toEqual(ingredients);
  });

  test('[getIngredientsList: fulfilled] Проверка получения информации о заказах с сервера', async () => {
    const ingredientsState = ingredientsSlice.reducer(initialIngredientsState, {
      type: getIngredientsList.fulfilled.type,
      payload: mockIngredientsState
    });
    expect(expectedIngredientsState).toEqual(ingredientsState);
  });

  test('[getIngredientsList: rejected] Проверка получения информации о заказах с сервера', async () => {
    const messageText = 'Test error: the message for a check';
    const ingredientsState = ingredientsSlice.reducer(initialIngredientsState, {
      type: getIngredientsList.rejected.type,
      payload: {
        ingredients: {
          data: []
        }
      },
      error: {
        message: messageText
      }
    });
    expect(ingredientsState).toEqual({
      ingredients: [],
      loading: false,
      error: messageText
    });
  });
});

afterAll(() => {
  jest.clearAllMocks();
});
