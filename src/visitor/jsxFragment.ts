import { NodePath,  } from '@babel/traverse';
import { JSXFragment } from '@babel/types';

export default function JSXFragment(path: NodePath<JSXFragment>) {
  console.log('+++++JSXFragment')
}