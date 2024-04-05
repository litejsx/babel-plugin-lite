import { NodePath } from '@babel/traverse';
import {
  nullLiteral,
  JSXAttribute,
  JSXSpreadAttribute,
  objectProperty,
  ObjectProperty,
  identifier,
  JSXExpressionContainer,
  StringLiteral,
  Expression,
  SpreadElement,
  spreadElement,
  objectExpression,
} from '@babel/types';
import { State } from '../types';
import { getTagLiteral } from '../utils';
import transformChildren from './transformChildren';
import { HelperName } from '../constants';
import transformJSXElement from './transformJSXElement';

export default function transformProps(path: NodePath<JSXAttribute | JSXSpreadAttribute>[], state: State) {
  // 返回 null
  if (!path.length) {
    return nullLiteral();
  }

  const properties: (ObjectProperty | SpreadElement)[] = [];

  path.forEach((attribute) => {
    // JSXAttribute
    if (attribute.isJSXAttribute()) {
      const nameLiteral = attribute.get('name').getSource();
      const value = attribute.get('value');

      // JSXElement
      if (value.isJSXElement()) {
        properties.push(objectProperty(
          identifier(nameLiteral),
          transformJSXElement(value, state),
        ));

        // JSXFragment
      } else if (value.isJSXFragment()) {
        properties.push(objectProperty(
          identifier(nameLiteral),
          transformChildren(value.get('children'), state),
        ));

        // JSXExpressionContainer
      } else if (value.isJSXExpressionContainer()) {
        const expression = value.get('expression');

        // ignore JSXEmptyExpression
        if (expression.isExpression()) {
          properties.push(objectProperty(
            identifier(nameLiteral),
            expression.node,
          ));
        }
        
        // StringLiteral
      } else if (value.isStringLiteral()) {
        properties.push(objectProperty(
          identifier(nameLiteral),
          value.node,
        ));
      }

      // JSXSpreadAttribute
    } else {
      properties.push(spreadElement((attribute.node as JSXSpreadAttribute).argument));
    }
  });

  return objectExpression(properties);
}