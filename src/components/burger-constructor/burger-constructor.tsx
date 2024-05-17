import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import {
  createOrderBurger,
  selectConstructorItems,
  selectCurrentOrder,
  closeOrderModal as closeModal
} from '../../slices/feedSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from 'src/services/store';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectConstructorItems);
  const { orderRequest, orderModalData } = useSelector(selectCurrentOrder);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onOrderClick = () => {
    if (!localStorage.getItem('accessToken')) return navigate('/login');
    if (!constructorItems.bun || orderRequest) return;
    dispatch(
      createOrderBurger([
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(closeModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
