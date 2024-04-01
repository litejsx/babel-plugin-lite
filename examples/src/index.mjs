import path from 'path';
import fs from 'fs';
import { transformSync, parseSync } from '@babel/core';
import generator from '@babel/generator'
import { traverse } from '@babel/core';
import { types } from '@babel/core';
const code = fs.readFileSync(`${process.cwd()}/src/code.mjs`, { encoding: 'utf-8' });
import babelPluginLite from '../../dist/index.js';

const result = transformSync(code, {
  plugins: [babelPluginLite],
});

fs.writeFileSync(`${process.cwd()}/src/result.mjs`, result.code);
