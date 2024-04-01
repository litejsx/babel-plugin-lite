import { NodePath,  } from '@babel/traverse';
import { Program } from '@babel/types';


export default {
  enter(path: NodePath<Program>) {
    console.log("enter!");
  },
  exit(path: NodePath<Program>) {
    console.log("enter!");
  }
}