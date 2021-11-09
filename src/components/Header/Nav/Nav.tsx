import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import 'twin.macro';
import { Blades } from './Blades';
import { Categories } from './Categories';
import { Deals } from './Deals';
import { MetalWorking } from './MetalWorking';
import { Parts } from './Parts';
import { PowerTools } from './PowerTools';
import { RouterBits } from './RouterBits';
import { Schools } from './Schools';
import { UserMenu } from './UserMenu';
import { WoodWorking } from './WoodWorking';

export const Nav = () => {
  return (
    <div className='flex justify-between pr-4 bg-black h-11'>
      <div className='flex'>
        <WoodWorking />
        <MetalWorking />
        <Categories />
        <Blades />
        <PowerTools />
        <RouterBits />
        <Deals />
        <Schools />
        <Parts />
      </div>
      <div className='flex items-center text-white'>
        <a href='https://support.grizzly.com/hc/en-us' className='text-sm hover:underline'>
          Support
        </a>
        <UserMenu />
        <div className='flex items-center justify-center h-full px-4 cursor-pointer bg-red-dark-1'>
          <FontAwesomeIcon icon={faShoppingCart} className='text-lg' />
          <div className='pl-6 pr-2'>2</div>
        </div>
      </div>
    </div>
  );
};
