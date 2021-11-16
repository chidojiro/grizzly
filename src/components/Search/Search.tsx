import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useAutoComplete, useQuery } from 'hooks';
import React from 'react';
import { ClassName } from 'types';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = ClassName & {};

export const Search = ({ className }: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const query = useQuery();

  const { q, setQ } = useAutoComplete();

  const submitQ = () => {
    query.set('q', q);
    window.location.reload();
    setQ('');
  };

  const handleQChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const newQ = e.target.value;
    setQ(newQ);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      submitQ();
    }
  };

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
        value={q}
        onChange={handleQChange}
        onKeyDown={handleKeyDown}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}></input>
      <div
        className='tw-flex tw-items-center tw-justify-center tw-flex-shrink-0 tw-h-full tw-px-3 tw-cursor-pointer tw-bg-green'
        onClick={submitQ}>
        <FontAwesomeIcon icon={faSearch} className='tw-text-white' />
      </div>
    </div>
  );
};
