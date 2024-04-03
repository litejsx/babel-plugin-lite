import { NodePath } from '@babel/traverse';
import { JSXElement, JSXExpressionContainer, JSXFragment, JSXSpreadChild, JSXText } from '@babel/types';
import { State } from '../types';

export default function transformChildren(path: NodePath<JSXElement | JSXExpressionContainer | JSXFragment | JSXSpreadChild | JSXText>[], state: State) {

}