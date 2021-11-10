import classNames from 'classnames';
import React from 'react';
import { Children } from 'types';

type Props = Children;

export const Item = ({ children }: Props) => {
  return (
    <div className={classNames('flex items-center justify-between')}>
      <div className='flex items-center cursor-pointer'>{children}</div>
    </div>
  );
};
