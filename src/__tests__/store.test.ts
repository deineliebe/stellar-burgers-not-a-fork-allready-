import { afterAll, expect, test, jest } from '@jest/globals';
import store from '../services/store';
import { initialBurgerConstructorState } from '../services/slices/burgerConstructor';
import { initialFeedState } from '../services/slices/feed';
import { initialUserState } from '../services/slices/userData';
import { initialOrderState } from '../services/slices/order';
import { initialProfileOrdersState } from '../services/slices/profileOrders';
import { initialIngredientsState } from '../services/slices/ingredients';

describe('[Root Reducer] Проверка корневого редьюсера', () => {
  test('[State check] Проверка инициализации корневого редьюсера', () => {
    expect(store.getState()).toEqual({
      burgerConstructor: initialBurgerConstructorState,
      ingredients: initialIngredientsState,
      feed: initialFeedState,
      user: initialUserState,
      order: initialOrderState,
      profileOrders: initialProfileOrdersState
    });
  });

  test('[Wrong action] Проверка инициализации корневого редьюсера при некорректном экшне', () => {
    const initialStoreState = store.getState();
    store.dispatch({ type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(initialStoreState);
  });
});

afterAll(() => {
  jest.clearAllMocks();
});
