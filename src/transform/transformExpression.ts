import { NodePath } from '@babel/traverse';
import { JSXElement, JSXFragment, JSXExpressionContainer, JSXSpreadChild, JSXText, identifier, Expression, stringLiteral } from '@babel/types';
import { State } from '../types';
import { StateName, anchorIdentifier } from '../constants';
import transformJSXElement from './transformJSXElement';
import transformChildren from './transformChildren';
import transformJSXElementAttribute from './transformJSXElementAttribute';
import { getTagLiteral, getParentId, setParentId } from '../utils';
import { isNativeTag } from '../utils';
import Render from '../render';

export default function transformExpression(
  path: NodePath<JSXExpressionContainer | JSXSpreadChild>,
  state: State,
  render: Render,
) {
  console.log('++++++')
  const expression = path.get('expression');
debugger
  // expression.traverse()
  render.expression(expression.node as Expression);
  
}
