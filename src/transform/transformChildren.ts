import { NodePath } from '@babel/traverse';
import {
  SpreadElement,
  spreadElement,
  CallExpression,
  arrayExpression,
  JSXElement,
  JSXExpressionContainer,
  JSXFragment,
  JSXSpreadChild,
  JSXText,
  Expression,
  identifier,
  stringLiteral
} from '@babel/types';
import { State } from '../types';
import transformJSXElement from './transformJSXElement';

export default function transformChildren(
  path: NodePath<JSXElement | JSXExpressionContainer | JSXFragment | JSXSpreadChild | JSXText>[],
  state: State)
{
  const childrenList: (CallExpression | Expression | SpreadElement)[] = [];
  path.forEach((children) => {
     // JSXElement
    if (children.isJSXElement()) {
      childrenList.push(transformJSXElement(children, state));
      
      // JSXFragment
    } else if (children.isJSXFragment()) {
      childrenList.push(transformChildren(children.get('children'), state));

      // JSXExpressionContainer
    } else if (children.isJSXExpressionContainer()) {
      const expression = children.get('expression');

      // ignore JSXEmptyExpression
      if (!expression.isJSXEmptyExpression()) {
        childrenList.push(expression.node as Expression);
      }
      
      // JSXSpreadChild
    }  else if (children.isJSXSpreadChild()) {
      const expression = children.get('expression');
      childrenList.push(spreadElement(expression.node));

      // JSXText
    } else {
      const str = (children.node as JSXText).value;
      // 过滤 "\n      ..." 字符
      if (!/^\n\s+$/gi.test(str)) {
        childrenList.push(stringLiteral(str));
      }
    }
  })
 
  return arrayExpression(childrenList);
}