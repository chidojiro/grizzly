import { Children, ClassName } from 'types';
import 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useVisibilityControl } from 'hooks';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = Children &
  ClassName & {
    label: string;
    href?: string;
  };

export const Item = ({ children, label, href }: Props) => {
  const control = useVisibilityControl();
  const className = 'flex items-center justify-center px-4 text-xs uppercase cursor-pointer hover:bg-green';

  if (href)
    return (
      <Link to={href} className={classNames('text-white', className)}>
        {label}
      </Link>
    );

  return (
    <div className={className} onMouseEnter={control.show} onMouseLeave={control.hide}>
      <div className='text-white'>{label}</div>
      <FontAwesomeIcon icon={faCaretDown} className='ml-2 transform -translate-y-0.5 text-white' />
      {/* {control.visible && <div className='absolute top-[188px] left-0 w-screen z-10 max-h-[645px]'>{children}</div>} */}
    </div>
  );
};
