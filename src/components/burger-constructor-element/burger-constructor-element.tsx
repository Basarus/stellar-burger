import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from 'react-redux';
import {
  removeBurgerIngredient,
  switchBurgerIngredient
} from '../../slices/feedSlice';
import { AppDispatch } from 'src/services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleMoveDown = () => {
      dispatch(switchBurgerIngredient({ index, split: 1 }));
    };

    const handleMoveUp = () => {
      dispatch(switchBurgerIngredient({ index, split: -1 }));
    };

    const handleClose = () => {
      dispatch(removeBurgerIngredient(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
