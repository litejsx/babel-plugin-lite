import { NodePath } from '@babel/traverse';
import { JSXElement } from '@babel/types';
import { transformJSXElement } from '../transform';
import { State } from '../types';
import { StateProperty } from '../constants';

export default function JSXElement(path: NodePath<JSXElement>, state: State) {
  state.set(StateProperty.hasJSX, true);
  const node = transformJSXElement(path, state);
  path.replaceWith(node);
}
