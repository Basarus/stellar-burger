import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from 'react-redux';
import { fetchLogoutUser } from '../../slices/userSlice';
import { AppDispatch } from 'src/services/store';
import { useNavigate } from 'react-router-dom';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(fetchLogoutUser())
      .unwrap()
      .then(() => {
        navigate('/', {});
      });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
