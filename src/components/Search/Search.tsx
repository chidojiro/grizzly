import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { navigating } from 'consts';
import { useAutoComplete } from 'hooks';
import groupBy from 'lodash/groupBy';
import React from 'react';
import { useHistory } from 'react-router-dom';
import tw from 'twin.macro';
import { ClassName } from 'types';

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
      className={className}
      css={[tw`h-11 flex rounded-sm mx-7 relative overflow-visible z-[10000]`, tw`sm:mx-0`]}
      style={{ outline: isFocused ? '3px solid rgba(0, 123, 255, 0.3)' : 'none' }}>
      <input
        placeholder='Search Products'
        value={q}
        onChange={handleQChange}
        onKeyDown={handleKeyDown}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        css={[tw`w-full px-4 font-medium text-black border-0 outline-none bg-gray`]}></input>
      <div
        onClick={() => submitQ()}
        css={[tw`flex items-center justify-center flex-shrink-0 h-full px-3 cursor-pointer bg-green`]}>
        <FontAwesomeIcon icon={faSearch} css={[tw`text-white`]} />
      </div>
      {!!suggestions?.length && (
        <div
          css={[
            tw`w-full absolute bg-white text-[16px] top-[44px] shadow border border-solid border-gray`,
            tw`sm:top-[38px]`,
          ]}>
          {suggestions.slice(0, 5).map(suggestion => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              onClick={() => submitQ(suggestion)}
              css={[
                tw`block px-4 py-1 font-medium border-0 border-b border-solid cursor-pointer border-gray last:border-b-0`,
              ]}>
              {suggestion}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
