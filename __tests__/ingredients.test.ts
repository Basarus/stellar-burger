import { expect, test, describe } from '@jest/globals';
import {
  IFeedState,
  reducer,
  addBurgerIngredient,
  switchBurgerIngredient,
  removeBurgerIngredient,
  fetchGetIngredients,
  fetchGetFeeds,
  createOrderBurger,
  fetchGetOrderByNumberId,
  fetchGetOrders
} from '../src/slices/feedSlice';
import { TIngredient } from '../src/utils/types';

const initialState: IFeedState = {
  orders: {
    data: null,
    isLoading: true
  },
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
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
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
      }
    ],
    isLoading: true
  },
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  orderModalDetails: null
};

const expectedIngredients: TIngredient[] =
  require('./mock/ingredients.json') as TIngredient[];

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
      orders: [
        {
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
        }
      ]
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
    const expectedData = {
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

    const action = {
      type: createOrderBurger.fulfilled.type,
      payload: { order: expectedData }
    };

    const initialStateTest = {
      ...initialState,
      orderModalData: expectedData
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
    const expectedData = {
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

    const action = {
      type: fetchGetOrderByNumberId.fulfilled.type,
      payload: { orders: [expectedData] }
    };

    const initialStateTest = {
      ...initialState,
      orderModalDetails: expectedData
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
    const expectedData = {
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

    const action = {
      type: fetchGetOrders.fulfilled.type,
      payload: [expectedData]
    };

    const initialStateTest = {
      ...initialState,
      orders: { data: [expectedData], isLoading: false }
    };

    const newState = reducer(initialStateTest, action);

    expect(newState).toEqual(initialStateTest);
  });
});

describe('Тестирование синхронных экшенов feedSlice', () => {
  test('Добавление ингредиента (булка)', () => {
    const newState = reducer(
      initialState,
      addBurgerIngredient(initialState.ingredients.data[0])
    );

    const { constructorItems } = newState;

    expect(constructorItems.bun).toEqual(initialState.ingredients.data[0]);
  });

  test('Добавление ингредиента (начинка)', () => {
    const newState = reducer(
      initialState,
      addBurgerIngredient(initialState.ingredients.data[1])
    );

    const { constructorItems } = newState;

    expect(constructorItems.ingredients).toEqual([
      initialState.ingredients.data[1]
    ]);
  });

  test('Добавление ингредиента (начинка !== булка)', () => {
    const newState = reducer(
      initialState,
      addBurgerIngredient(initialState.ingredients.data[0])
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
          {
            _id: '643d69a5c3f7b9001cfa0941',
            id: '643d69a5c3f7b9001cfa0941',
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
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
          },
          {
            _id: '643d69a5c3f7b9001cfa093e',
            id: '643d69a5c3f7b9001cfa093e',
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
            image_large:
              'https://code.s3.yandex.net/react/code/meat-03-large.png'
          }
        ]
      }
    };
    const newState = reducer(
      initialStateTest,
      switchBurgerIngredient({ index: 0, split: 1 })
    );

    const { constructorItems } = newState;

    expect(constructorItems.ingredients).toEqual([
      {
        _id: '643d69a5c3f7b9001cfa093e',
        id: '643d69a5c3f7b9001cfa093e',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        id: '643d69a5c3f7b9001cfa0941',
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
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ]);
  });

  test('Удаление ингредиента', () => {
    const initialStateTest = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa0941',
            id: '643d69a5c3f7b9001cfa0941',
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
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
          }
        ]
      }
    };
    const newState = reducer(initialStateTest, removeBurgerIngredient(0));

    const { constructorItems } = newState;

    expect(constructorItems.ingredients.length).toEqual(0);
  });
});
