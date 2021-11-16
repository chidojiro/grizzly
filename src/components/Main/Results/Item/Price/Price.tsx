import classNames from 'classnames';
import { ClassName } from 'types';

const formatNumber = (num: number) => {
  const segments: number[] = [];

  const splitSegments = (remainingNum: number) => {
    if (remainingNum < 1) return;

    segments.unshift(remainingNum % 1000);
    splitSegments(Math.floor(remainingNum / 1000));
  };

  splitSegments(num);

  return segments.join(',');
};

type Props = ClassName & {
  price: number;
  obsolete?: boolean;
};

export const Price = ({ price, obsolete, className }: Props) => {
  const [dollars, cent] = price.toString().split('.');

  return (
    <div
      className={classNames(
        'tw-flex',
        {
          'tw-text-xl tw-text-red-dark-1': !obsolete,
          'tw-text-md tw-text-gray-light-1 tw-line-through': obsolete,
        },
        className
      )}>
      <span className='tw-transform tw-scale-50 tw-translate-x-0.5 tw--translate-y-1'>$</span>
      {formatNumber(+dollars)}
      <span className='tw-transform tw-scale-50 tw--translate-x-1 tw--translate-y-1'>{cent || '00'}</span>
    </div>
  );
};
