import { expect, test, describe } from '@jest/globals';
import {
  fetchLoginUser,
  fetchForgotPassword,
  fetchResetPassword,
  fetchUserProfile,
  fetchUpdateUserProfile,
  fetchLogoutUser,
  fetchRegisterUser,
  reducer,
  IUserState
} from '../src/slices/userSlice';

const initialState: IUserState = {
  email: '',
  name: '',
  password: '',
  isTryAuth: false,
  isLoading: true
};

describe('Тестирование асинхронных экшенов userSlice', () => {
  test('Запрос на регистрацию (penging)', async () => {
    const action = {
      type: fetchRegisterUser.pending.type,
      payload: undefined
    };

    const { error, isLoading } = reducer(initialState, action);

    expect(isLoading).toEqual(true);
    expect(error).toBeNull();
  });

  test('Запрос на регистрацию (rejected)', async () => {
    const action = {
      type: fetchRegisterUser.rejected.type,
      error: { message: 'Error' }
    };

    const initialStateTest = {
      ...initialState,
      ingredients: { isLoading: false, data: [] },
      error: 'Error'
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Запрос на регистрацию (fulfilled)', async () => {
    const action = {
      type: fetchRegisterUser.fulfilled.type,
      payload: { user: { name: 'username', email: 'email' } }
    };

    const initialStateTest = {
      ...initialState,
      name: 'username',
      email: 'email',
      isLoading: false
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Запрос на авторизацию (penging)', async () => {
    const action = {
      type: fetchLoginUser.pending.type,
      payload: undefined
    };

    const { error } = reducer(initialState, action);

    expect(error).toBeNull();
  });

  test('Запрос на авторизацию (rejected)', async () => {
    const action = {
      type: fetchLoginUser.rejected.type,
      error: { message: 'Error' }
    };

    const initialStateTest = {
      ...initialState,
      ingredients: { isLoading: false, data: [] },
      error: 'Error'
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Запрос на авторизацию (fulfilled)', async () => {
    const action = {
      type: fetchLoginUser.fulfilled.type,
      payload: { user: { name: 'username', email: 'email' } }
    };

    const initialStateTest = {
      ...initialState,
      name: 'username',
      email: 'email',
      isLoading: false,
      isTryAuth: true
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Запрос на запрос "Забыли пароль" (penging)', async () => {
    const action = {
      type: fetchForgotPassword.pending.type,
      payload: undefined
    };

    const { error } = reducer(initialState, action);

    expect(error).toBeNull();
  });

  test('Запрос на запрос "Забыли пароль"  (rejected)', async () => {
    const action = {
      type: fetchForgotPassword.rejected.type,
      error: { message: 'Error' }
    };

    const initialStateTest = {
      ...initialState,
      ingredients: { isLoading: false, data: [] },
      error: 'Error'
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Запрос на запрос "Забыли пароль"  (fulfilled)', async () => {
    const action = {
      type: fetchForgotPassword.fulfilled.type,
      payload: { user: { name: 'username', email: 'email' } }
    };

    const initialStateTest = {
      ...initialState,
      isLoading: false
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Запрос на восстановление пароля (penging)', async () => {
    const action = {
      type: fetchResetPassword.pending.type,
      payload: undefined
    };

    const { error, isLoading } = reducer(initialState, action);

    expect(error).toBeNull();
    expect(isLoading).toEqual(true);
  });

  test('Запрос на восстановление пароля (rejected)', async () => {
    const action = {
      type: fetchResetPassword.rejected.type,
      error: { message: 'Error' }
    };

    const initialStateTest = {
      ...initialState,
      ingredients: { isLoading: false, data: [] },
      error: 'Error'
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Запрос на восстановление пароля (fulfilled)', async () => {
    const action = {
      type: fetchResetPassword.fulfilled.type,
      payload: { user: { name: 'username', email: 'email' } }
    };

    const initialStateTest = {
      ...initialState,
      name: 'username',
      email: 'email',
      isLoading: false
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Запрос на получение данных пользователя (penging)', async () => {
    const action = {
      type: fetchUserProfile.pending.type,
      payload: undefined
    };

    const { error, isLoading } = reducer(initialState, action);

    expect(error).toBeNull();
    expect(isLoading).toEqual(true);
  });

  test('Запрос на получение данных пользователя (rejected)', async () => {
    const action = {
      type: fetchUserProfile.rejected.type,
      error: { message: 'Error' }
    };

    const initialStateTest = {
      ...initialState,
      ingredients: { isLoading: false, data: [] },
      error: 'Error'
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Запрос на получение данных пользователя (fulfilled)', async () => {
    const action = {
      type: fetchUserProfile.fulfilled.type,
      payload: { user: { name: 'username', email: 'email' } }
    };

    const initialStateTest = {
      ...initialState,
      name: 'username',
      email: 'email',
      isLoading: false
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Запрос на обновление данных пользователя (penging)', async () => {
    const action = {
      type: fetchUpdateUserProfile.pending.type,
      payload: undefined
    };

    const { error, isLoading } = reducer(initialState, action);

    expect(error).toBeNull();
    expect(isLoading).toEqual(true);
  });

  test('Запрос на обновление данных пользователя (rejected)', async () => {
    const action = {
      type: fetchUpdateUserProfile.rejected.type,
      error: { message: 'Error' }
    };

    const initialStateTest = {
      ...initialState,
      ingredients: { isLoading: false, data: [] },
      error: 'Error'
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Запрос на обновление данных пользователя (fulfilled)', async () => {
    const action = {
      type: fetchUpdateUserProfile.fulfilled.type,
      payload: { user: { name: 'username', email: 'email' } }
    };

    const initialStateTest = {
      ...initialState,
      name: 'username',
      email: 'email',
      isLoading: false
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Запрос на выход пользователя из профиля (penging)', async () => {
    const action = {
      type: fetchLogoutUser.pending.type,
      payload: undefined
    };

    const { error, isLoading } = reducer(initialState, action);

    expect(error).toBeNull();
    expect(isLoading).toEqual(true);
  });

  test('Запрос на выход пользователя из профиля (rejected)', async () => {
    const action = {
      type: fetchLogoutUser.rejected.type,
      error: { message: 'Error' }
    };

    const initialStateTest = {
      ...initialState,
      ingredients: { isLoading: false, data: [] },
      error: 'Error'
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Запрос на выход пользователя из профиля (fulfilled)', async () => {
    const action = {
      type: fetchLogoutUser.fulfilled.type,
      payload: undefined
    };

    const initialStateTest = {
      ...initialState,
      name: '',
      email: '',
      isLoading: false
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });
});
