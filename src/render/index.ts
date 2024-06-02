import { Identifier, identifier, blockStatement, Statement, returnStatement, 
  objectExpression, objectMethod, functionExpression, variableDeclaration, 
  variableDeclarator, callExpression, stringLiteral, expressionStatement, 
  importDeclaration, importSpecifier, ImportDeclaration, ImportSpecifier, 
  Expression, StringLiteral, memberExpression, CallExpression, ObjectExpression } from "@babel/types"
import { NodePath } from "@babel/traverse";
import { State } from "../types";
import CallExpressionName from "./helperName";
import { StateName, targetIdentifier, anchorIdentifier } from "../constants";

export interface RenderOption {
  nodePath: NodePath;
  state: State;
}

export default class Render {
  private nodePath: NodePath;
  private pathState: State;
  private renderName: Identifier;
  private callExpressionNameMap = {} as Record<CallExpressionName, Identifier>;
  private renderStatement: Statement[] = [];
  private mounteStatement: Statement[] = [];
  private updateStatement: Statement[] = [];
  private destroyStatement: Statement[] = [];

  constructor(options: RenderOption) {
    const { nodePath, state } = options || {};
    this.nodePath = nodePath;
    this.pathState = state;
    this.renderName = identifier('render');

    this.initHelperName();
  }

  private initHelperName() {
    const importHelperState = this.pathState.get<ImportDeclaration>(StateName.importHelper);
    if (importHelperState) {
      (importHelperState.specifiers as ImportSpecifier[]).forEach((specifier) => {
        this.callExpressionNameMap[(specifier.imported as Identifier).name as CallExpressionName] = specifier.local;
      });

      return;
    }

    const importHelper = importDeclaration(
      (Object.keys(CallExpressionName) as CallExpressionName[]).map((key: CallExpressionName) => {
        const localName = this.nodePath.scope.generateUidIdentifier(key);
        this.callExpressionNameMap[key] = localName;
        return importSpecifier(localName, identifier(key));
      }),
      stringLiteral(CallExpressionName.source),
    );

    this.pathState.set<ImportDeclaration>(StateName.importHelper, importHelper);
  }

  public hoist(express: Expression) {
    const rootPath = this.pathState.get(StateName.jsxRootPath);
    const id = rootPath.scope.generateUidIdentifier('hoist_render');
    const el = variableDeclaration(
      "const",
      [
        variableDeclarator(
          id,
          express,
        )
      ]
    );
    rootPath?.insertBefore(el);
    return id;
  }

  public attr(options: {
    target: Identifier;
    name: string;
    value: Expression;
  }) {
    const { target, name, value } = options;
    let node: CallExpression;
    if (name === 'style') {
      node = callExpression(
        this.callExpressionNameMap[CallExpressionName.style],
        [target, value],
      );
    } else if (name === 'class') {
      node = callExpression(
        this.callExpressionNameMap[CallExpressionName.classe],
        [target, value],
      );
    } else if (/^on[^a-z]/.test(name)) {
      node = callExpression(
        this.callExpressionNameMap[CallExpressionName.event],
        [target, stringLiteral(name), value],
      );
    } else {
      node = callExpression(
        this.callExpressionNameMap[CallExpressionName.attr],
        [target, stringLiteral(name), value],
      );
    }

    this.mounteStatement.push(
      expressionStatement(node),
    );
  }

  public spreadAttr(options: {
    target: Identifier;
    express: Expression;
  }) {
    const { target, express } = options;
    this.mounteStatement.push(
      expressionStatement(
        callExpression(
          this.callExpressionNameMap[CallExpressionName.spreadAttr],
          [target, express],
        )
      ),
    );
  }

  public element(options: {
    tag: string;
    type: 'insert' | 'append';
    target?: Identifier;
    anchor?: Identifier;
  }) {
    const {
      tag,
      type = CallExpressionName.insert,
      target = targetIdentifier,
      anchor,
    } = options;
    const id = this.nodePath.scope.generateUidIdentifier(tag);
    this.renderStatement.push(
      variableDeclaration(
        'const',
        [
          variableDeclarator(
            id,
            callExpression(
              this.callExpressionNameMap[CallExpressionName.element],
              [stringLiteral(tag)],
            )
          )
        ]
      )
    );
    this.insertOrAppendCallExpression({ id, type, target, anchor });
    
    if (type === 'insert') {
      this.removeCallExpression(id);
    }

    return id;
  }

