import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from './Nav';
import Search from './Search';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = {};

const MOCK_HEADER_BG = 'https://www.grizzly.com/img/metal-bg.webp';
const MOCK_LOGO = 'https://www.grizzly.com/img/logo/griz-logo@1x.webp';

export const Header = ({}: Props) => {
  return (
    <div className={classNames('gl-header', 'bg-repeat-x')} style={{ backgroundImage: `url(${MOCK_HEADER_BG})` }}>
      <div className='h-11 bg-red'></div>
      <div className='relative flex items-center px-4 h-25'>
        <Link to='/'>
          <img src={MOCK_LOGO} className='h-12' />
        </Link>
        <div className='flex-1'>
          <Search />
        </div>
        <div className='flex items-center text-lg uppercase text-yellow whitespace-nowrap'>
          Purveyors of Fine Machinery<sup>®</sup>
        </div>
        <div className='absolute bottom-0 px-3 pt-1 pb-1 text-sm uppercase rounded-t cursor-pointer right-8 bg-yellow'>
          <FontAwesomeIcon icon={faEnvelope} className='mr-1' />
          Sign Up For Emails
        </div>
      </div>
      <Nav />
    </div>
  );
};
