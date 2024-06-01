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

export default function transformJSXRoot(
  path: NodePath<JSXElement | JSXFragment | JSXExpressionContainer | JSXSpreadChild | JSXText>,
  state: State,
  render: Render,
) {

  // JSXElement
  if (path.isJSXElement()) {
    transformJSXElement(path, state, render, { root: true });

    // JSXFragment
  } else if (path.isJSXFragment()) {
    path.get('children').forEach(path => transformJSXRoot(path, state, render));

    // JSXExpressionContainer
  } else if (path.isJSXExpressionContainer()) {
    const expression = path.get('expression');

    // ignore JSXEmptyExpression
    if (!expression.isJSXEmptyExpression()) {
      render.expression(expression.node as Expression);
    }
    
    // JSXSpreadChild
  }  else if (path.isJSXSpreadChild()) {
    const expression = path.get('expression');
    render.expression(expression.node as Expression);

    // JSXText
  } else {
    const str = (path.node as JSXText).value;
    // 过滤 "\n      ..." 字符
    if (!/^\n\s+$/gi.test(str)) {
      render.text({ str: stringLiteral(str), type: 'insert' });
    }
  }
}
