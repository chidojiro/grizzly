import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAutoComplete, useSupport } from 'hooks';
import URI from 'urijs';
import React from 'react';
import tw from 'twin.macro';
import { ClassName } from 'types';
import { SearchApis } from 'apis';
import { useHistory, useLocation } from 'react-router';
import debounce from 'lodash/debounce';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = ClassName & {};

export const Search = ({ className }: Props) => {
  const [q, _setQ] = React.useState('');
  const [debouncedQ, setDebouncedQ] = React.useState(q);
  const [isFocused, setIsFocused] = React.useState(false);
  const { data: suggestions } = useAutoComplete(debouncedQ);
  const { data: articles } = useSupport(debouncedQ);
  const history = useHistory();
  const { pathname, search } = useLocation();

  const debouncedSetQ = debounce((q: string) => setDebouncedQ(q), 300);
  const setQRef = React.useRef((q: string) => {
    _setQ(q);
    debouncedSetQ(q);
  });
  const setQ = setQRef.current;

  React.useEffect(() => {
    const uri = new URI(search);
    const searches = uri.search(true);

    const { productid, ...posNegToken } = searches;

    if (productid) {
      SearchApis.sendClickEvent(productid, posNegToken as any);
      uri.removeSearch('productid').removeSearch('pos').removeSearch('neg');

      history.replace({ pathname, search: uri.href() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitQ = (qOverride?: string) => {
    const _q = (qOverride || q || '')
      .replaceAll(/[/(/):]/g, ' ')
      .trim()
      .replaceAll(/\s+/g, ' ');
    if (!_q) return;

    const uri = new URI('/search');
    uri.setSearch('q', _q);
    window.location.href = uri.href().toString();
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

  const handleContainerKeydown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    const focused = document.activeElement as Element;
    const suggests: any[] = Array.from(document.querySelectorAll('.search-suggest'));

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();

      const nextSuggest = suggests.includes(focused)
        ? suggests[suggests.indexOf(focused) + 1] || suggests[suggests.length - 1]
        : suggests[0];

      nextSuggest.focus();
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();

      const nextSuggest = suggests.includes(focused)
        ? suggests[suggests.indexOf(focused) - 1] || suggests[0]
        : suggests[0];

      nextSuggest.focus();
    }
  };

  return (
    <div
      className={className}
      css={[tw`h-[45px] flex rounded-[2px] relative overflow-visible z-[10000]`, tw`sm:mx-0`]}
      style={{ outline: isFocused ? '3px solid rgba(0, 123, 255, 0.3)' : 'none' }}
      onKeyDown={handleContainerKeydown}>
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
      {(!!suggestions?.length || !!articles?.length) && (
        <div
          css={[
            tw`w-full absolute bg-white text-[16px] top-[44px] shadow border border-solid border-gray`,
            tw`sm:top-[38px]`,
          ]}>
          {suggestions.slice(0, 5).map(suggestion => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              className='search-suggest'
              tabIndex={0}
              key={suggestion}
              href='#'
              onClick={() => submitQ(suggestion)}
              css={[
                tw`block px-4 py-1 font-medium border-0 border-b border-solid cursor-pointer border-gray last:border-b-0`,
              ]}>
              {suggestion}
            </a>
          ))}
          {!!articles?.length && (
            <>
              <div css={[tw`px-4 py-0.5 text-sm text-black bg-gray-light-2`]}>
                Help Articles Containing {debouncedQ}
              </div>
              <div>
                {articles?.slice(0, 5).map(({ title, url }) => (
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <a
                    className='search-suggest'
                    tabIndex={0}
                    key={url as string}
                    target='_blank'
                    rel='noreferrer'
                    href={url as string}
                    css={[
                      tw`block px-4 py-1 text-[13px] font-medium border-0 border-b border-solid cursor-pointer border-gray last:border-b-0`,
                    ]}>
                    {title}
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
