import { useOnClickOutside, VisibilityControl } from 'hooks';
import React from 'react';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  control: VisibilityControl;
  widthFitTrigger?: boolean;
  triggerRef: React.RefObject<any>;
};

const Container = React.forwardRef<HTMLDivElement, Props>(
  ({ control, widthFitTrigger, triggerRef, ...restProps }, ref) => {
    const ownRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => ownRef.current!, []);

    React.useLayoutEffect(() => {
      const dropdown = ownRef.current;
      const trigger = triggerRef.current;

      const { width: triggerWidth } = trigger?.getBoundingClientRect() as DOMRect;

      dropdown?.style.setProperty('min-width', triggerWidth + 'px');

      if (widthFitTrigger) {
        dropdown?.style.setProperty('width', triggerWidth + 'px', 'important');
      }
    }, [triggerRef, widthFitTrigger]);

    useOnClickOutside(ownRef, () => {
      control.hide();
    });

    return <div {...restProps} ref={ownRef}></div>;
  }
);

export default Container;
