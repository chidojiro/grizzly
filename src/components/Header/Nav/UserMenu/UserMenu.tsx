import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import {
  faBoxes,
  faCaretDown,
  faGift,
  faHouseUser,
  faKey,
  faSignInAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useVisibilityControl } from 'hooks';
import { Link } from 'react-router-dom';

const items = [
  { label: 'Your Account', href: '/user/account', icon: faKey },
  { label: 'Your Orders', href: '/user/orders', icon: faBoxes },
  { label: 'Your Saved Payments', href: '/user/payments', icon: faCreditCard },
  { label: 'Your Saved Addresses', href: '/user/addresses', icon: faHouseUser },
  { label: 'Your Wish List', href: '/user/wishlist', icon: faGift },
  { label: 'Order Lookup', href: '/user/lookup', icon: faSearchengin },
  { label: 'Sign In', href: '/user/login', icon: faSignInAlt },
];

export const UserMenu = () => {
  const control = useVisibilityControl();

  return (
    <div
      className='relative flex items-center h-full px-4 ml-3 cursor-pointer'
      onMouseOver={control.show}
      onMouseLeave={control.hide}>
      <FontAwesomeIcon icon={faUser} className='z-50 text-lg' />
      <FontAwesomeIcon icon={faCaretDown} className='z-50 ml-2 text-sm' />
      {control.visible && (
        <div className='absolute top-0 right-0 rounded bg-gray-dark-2 w-50'>
          <div className='border-b border-black border-solid h-11'></div>
          {items.map(({ href, icon, label }) => (
            <Link to={href} className='flex items-center h-10'>
              <div className='flex items-center justify-center w-10 h-full border-r border-solid border-gray-dark-1'>
                <FontAwesomeIcon icon={icon} className='text-md' />
              </div>
              <div className='ml-2 text-xs uppercase'>{label}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
