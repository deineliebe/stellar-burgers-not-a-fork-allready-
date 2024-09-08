import { configureStore } from '@reduxjs/toolkit';
import { afterAll, expect, test, jest } from '@jest/globals';
import {
  getIsAuthorized,
  getName,
  getUser,
  getUserData,
  initialUserState,
  loginUser,
  logout,
  registerUser,
  TUserState,
  updateUser,
  userSlice
} from '../services/slices/userData';
import { TUserResponse } from '@api';

const testUserData = {
  email: 'test E-mail',
  name: 'test password'
};

const testUpdatedUserData = {
  email: 'new test E-mail',
  name: 'new test password'
};

const UserInState: TUserState = {
  isAuthorized: true,
  userData: testUserData,
  error: null
};

const mockUserState: TUserResponse = {
  success: true,
  user: testUserData
};

describe('[User Data Reducer] Проверка работы сборки заказа', () => {
  test('[getIsAuthorized] Проверка селектора для статуса авторизации', async () => {
    const store = configureStore({
      reducer: {
        user: userSlice.reducer
      },
      preloadedState: {
        user: UserInState
      }
    });
    const isAuthorized = getIsAuthorized(store.getState());
    expect(isAuthorized).toEqual(UserInState.isAuthorized);
  });

  test('[getUser] Проверка селектора для данных пользователя', async () => {
    const store = configureStore({
      reducer: {
        user: userSlice.reducer
      },
      preloadedState: {
        user: UserInState
      }
    });
    const userData = getUser(store.getState());
    expect(userData).toEqual(testUserData);
  });

  test('[getName] Проверка селектора для имени пользователя', async () => {
    const store = configureStore({
      reducer: {
        user: userSlice.reducer
      },
      preloadedState: {
        user: UserInState
      }
    });
    const userName = getName(store.getState());
    expect(userName).toEqual(testUserData.name);
  });

  test('[registerUser: fulfilled] Проверка получения информации о заказах с сервера', async () => {
    const userState = userSlice.reducer(initialUserState, {
      type: registerUser.fulfilled.type,
      payload: mockUserState
    });
    expect(userState).toEqual(UserInState);
  });

  test('[registerUser: rejected] Проверка получения информации о заказах с сервера', async () => {
    const messageText = 'Test error: the message for a check';
    const userState = userSlice.reducer(initialUserState, {
      type: registerUser.rejected.type,
      payload: {
        userData: initialUserState.userData
      },
      error: {
        message: messageText
      }
    });
    expect(userState).toEqual({
      isAuthorized: false,
      userData: initialUserState.userData,
      error: messageText
    });
  });

  test('[loginUser: fulfilled] Проверка получения информации о заказах с сервера', async () => {
    const userState = userSlice.reducer(initialUserState, {
      type: loginUser.fulfilled.type,
      payload: mockUserState
    });
    expect(userState).toEqual(UserInState);
  });

  test('[loginUser: rejected] Проверка получения информации о заказах с сервера', async () => {
    const messageText = 'Test error: the message for a check';
    const userState = userSlice.reducer(initialUserState, {
      type: loginUser.rejected.type,
      payload: {
        userData: initialUserState.userData
      },
      error: {
        message: messageText
      }
    });
    expect(userState).toEqual({
      isAuthorized: false,
      userData: initialUserState.userData,
      error: messageText
    });
  });

  test('[getUserData: fulfilled] Проверка получения информации о заказах с сервера', async () => {
    const userState = userSlice.reducer(UserInState, {
      type: getUserData.fulfilled.type,
      payload: mockUserState
    });
    expect(userState).toEqual(UserInState);
  });

  test('[getUserData: rejected] Проверка получения информации о заказах с сервера', async () => {
    const messageText = 'Test error: the message for a check';
    const userState = userSlice.reducer(UserInState, {
      type: getUserData.rejected.type,
      payload: {
        userData: UserInState.userData
      },
      error: {
        message: messageText
      }
    });
    expect(userState).toEqual({
      isAuthorized: true,
      userData: UserInState.userData,
      error: messageText
    });
  });

  test('[updateUser: fulfilled] Проверка получения информации о заказах с сервера', async () => {
    const userState = userSlice.reducer(UserInState, {
      type: updateUser.fulfilled.type,
      payload: {
        success: true,
        user: testUpdatedUserData
      }
    });
    expect(userState).toEqual({
      isAuthorized: true,
      userData: testUpdatedUserData,
      error: ''
    });
  });

  test('[updateUser: rejected] Проверка получения информации о заказах с сервера', async () => {
    const messageText = 'Test error: the message for a check';
    const userState = userSlice.reducer(UserInState, {
      type: updateUser.rejected.type,
      payload: {
        userData: testUpdatedUserData
      },
      error: {
        message: messageText
      }
    });
    expect(userState).toEqual({
      isAuthorized: true,
      userData: UserInState.userData,
      error: messageText
    });
  });

  test('[logout: fulfilled] Проверка получения информации о заказах с сервера', async () => {
    const userState = userSlice.reducer(initialUserState, {
      type: logout.fulfilled.type,
      payload: mockUserState
    });
    expect(userState).toEqual(initialUserState);
  });

  test('[logout: rejected] Проверка получения информации о заказах с сервера', async () => {
    const messageText = 'Test error: the message for a check';
    const userState = userSlice.reducer(initialUserState, {
      type: logout.rejected.type,
      payload: {
        userData: initialUserState.userData
      },
      error: {
        message: messageText
      }
    });
    expect(userState).toEqual({
      isAuthorized: false,
      userData: initialUserState.userData,
      error: null
    });
  });
});

afterAll(() => {
  jest.clearAllMocks();
});
