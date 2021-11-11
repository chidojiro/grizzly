import classNames from 'classnames';
import React from 'react';
import { Children } from 'types';

type Props = Children;

export const Item = ({ children }: Props) => {
  return (
    <div className={classNames('tw-flex tw-items-center tw-justify-between')}>
      <div className='tw-flex tw-items-center tw-cursor-pointer'>{children}</div>
    </div>
  );
};
