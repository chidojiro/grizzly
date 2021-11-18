import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useAutoComplete } from 'hooks';
import React from 'react';
import { ClassName } from 'types';
import { navigating } from 'consts';
import groupBy from 'lodash/groupBy';
import { useHistory } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = ClassName & {};

const navigatingGroupedByQuery = groupBy(navigating, 'SearchTriggers');

export const Search = ({ className }: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const history = useHistory();

  const { q, setQ, data: suggestions } = useAutoComplete();

  const submitQ = (qOverride?: string) => {
    const _q = qOverride || q;
    if (!_q) return;

    const foundNavigating = navigatingGroupedByQuery[_q];

    if (foundNavigating?.[0].VirtualPath) {
      history.push(foundNavigating[0].VirtualPath);
    } else {
      history.push(`/search?q=${_q}`);
    }
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
        'tw-h-11 tw-flex tw-rounded-sm tw-mx-7 tw-relative tw-overflow-visible tw-z-[10000]',
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
        onClick={() => submitQ()}>
        <FontAwesomeIcon icon={faSearch} className='tw-text-white' />
      </div>
      {!!suggestions?.length && (
        <div className='tw-w-full tw-absolute tw-bg-white tw-text-[16px] tw-top-[44px] tw-shadow tw-border tw-border-solid tw-border-gray'>
          {suggestions.map(suggestion => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              onClick={() => submitQ(suggestion)}
              className='tw-cursor-pointer tw-block tw-py-1 tw-px-4 tw-font-medium tw-not tw-border-b tw-border-gray tw-border-solid last:border-b-0'>
              {suggestion}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
