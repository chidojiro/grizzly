import React from 'react';
import ReactDOM from 'react-dom';
import { VisibilityControl, VisibilityProps } from 'hooks';
import { AssertUtils, ClassNameUtils } from 'utils';
import Container from './Container';
import { Children, ClassName } from 'types';

type VerticalAlignment = 'top' | 'bottom';
type HorizontalAlignment = 'left' | 'right';
type Alignment = VerticalAlignment | HorizontalAlignment;
type PrimaryAlignment = Alignment;
type SecondaryAlignment = Alignment | 'center';

export type Placement =
  | `${VerticalAlignment}-${HorizontalAlignment | 'center'}`
  | `${HorizontalAlignment}-${VerticalAlignment | 'center'}`
  | 'top'
  | 'bottom';

export type Props = Children &
  ClassName &
  VisibilityProps & {
    widthFitTrigger?: boolean;
    trigger: React.ReactElement;
    placement: Placement | Placement[];
    control: VisibilityControl;
    plainBoxModel?: boolean;
  };

export const Dropdown = ({
  children,
  className,
  widthFitTrigger,
  trigger,
  placement,
  control,
  ...restProps
}: Props) => {
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle((trigger as any).ref, () => triggerRef.current);

  const clonedTrigger = React.cloneElement(trigger, { ref: triggerRef });

  const hasEnoughSpace = (alignment: Alignment, pxOffset = 0) => {
    const dropdown = dropdownRef.current;

    if (!dropdown) return false;

    const {
      top: triggerTop,
      left: triggerLeft,
      height: triggerHeight,
      width: triggerWidth,
    } = triggerRef.current!.getBoundingClientRect();

    const { height: dropdownHeight, width: dropdownWidth } = dropdown.getBoundingClientRect();

    const { clientHeight: viewHeight, clientWidth: viewWidth } = document.documentElement;

    switch (alignment) {
      case 'top':
        return triggerTop >= dropdownHeight + pxOffset;
      case 'right':
        return viewWidth >= triggerLeft + dropdownWidth + pxOffset;
      case 'bottom':
        return viewHeight >= triggerTop + triggerHeight + dropdownHeight + pxOffset;
      case 'left':
        return triggerLeft + triggerWidth >= dropdownWidth + pxOffset;
      default:
        return false;
    }
  };

  const getDropdownCoordsWithAlignOf = React.useCallback((placement: Placement) => {
    const trigger = triggerRef.current;
    const dropdown = dropdownRef.current;

    if (!trigger || !dropdown) return { top: 0, left: 0 };

    const [primaryAlignment, secondaryAlignment] = placement.split('-') as [PrimaryAlignment, SecondaryAlignment];

    const {
      top: triggerTop,
      left: triggerLeft,
      height: triggerHeight,
      width: triggerWidth,
    } = trigger.getBoundingClientRect();
    const { height: dropdownHeight, width: dropdownWidth } = dropdown.getBoundingClientRect();

    let _top = 0;
    let _left = 0;

    switch (primaryAlignment) {
      case 'top':
        _top = triggerTop - dropdownHeight;
        break;
      case 'bottom':
        _top = triggerTop + triggerHeight;
        break;
      case 'left':
        _left = triggerLeft - dropdownWidth;
        break;
      case 'right':
        _left = triggerLeft + triggerWidth;
        break;
      default:
        break;
    }

    switch (secondaryAlignment) {
      case 'top':
        _top = triggerTop;
        break;
      case 'bottom':
        _top = triggerTop + triggerHeight;
        break;
      case 'left':
        _left = triggerLeft;
        break;
      case 'right':
        _left = triggerLeft + triggerWidth - dropdownWidth;
        break;
      case 'center':
        if (['bottom', 'top'].includes(primaryAlignment)) {
          _left = triggerLeft - Math.round((dropdownWidth - triggerWidth) / 2);
        } else {
          _top = triggerTop + Math.round(triggerHeight / 2);
        }
        break;
      default:
        _left = 0;
        break;
    }

    return { top: _top, left: _left };
  }, []);

  const placementRef = React.useRef(AssertUtils.isArray(placement) ? placement[0] : placement);
  const positionDropdown = React.useCallback(() => {
    let _placement: Placement;

    // find the most suitable placement
    // first come, first serve
    if (AssertUtils.isArray<Placement>(placement)) {
      placement.forEach(value => {
        if (_placement) return;

        const [primaryAlignment, secondaryAlignment] = value.split('-') as [PrimaryAlignment, SecondaryAlignment];

        if (!hasEnoughSpace(primaryAlignment)) return;
        if (secondaryAlignment !== 'center' && !hasEnoughSpace(secondaryAlignment)) return;

        _placement = value;
      });

      _placement = _placement! || placement[0];
    } else {
      _placement = placement;
    }

    const dropdown = dropdownRef.current;
    const trigger = triggerRef.current;

    if (!dropdown || !trigger) return;

    const dropdownCoords = getDropdownCoordsWithAlignOf(_placement);

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    dropdown?.style.setProperty('left', dropdownCoords.left + 'px');
    dropdown?.style.setProperty('top', dropdownCoords.top + scrollTop + 'px');

    placementRef.current = _placement;
  }, [getDropdownCoordsWithAlignOf, placement]);

  React.useLayoutEffect(() => {
    if (control.visible) {
      positionDropdown();
    }
  }, [positionDropdown, control.visible]);

  React.useEffect(() => {
    window.addEventListener('resize', positionDropdown);

    return () => {
      window.removeEventListener('resize', positionDropdown);
    };
  }, [positionDropdown]);

  React.useLayoutEffect(() => {
    const dropdown = dropdownRef.current;
    const trigger = triggerRef.current;

    if (!trigger) return;

    const { width: selectContainerWidth } = trigger?.getBoundingClientRect() as DOMRect;

    if (!widthFitTrigger) {
      dropdown?.style.setProperty('min-width', selectContainerWidth + 'px');
    } else if (!secondaryAlignment) {
      dropdown?.style.setProperty('min-width', '100%');
    }
  }, [triggerRef, widthFitTrigger]);

  const [primaryAlignment, secondaryAlignment] = placementRef.current.split('-') as [
    PrimaryAlignment,
    SecondaryAlignment
  ];

  return (
    <>
      {clonedTrigger}
      {!!control.visible &&
        ReactDOM.createPortal(
          <Container
            triggerRef={triggerRef}
            control={control}
            className={ClassNameUtils.withTwReplaceable('rounded, overflow-')(
              'gl-dropdown w-fit rounded absolute overflow-auto z-[1300]',
              {
                'mt-4': primaryAlignment === 'bottom',
                'mr-4': primaryAlignment === 'left',
                'md-4': primaryAlignment === 'top',
                'ml-4': primaryAlignment === 'right',
              },
              {
                'mt-4': secondaryAlignment === 'bottom',
                'mr-4': secondaryAlignment === 'left',
                'md-4': secondaryAlignment === 'top',
                'ml-4': secondaryAlignment === 'right',
              },
              className
            )}
            {...restProps}
            ref={dropdownRef}>
            {children}
          </Container>,
          document.body
        )}
    </>
  );
};
