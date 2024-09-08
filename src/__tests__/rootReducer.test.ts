import { configureStore } from '@reduxjs/toolkit';
import {
  addIngredient,
  burgerConstructorSlice,
  TConstructorState
} from '../services/slices/burgerConstructor';
import { afterAll, beforeEach, expect, test, jest } from '@jest/globals';

describe('[Burger Constructor Reducer] Проверка работы сборки заказа', () => {
  let store: any;

  test('[addIngredient] Добавление ингридиента', () => {});
});

afterAll(() => {
  jest.clearAllMocks();
});
