import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useScrollDisable, VisibilityControl } from 'hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import tw from 'twin.macro';

type Anchor = 'top' | 'bottom' | 'left' | 'right';

const slideLeft = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform:translateX(0);
  }
`;

const StyledDrawerContent = styled.div`
  animation: ${slideLeft} 0.1s linear;
`;

export type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fit';
  onHide?: () => void;
  onShow?: () => void;
  control: VisibilityControl;
  transparentBackdrop?: boolean;
  onBackdropClick?: () => void;
  anchor?: Anchor;
};

export const Drawer = ({
  className,
  children,
  size = 'md',
  onHide,
  onShow,
  control,
  transparentBackdrop,
  onBackdropClick,
  anchor = 'left',
  ...restProps
}: Props) => {
  useScrollDisable(control.visible);

  const handleBackdropClick = () => {
    control.hide();

    onBackdropClick?.();
  };

  if (!control.visible) return null;

  return ReactDOM.createPortal(
    <div css={[tw`fixed top-0 left-0 z-[10001] w-screen h-screen`]} className='drawer'>
      <div className='drawer-backdrop' css={[tw`w-full h-full`]} onClick={handleBackdropClick}></div>
      <StyledDrawerContent
        className={'drawer-content overflow-auto'}
        style={{ boxShadow: '0px 0px 999px 200px rgba(0, 0, 0, 0.5)' }}
        css={[
          tw`absolute top-0 h-full max-w-full p-5 bg-white border-0 border-solid border-green`,
          size === 'sm' && tw`w-108`,
          size === 'md' && tw`w-175`,
          size === 'lg' && tw`w-225`,
          size === 'xl' && tw`w-320`,
          size === 'fit' && tw`w-fit`,
          anchor === 'left' && tw`left-0`,
          anchor === 'right' && tw`right-0 border-l-[7px]`,
          anchor === 'top' && tw`top-0 left-0`,
          anchor === 'bottom' && tw`bottom-0 left-0`,
          ['top', 'bottom'].includes(anchor) && 'w-full',
          ['left', 'right'].includes(anchor) && 'h-full',
        ]}
        {...restProps}>
        {children}
      </StyledDrawerContent>
    </div>,
    document.body
  );
};
