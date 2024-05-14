import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIndredients } from '../../slices/feedSlice';

export const IngredientDetails: FC = () => {
  const [_, ingredientsPath, hash] = useLocation().pathname.split('/');
  const ingredients = useSelector(selectIndredients);
  const ingredientData = ingredients.data.find(
    (ingredient) => ingredient._id === hash
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
