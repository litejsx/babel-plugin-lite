import travese, { NodePath,  } from '@babel/traverse';
import { JSXElement, expressionStatement, file, program } from '@babel/types';
import { getOpeningElementNameString, isNativeTag } from '../utils';
import transformComponent from './component';

export default function transformTemplate(path: NodePath<JSXElement>) {
  const componentList = [];
  
  const ast = file(
    program([expressionStatement(path.node)])
  );

  travese(ast, {
    JSXElement: (path: NodePath<JSXElement>) => {
      const name = getOpeningElementNameString(path.get('openingElement'));
      if (!isNativeTag(name)) {
        transformComponent(path);
      }
    } 
  })
  
}