import { expect, test, describe } from '@jest/globals';
import {
  reducer,
  addBurgerIngredient,
  switchBurgerIngredient,
  removeBurgerIngredient,
  fetchGetIngredients,
  fetchGetFeeds,
  createOrderBurger,
  fetchGetOrderByNumberId,
  fetchGetOrders,
  initialState
} from '../src/slices/feedSlice';
import { TIngredient } from '../src/utils/types';

const expectedIngredients: TIngredient[] =
  require('./mock/ingredients.json') as TIngredient[];

const expectedOrder = {
  _id: '6653204697ede0001d06c647',
  ingredients: [
    '643d69a5c3f7b9001cfa0943',
    '643d69a5c3f7b9001cfa0943',
    '643d69a5c3f7b9001cfa093d'
  ],
  status: 'done',
  name: 'Space флюоресцентный бургер',
  createdAt: '2024-05-26T11:43:02.934Z',
  updatedAt: '2024-05-26T11:43:03.389Z',
  number: 40903
};

describe('Тестирование асинхронных экшенов feedSlice', () => {
  test('Получение ингредиентов (penging)', async () => {
    const action = {
      type: fetchGetIngredients.pending.type,
      payload: undefined
    };

    const { ingredients } = reducer(initialState, action);

    expect(ingredients.data).toEqual(initialState.ingredients.data);
  });

  test('Получение ингредиентов (rejected)', async () => {
    const action = {
      type: fetchGetIngredients.rejected.type,
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

  test('Получение ингредиентов (fulfilled)', async () => {
    const action = {
      type: fetchGetIngredients.fulfilled.type,
      payload: expectedIngredients
    };

    const initialStateTest = {
      ...initialState,
      ingredients: { isLoading: false, data: expectedIngredients }
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Получение заказов (penging)', async () => {
    const action = {
      type: fetchGetFeeds.pending.type,
      payload: undefined
    };

    const { feeds } = reducer(initialState, action);

    expect(feeds).toEqual(feeds);
  });

  test('Получение заказов (rejected)', async () => {
    const action = {
      type: fetchGetFeeds.rejected.type,
      error: { message: 'Error' }
    };

    const initialStateTest = {
      ...initialState,
      feeds: { orders: [], total: 0, totalToday: 0 },
      error: 'Error'
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Получение заказов (fulfilled)', async () => {
    const expectedData = {
      success: true,
      total: 100,
      totalToday: 100,
      orders: [expectedOrder]
    };

    const action = {
      type: fetchGetFeeds.fulfilled.type,
      payload: expectedData
    };

    const initialStateTest = {
      ...initialState,
      feeds: { ...expectedData }
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Отправка заказа (penging)', async () => {
    const action = {
      type: createOrderBurger.pending.type,
      payload: undefined
    };

    const { orderRequest } = reducer(initialState, action);

    expect(orderRequest).toEqual(true);
  });

  test('Отправка заказа (rejected)', async () => {
    const action = {
      type: createOrderBurger.rejected.type,
      error: { message: 'Error' }
    };

    const initialStateTest = {
      ...initialState,
      orderRequest: false,
      error: 'Error'
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Отправка заказа (fulfilled)', async () => {
    const action = {
      type: createOrderBurger.fulfilled.type,
      payload: { order: expectedOrder }
    };

    const initialStateTest = {
      ...initialState,
      orderModalData: expectedOrder
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Получение заказа по Id (penging)', async () => {
    const action = {
      type: fetchGetOrderByNumberId.pending.type,
      payload: undefined
    };

    const { orderModalDetails } = reducer(initialState, action);

    expect(orderModalDetails).toEqual(null);
  });

  test('Получение заказа по Id (rejected)', async () => {
    const action = {
      type: fetchGetOrderByNumberId.rejected.type,
      error: { message: 'Error' }
    };

    const initialStateTest = {
      ...initialState,
      error: 'Error'
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Получение заказа по Id (fulfilled)', async () => {
    const action = {
      type: fetchGetOrderByNumberId.fulfilled.type,
      payload: { orders: [expectedOrder] }
    };

    const initialStateTest = {
      ...initialState,
      orderModalDetails: expectedOrder
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Получение заказов (penging)', async () => {
    const action = {
      type: fetchGetOrders.pending.type,
      payload: undefined
    };

    const { orders } = reducer(initialState, action);

    expect(orders.data).toEqual(null);
  });

  test('Получение заказов (rejected)', async () => {
    const action = {
      type: fetchGetOrders.rejected.type,
      error: { message: 'Error' }
    };

    const initialStateTest = {
      ...initialState,
      error: 'Error'
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });

  test('Получение заказов (fulfilled)', async () => {
    const action = {
      type: fetchGetOrders.fulfilled.type,
      payload: [expectedOrder]
    };

    const initialStateTest = {
      ...initialState,
      orders: { data: [expectedOrder], isLoading: false }
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });
});

describe('Тестирование синхронных экшенов feedSlice', () => {
  test('Добавление ингредиента (булка)', () => {
    const newState = reducer(
      initialState,
      addBurgerIngredient({ ...expectedIngredients[0] })
    );

    const { constructorItems } = newState;

    expect(constructorItems.bun).toEqual({ ...expectedIngredients[0] });
  });

  test('Добавление ингредиента (начинка)', () => {
    const newState = reducer(
      initialState,
      addBurgerIngredient({ ...expectedIngredients[1] })
    );

    const { constructorItems } = newState;

    expect(constructorItems.ingredients).toEqual([
      { ...expectedIngredients[1] }
    ]);
  });

  test('Добавление ингредиента (начинка !== булка)', () => {
    const newState = reducer(
      initialState,
      addBurgerIngredient({ ...expectedIngredients[0] })
    );
    const { constructorItems } = newState;

    expect(constructorItems.ingredients.length).not.toEqual(1);
  });

  test('Перемещение ингредиента', () => {
    const initialStateTest = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [
          { ...expectedIngredients[0], id: expectedIngredients[0]._id },
          { ...expectedIngredients[1], id: expectedIngredients[1]._id }
        ]
      }
    };
    const newState = reducer(
      initialStateTest,
      switchBurgerIngredient({ index: 0, split: 1 })
    );

    const { constructorItems } = newState;

    expect(constructorItems.ingredients).toEqual([
      { ...expectedIngredients[1], id: expectedIngredients[1]._id },
      { ...expectedIngredients[0], id: expectedIngredients[0]._id }
    ]);
  });

  test('Удаление ингредиента', () => {
    const initialStateTest = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [
          { ...expectedIngredients[1], id: expectedIngredients[1]._id }
        ]
      }
    };
    const newState = reducer(initialStateTest, removeBurgerIngredient(0));

    const { constructorItems } = newState;

    expect(constructorItems.ingredients.length).toEqual(0);
  });
});
