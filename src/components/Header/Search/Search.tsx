import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames';
import React from 'react';
import { ClassName } from 'types';

export type Props = ClassName & {};

function checkFont(strFamily: any) {
  var objDiv = document.createElement('div');

  objDiv.style.fontFamily = strFamily;
  objDiv.appendChild(document.createTextNode('FONT TEST'));

  if (window.getComputedStyle) {
    return window.getComputedStyle(objDiv, null).getPropertyValue('font-family') === strFamily;
  }

  return (objDiv as any).currentStyle.fontFamily === strFamily;
}

const Search = ({ className }: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div
      className={classNames(
        'h-11 flex rounded-sm overflow-hidden mx-7',
        { 'ring ring-offset ring-offset-blue-light-1': isFocused },
        className
      )}>
      <input
        className='w-full px-4 outline-none bg-gray placeholder-black::placeholder'
        placeholder='Search Products'
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}></input>
      <div className='flex items-center justify-center flex-shrink-0 h-full px-3 bg-green'>
        <FontAwesomeIcon icon={faSearch} className='text-white' />
      </div>
    </div>
  );
};

export default Search;
