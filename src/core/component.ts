import travese, { NodePath,  } from '@babel/traverse';
import { JSXElement, expressionStatement, file, program } from '@babel/types';

export default function transformComponent(path: NodePath<JSXElement>) {
  const ast = file(
    program([expressionStatement(path.node)])
  );

  travese(ast, {
    JSXElement: (path: NodePath<JSXElement>) => {
      // console.log(path.node.openingElement.name.name);
    } 
  })
}