import { NodePath } from '@babel/core';
import { Expression, SpreadElement, JSXText, identifier, Identifier, ExpressionStatement, BlockStatement, Statement, JSXAttribute, JSXSpreadAttribute } from '@babel/types';
import { targetIdentifier } from '../constants';

export function getParentId(path: NodePath<JSXText | Expression | SpreadElement | JSXAttribute | JSXSpreadAttribute>) {
  let parent = path.parentPath;
  while(parent) {
    if (parent?.state?.parentId) {
      return parent.state.parentId;
    }

    if (parent.parentPath) {
      parent = parent.parentPath;
    } else {
      return targetIdentifier;
    }
  }
}

export function setParentId(path?: NodePath<JSXText | Expression | SpreadElement | ExpressionStatement | BlockStatement | Statement>, id: Identifier = targetIdentifier) {
  if (path) {
    if (!path.state) {
      path.state = {};
    }
  
    path.state.parentId = id;
  }
}