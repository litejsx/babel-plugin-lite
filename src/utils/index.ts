
import { stringCurrying } from './stringCurrying';
import { HTML_TAGS, SVG_TAGS } from '../constants';

export const isHTMLTag = stringCurrying(HTML_TAGS, true);
export const isSVGTag = stringCurrying(SVG_TAGS, true);
export const isNativeTag = (name: string) => isHTMLTag(name) || isSVGTag(name);