import SyntaxJSX from '@babel/plugin-syntax-jsx';
import travese, { NodePath,  } from '@babel/traverse';
import { JSXElement, expressionStatement, file, program, jsxElement, jsxOpeningElement, jsxIdentifier, jsxNamespacedName } from '@babel/types';
import { transformTemplate } from './core';


export default () => {
  return {
    name: 'babel-plugin-rebirth',
    inherits: SyntaxJSX,
    visitor: {
      JSXElement(path: NodePath<JSXElement>) {
        console.log("JSXElement!");
        // transformTemplate(path);
      },
      JSXFragment(path: any) {
        console.log("JSXFragment!");
      },
      Program: {
        enter(path: any) {
          console.log("enter!");
        },
        exit(path: any) {
          console.log("exit!", path.node.body.length);
          path.node.body.push(
            jsxElement(
              jsxOpeningElement(
                jsxNamespacedName(jsxIdentifier('ttt'), jsxIdentifier('ttt2')), []
              ),
              null,
              [],
            )
          )
        }
      }
    }
  };
};