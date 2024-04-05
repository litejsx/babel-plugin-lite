import { NodePath } from '@babel/traverse';
import { isNullLiteral, JSXElement, callExpression, Expression, SpreadElement, ArgumentPlaceholder, JSXNamespacedName, stringLiteral, identifier } from '@babel/types';
import { State } from '../types';
import { getTagLiteral, isNativeTag } from '../utils';
import transformChildren from './transformChildren';
import transformProps from './transformProps';
import { HelperName } from '../constants';

export default function transformJSXElement(path: NodePath<JSXElement>, state: State) {
  const children = transformChildren(path.get('children'), state);
  const props = transformProps(path.get('openingElement').get('attributes'), state);
  const tag = getTagLiteral(path.get('openingElement'));
  const argumentList: (Expression | SpreadElement | ArgumentPlaceholder | JSXNamespacedName)[] = [
    isNativeTag(tag) ? stringLiteral(tag) : identifier(tag),
  ];

  if (!isNullLiteral(props) || children.elements.length) {
    argumentList.push(props);
  }

  if (children.elements.length) {
    if (children.elements.length === 1) {
      children.elements[0] && argumentList.push(children.elements[0]);
    } else {
      argumentList.push(children)
    }
  }
  return callExpression(
    state.get(HelperName.createElement),
    argumentList,
  )
}