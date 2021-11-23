import { AriaAttributes } from 'react';

declare module 'react' {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    css?: any;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      css?: any;
    }
  }
}
