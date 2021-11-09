import classNames from 'classnames';
import { Link } from 'react-router-dom';
import 'twin.macro';
import { Item } from '../Item';

const items = [
  {
    label: 'Router Bits',
    image: 'https://cdn0.grizzly.com/pics/jpeg288/g/g0696x-89e9d89fd04a433c2b3cfca10537b032.jpg',
    href: '/table-saws',
  },
  {
    label: 'Router Bits',
    image: 'https://cdn0.grizzly.com/pics/jpeg288/g/g0696x-89e9d89fd04a433c2b3cfca10537b032.jpg',
    href: '/table-saws',
  },
  {
    label: 'Router Bits',
    image: 'https://cdn0.grizzly.com/pics/jpeg288/g/g0696x-89e9d89fd04a433c2b3cfca10537b032.jpg',
    href: '/table-saws',
  },
  {
    label: 'Router Bits',
    image: 'https://cdn0.grizzly.com/pics/jpeg288/g/g0696x-89e9d89fd04a433c2b3cfca10537b032.jpg',
    href: '/table-saws',
  },
  {
    label: 'Router Bits',
    image: 'https://cdn0.grizzly.com/pics/jpeg288/g/g0696x-89e9d89fd04a433c2b3cfca10537b032.jpg',
    href: '/table-saws',
  },
  {
    label: 'Router Bits',
    image: 'https://cdn0.grizzly.com/pics/jpeg288/g/g0696x-89e9d89fd04a433c2b3cfca10537b032.jpg',
    href: '/table-saws',
  },
  {
    label: 'Router Bits',
    image: 'https://cdn0.grizzly.com/pics/jpeg288/g/g0696x-89e9d89fd04a433c2b3cfca10537b032.jpg',
    href: '/table-saws',
  },
  {
    label: 'Router Bits',
    image: 'https://cdn0.grizzly.com/pics/jpeg288/g/g0696x-89e9d89fd04a433c2b3cfca10537b032.jpg',
    href: '/table-saws',
  },
  {
    label: 'Router Bits',
    image: 'https://cdn0.grizzly.com/pics/jpeg288/g/g0696x-89e9d89fd04a433c2b3cfca10537b032.jpg',
    href: '/table-saws',
  },
  {
    label: 'Router Bits',
    image: 'https://cdn0.grizzly.com/pics/jpeg288/g/g0696x-89e9d89fd04a433c2b3cfca10537b032.jpg',
    href: '/table-saws',
  },
  {
    label: 'Router Bits',
    image: 'https://cdn0.grizzly.com/pics/jpeg288/g/g0696x-89e9d89fd04a433c2b3cfca10537b032.jpg',
    href: '/table-saws',
  },
  {
    label: 'Router Bits',
    image: 'https://cdn0.grizzly.com/pics/jpeg288/g/g0696x-89e9d89fd04a433c2b3cfca10537b032.jpg',
    href: '/table-saws',
  },
  {
    label: 'Router Bits',
    image: 'https://cdn0.grizzly.com/pics/jpeg288/g/g0696x-89e9d89fd04a433c2b3cfca10537b032.jpg',
    href: '/table-saws',
  },
  {
    label: 'Router Bits',
    image: 'https://cdn0.grizzly.com/pics/jpeg288/g/g0696x-89e9d89fd04a433c2b3cfca10537b032.jpg',
    href: '/table-saws',
  },
];

export const RouterBits = () => {
  return (
    <Item label='RouterBits'>
      <div className='grid grid-cols-6 gap-[1px] bg-gray-light-2'>
        {items.map(({ href, image, label }, idx) => (
          <Link
            to={href}
            key={idx}
            className='h-[215px] text-xl flex items-end justify-center w-full bg-white'
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: '46%',
              backgroundPositionX: 'center',
              backgroundPositionY: '10px',
            }}>
            {label}
          </Link>
        ))}
        <div
          className={classNames('bg-white', {
            'col-span-5': items.length % 6 === 1,
            'col-span-4': items.length % 6 === 2,
            'col-span-3': items.length % 6 === 3,
            'col-span-2': items.length % 6 === 4,
            'col-span-1': items.length % 6 === 5,
          })}></div>
      </div>
    </Item>
  );
};
