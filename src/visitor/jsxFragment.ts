import { NodePath,  } from '@babel/traverse';
import { JSXFragment } from '@babel/types';
import { State } from '../types';
import { StateProperty } from '../constants';

export default function JSXFragment(path: NodePath<JSXFragment>, state: State) {
  state.set(StateProperty.hasJSX, true);
  console.log('+++++JSXFragment')
}