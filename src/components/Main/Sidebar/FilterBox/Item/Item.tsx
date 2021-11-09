import classNames from 'classnames';
import React from 'react';
import { Children } from 'types';

type Props = Children;

export const Item = ({ children }: Props) => {
  return (
    <div className={classNames('flex items-center justify-between mb-2 ml-0.5')}>
      <label className='flex items-center cursor-pointer'>{children}</label>
    </div>
  );
};
