import { NodePath,  } from '@babel/traverse';
import { Program, jSXEmptyExpression, jSXElement, jSXOpeningElement, jSXIdentifier, jSXAttribute, jSXExpressionContainer, expressionStatement } from '@babel/types';
import { State } from '../types';
import { StateName, HelperName } from '../constants';
import { importHelper } from '../utils';

export default {
  enter(path: NodePath<Program>, state: State) {
    state.set(HelperName.createElement, path.scope.generateUidIdentifier(HelperName.createElement));
  },
  exit(path: NodePath<Program>, state: State) {
    if (state.get(StateName.hasJSX)) {
      importHelper(path, state);
    }

    // const test = jSXElement(
    //   jSXOpeningElement(
    //     jSXIdentifier('div'),
    //     [
    //       jSXAttribute(jSXIdentifier('id'), jSXExpressionContainer(jSXEmptyExpression())),
    //     ],
    //   ),
    //   null,
    //   [],
    // )

    // path.node.body.push(expressionStatement(test))
  }
}