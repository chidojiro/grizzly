import classNames from 'classnames';
import { ClassName } from 'types';

const formatNumber = (num: number) => {
  const segments: string[] = [];

  const splitSegments = (remainingNum: string) => {
    if (remainingNum.length <= 3) {
      segments.unshift(remainingNum);
      return;
    }

    segments.unshift(remainingNum.slice(remainingNum.length - 3));
    splitSegments(remainingNum.slice(0, remainingNum.length - 3));
  };

  splitSegments(num.toString());

  return segments.join(',');
};

type Props = ClassName & {
  price: number;
  obsolete?: boolean;
};

export const Price = ({ price, className }: Props) => {
  const [dollars, cent] = price.toFixed(2).toString().split('.');

  return (
    <span className={classNames(className)}>
      <sup className='tw-text-[70%]'>$</sup>
      {formatNumber(+dollars)}
      <sup className='tw-text-[70%]'>{cent || '00'}</sup>
    </span>
  );
};
