import { NodePath,  } from '@babel/traverse';
import { Program } from '@babel/types';
import { State } from '../types';
import { StateProperty } from '../constants';

export default {
  enter(path: NodePath<Program>, state: State) {
    console.log("enter!");
  },
  exit(path: NodePath<Program>, state: State) {
    console.log("exit!", state.get(StateProperty.hasJSX));
  }
}