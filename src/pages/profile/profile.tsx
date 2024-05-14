import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUserProfile,
  fetchUpdateUserProfile
} from '../../slices/userSlice';
import { AppDispatch } from 'src/services/store';

export const Profile: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { email, name } = useSelector(selectUserProfile);

  const [formValue, setFormValue] = useState({
    name,
    email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: name || '',
      email: email || ''
    }));
  }, [email, name]);

  const isFormChanged =
    formValue.name !== name ||
    formValue.email !== email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchUpdateUserProfile(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name,
      email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
