import { NodePath,  } from '@babel/traverse';
import { JSXElement } from '@babel/types';

export default function JSXElement(path: NodePath<JSXElement>) {
  console.log('+++++JSXElement')
}
