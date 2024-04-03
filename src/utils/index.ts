
import { stringCurrying } from './stringCurrying';
import { HTML_TAGS, SVG_TAGS } from '../constants';
import { JSXOpeningElement, isJSXIdentifier, isJSXMemberExpression, isJSXNamespacedName } from '@babel/types';
import { NodePath } from '@babel/traverse';

export const isHTMLTag = stringCurrying(HTML_TAGS, true);
export const isSVGTag = stringCurrying(SVG_TAGS, true);
export const isNativeTag = (name: string) => isHTMLTag(name) || isSVGTag(name);

export function getTagName(path: NodePath<JSXOpeningElement>) {
  const namePath = path.get('name');
  return namePath.getSource();
}