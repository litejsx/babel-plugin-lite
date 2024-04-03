import { NodePath } from '@babel/traverse';
import { JSXElement, callExpression, identifier, stringLiteral } from '@babel/types';
import { State } from '../types';
import { getTagName } from '../utils';
import transformChildren from './transformChildren';

export default function transformJSXElement(path: NodePath<JSXElement>, state: State) {
  const children = transformChildren(path.get('children'), state);
  const tag = getTagName(path.get('openingElement'));
  return callExpression(
    identifier('createElement'),
    [
      stringLiteral(tag),
    ],
  )
}