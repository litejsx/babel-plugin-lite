import { NodePath,  } from '@babel/traverse';
import { JSXFragment } from '@babel/types';
import { State } from '../types';
import { StateName } from '../constants';
import { transformChildren } from '../transform';

export default function JSXFragment(path: NodePath<JSXFragment>, state: State) {
  state.set(StateName.hasJSX, true);
  return transformChildren(path.get('children'), state);
}