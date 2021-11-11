import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames';
import React from 'react';
import { ClassName } from 'types';

export type Props = ClassName & {};

export const Search = ({ className }: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div
      className={classNames(
        'tw-h-11 tw-flex tw-rounded-sm tw-overflow-hidden tw-mx-7',
        { 'tw-ring tw-ring-offset tw-ring-offset-blue-light-1': isFocused },
        className
      )}>
      <input
        className='tw-w-full tw-px-4 tw-font-medium tw-text-black tw-outline-none tw-bg-gray'
        placeholder='Search Products'
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}></input>
      <div className='tw-flex tw-items-center tw-justify-center tw-flex-shrink-0 tw-h-full tw-px-3 tw-cursor-pointer tw-bg-green'>
        <FontAwesomeIcon icon={faSearch} className='tw-text-white' />
      </div>
    </div>
  );
};
