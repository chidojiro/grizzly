import React from 'react';

const isRef = <T = Element>(target: any): target is React.RefObject<T> => !!target?.current;

const isArray = <T>(target: any): target is T[] => Array.isArray(target);

const isObject = (data: any) => {
  return typeof data === 'object' && data !== null && !Array.isArray(data);
};

const AssertUtils = { isRef, isArray, isObject };

export default AssertUtils;
