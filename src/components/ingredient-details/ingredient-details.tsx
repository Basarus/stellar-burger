import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIngredientModal,
  openIngredientModal
} from '../../slices/feedSlice';
import { AppDispatch } from 'src/services/store';

export const IngredientDetails: FC = () => {
  const [_, ingredients, hash] = useLocation().pathname.split('/');
  const dispatch = useDispatch<AppDispatch>();
  const ingredientData = useSelector(selectIngredientModal);

  useEffect(() => {
    dispatch(openIngredientModal(hash));
  }, []);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
