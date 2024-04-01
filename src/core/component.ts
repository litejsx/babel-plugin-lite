import travese, { NodePath,  } from '@babel/traverse';
import { JSXElement, expressionStatement, file, program } from '@babel/types';
import { getOpeningElementNameString, isNativeTag } from '../utils';

export default function transformComponent(path: NodePath<JSXElement>) {
  const name = getOpeningElementNameString(path.get('openingElement'));
  if (isNativeTag(name)) {

  }
  const ast = file(
    program([expressionStatement(path.node)])
  );

  travese(ast, {
    JSXElement: (path: NodePath<JSXElement>) => {
      // console.log(path.node.openingElement.name.name);
    } 
  })
}