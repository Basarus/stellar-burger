import styles from './app-header.module.css';
import { Link } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../../slices/userSlice';

export function AppHeaderUI() {
  const name = useSelector(selectUserName);
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <BurgerIcon type={'primary'} />
            <Link to='/' className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </Link>
          </>
          <>
            <ListIcon type={'primary'} />
            <Link to='/feed' className='text text_type_main-default ml-2'>
              Лента заказов
            </Link>
          </>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <ProfileIcon type={'primary'} />
          <Link to='/profile' className='text text_type_main-default ml-2'>
            {name || 'Личный кабинет'}
          </Link>
        </div>
      </nav>
    </header>
  );
}
