import { BabelFile } from '@babel/core';
import { StateProperty } from '../constants';

export type State = {
  get: (name: StateProperty) => any;
  set: (name: StateProperty, value: any) => any;
  opts: Record<string, any>;
  file: BabelFile;
};