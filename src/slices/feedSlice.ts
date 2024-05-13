import {
  getIngredientsApi,
  getFeedsApi, // all
  getOrdersApi, // all
  orderBurgerApi, // send
  getOrderByNumberApi
} from '@api';

import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { TIngredient, TOrder, TConstructorIngredient } from '@utils-types';

interface IFeedState {
  orders: {
    data: TOrder[] | null;
    isLoading: boolean;
  };
  feeds: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  };
  ingredients: {
    data: TIngredient[];
    isLoading: boolean;
  };
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderModalDetails: TOrder | null;
  ingredientModalData: TIngredient | null;
  error?: string | null;
}

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
    data: [],
    isLoading: true
  },
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  orderModalDetails: null,
  ingredientModalData: null
};

export const fetchGetIngredients = createAsyncThunk(
  'feed/getIngredients',
  async function () {
    return await getIngredientsApi();
  }
);

export const fetchGetFeeds = createAsyncThunk(
  'feed/getFeeds',
  async function () {
    return await getFeedsApi();
  }
);

export const fetchGetOrders = createAsyncThunk(
  'feed/getOrders',
  async function () {
    return await getOrdersApi();
  }
);

export const createOrderBurger = createAsyncThunk(
  'feed/createOrderBurger',
  async function (data: string[]) {
    return await orderBurgerApi(data);
  }
);

export const fetchGetOrderByNumberId = createAsyncThunk(
  'feed/getOrderByNumberId',
  async function (id: number) {
    return await getOrderByNumberApi(id);
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    addBurgerIngredient: function (state, action) {
      if (action.payload.type === 'bun')
        state.constructorItems.bun = action.payload;
      else state.constructorItems.ingredients.push(action.payload);
    },
    removeBurgerIngredient: function (state, action) {
      state.constructorItems.ingredients.splice(action.payload, 1);
    },
    switchBurgerIngredient: function (state, action) {
      const { index, split } = action.payload;
      const ingredients = current(state).constructorItems.ingredients;
      let item = ingredients[index];
      let itemSwitch = ingredients[index + split];
      if (itemSwitch && item)
        [
          state.constructorItems.ingredients[index],
          state.constructorItems.ingredients[index + split]
        ] = [
          state.constructorItems.ingredients[index + split],
          state.constructorItems.ingredients[index]
        ];
    },
    closeOrderModal: function (state) {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
      state.orderModalData = null;
      state.orderRequest = false;
    },
    openIngredientModal: function (state, action) {
      state.ingredientModalData =
        state.ingredients.data.find(
          (ingredient) => ingredient._id === action.payload
        ) ?? null;
    }
  },
  selectors: {
    selectIndredients: function (state) {
      return state.ingredients;
    },
    selectFeeds: function (state) {
      return state.feeds;
    },
    selectFeedsOrders: function (state) {
      return state.feeds.orders;
    },
    selectOrders: function (state) {
      return state.orders;
    },
    selectConstructorItems: function (state) {
      return state.constructorItems;
    },
    selectCurrentOrder: function (state) {
      return {
        orderRequest: state.orderRequest,
        orderModalData: state.orderModalData
      };
    },
    selectOrderDetails: function (state) {
      return state.orderModalDetails;
    },
    selectIngredientModal: function (state) {
      return state.ingredientModalData;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetIngredients.pending, (state) => {
        state.error = null;
        state.ingredients.isLoading = true;
      })
      .addCase(fetchGetIngredients.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(fetchGetIngredients.fulfilled, (state, action) => {
        state.ingredients.data = action.payload;
        state.ingredients.isLoading = false;
      });
    builder
      .addCase(fetchGetFeeds.pending, (state) => {
        state.error = null;
        state.ingredients.isLoading = true;
      })
      .addCase(fetchGetFeeds.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(fetchGetFeeds.fulfilled, (state, action) => {
        state.feeds.orders = action.payload.orders;
        state.feeds.total = action.payload.total;
        state.feeds.totalToday = action.payload.totalToday;
      });
    builder
      .addCase(createOrderBurger.pending, (state) => {
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(createOrderBurger.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(createOrderBurger.fulfilled, (state, action) => {
        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];
        state.orderModalData = action.payload.order;
      });
    builder
      .addCase(fetchGetOrderByNumberId.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchGetOrderByNumberId.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(fetchGetOrderByNumberId.fulfilled, (state, action) => {
        state.orderModalDetails = action.payload.orders[0];
      });
    builder
      .addCase(fetchGetOrders.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchGetOrders.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(fetchGetOrders.fulfilled, (state, action) => {
        state.orders.data = action.payload;
      });
  }
});

export const {
  addBurgerIngredient,
  removeBurgerIngredient,
  switchBurgerIngredient,
  closeOrderModal,
  openIngredientModal
} = feedSlice.actions;
export const {
  selectIndredients,
  selectFeeds,
  selectOrders,
  selectFeedsOrders,
  selectConstructorItems,
  selectCurrentOrder,
  selectIngredientModal,
  selectOrderDetails
} = feedSlice.selectors;
export const reducer = feedSlice.reducer;