  public text(options: {
    str: StringLiteral,
    type: 'insert' | 'append',
    target?: Identifier,
    anchor?: Identifier,
  }) {
    const {
      str,
      type = CallExpressionName.insert,
      target = targetIdentifier,
      anchor,
    } = options;
    const id = this.nodePath.scope.generateUidIdentifier('text');
    this.renderStatement.push(
      variableDeclaration(
        'const',
        [
          variableDeclarator(
            id,
            callExpression(
              this.callExpressionNameMap[CallExpressionName.text],
              [str],
            )
          )
        ]
      )
    );
    this.insertOrAppendCallExpression({ id, type, target, anchor });
    
    if (type === 'insert') {
      this.removeCallExpression(id);
    }
    
    return id;
  }

  public component(tag: string, props: ObjectExpression) {
    const id = this.nodePath.scope.generateUidIdentifier('component');
    this.renderStatement.push(
      variableDeclaration(
        'const',
        [
          variableDeclarator(
            id,
            callExpression(
              this.callExpressionNameMap[CallExpressionName.buildComponent],
              [identifier(tag), props],
            )
          )
        ]
      )
    );
    this.mounteStatement.push(
      expressionStatement(
        callExpression(
          memberExpression(id, identifier('mount')),
          [targetIdentifier, anchorIdentifier],
        )
      )
    );
    this.destroyStatement.push(
      expressionStatement(
        callExpression(
          memberExpression(id, identifier('destroy')),
          [],
        )
      )
    );
    return id;
  }

  public expression(express: Expression) {
    const id = this.nodePath.scope.generateUidIdentifier('express');
    this.renderStatement.push(
      variableDeclaration(
        'const',
        [
          variableDeclarator(
            id,
            callExpression(
              this.callExpressionNameMap[CallExpressionName.expression],
              [express],
            )
          )
        ]
      )
    );
    this.mounteStatement.push(
      expressionStatement(
        callExpression(
          memberExpression(id, identifier('mount')),
          [targetIdentifier, anchorIdentifier],
        )
      )
    );
    this.destroyStatement.push(
      expressionStatement(
        callExpression(
          memberExpression(id, identifier('destroy')),
          [],
        )
      )
    );
    return id;
  }

  public removeCallExpression(id: Identifier) {
    this.destroyStatement.push(
      expressionStatement(
        callExpression(
          this.callExpressionNameMap[CallExpressionName.remove],
          [id],
        )
      )
    );
  }

  public insertOrAppendCallExpression(options: {
    id: Identifier,
    type: 'insert' | 'append',
    target: Identifier,
    anchor?: Identifier,
  }) {
    const { id, type, target, anchor } = options;
    const argumentList: Identifier[] = [target, id];
    if (anchor) {
      argumentList.push(anchor);
    }
    this.mounteStatement.push(
      expressionStatement(
        callExpression(
          this.callExpressionNameMap[type],
          argumentList,
        )
      )
    );
  }

  public addRenderStatement(state: Statement) {
    this.renderStatement.push(state);
  }

  public addMounteStatement(state: Statement) {
    this.mounteStatement.push(state);
  }

  public addDestroyStatement(state: Statement) {
    this.destroyStatement.push(state);
  }

  public generateFunctionDeclaration() {
    return functionExpression(this.renderName, [], blockStatement([
      ...this.renderStatement,
      returnStatement(
        objectExpression([
          objectMethod(
            'method', 
            identifier('mount'), 
            [
              targetIdentifier,
              anchorIdentifier,
            ], 
            blockStatement(this.mounteStatement)
          ),
          objectMethod(
            'method', 
            identifier('update'), 
            [
              targetIdentifier,
              anchorIdentifier,
            ], 
            blockStatement(this.updateStatement)
          ),
          objectMethod(
            'method', 
            identifier('destroy'), 
            [], 
            blockStatement(this.destroyStatement)
          ),
        ])
      )
    ]))
  }
}