import { source as _source, buildComponent as _buildComponent, element as _element, text as _text, insert as _insert, remove as _remove, append as _append, prop as _prop, spreadAttr as _spreadAttr, attr as _attr, event as _event, style as _style, classe as _classe, expression as _expression, effect as _effect } from "@lite/lite";
import { ref, _createElement } from 'wisejs';
import styles from './styles.module.scss';
export default (() => {
  const state = ref({
    name: ''
  });
  const state1 = ref({
    name: ''
  });
  const state2 = ref({
    name: ''
  });
  const state3 = ref({
    name: ''
  });
  const click = () => {
    console.log(state1, state2, state3);
  };
  const _hoist_render = function render() {
    const _div = _element("div");
    const _express = _expression(state);
    const _div2 = _element("div");
    const _text2 = _text("test");
    return {
      mount(target, anchor) {
        _insert(target, _div, anchor);
        _classe(_div, state.name);
        _express.mount(target, anchor);
        _append(_div, _div2);
        _append(target, _text2);
      },
      update(target, anchor) {},
      destroy() {
        _remove(_div);
        _express.destroy();
      }
    };
  };
  return _hoist_render;
});

// const state = ref(0);

// const style2 = {
//   test: 'name',
// }
// const styles1 = {
//   test: 'name',
// }
// const fn = function render() {
//   return 'render';
// }
// const Test = () => {
//   return (<div name="name">test</div>)
// }

// export default () => {
//   const msg = 'hello';
//   const click = () => {
//     console.log('clcik');
//   }
//   const helloHTML = <div>hello</div>
//   const listHTML = <div>{
//     [1,2].map((value) => (<div>{value}</div>))
//   }</div>
//   return (
//     <div style={'display: block'} class={styles.test} onClick={click} {...express}>
//       {state}
//       <div onClick={click}>{msg}</div>
//       <Test name="name" onClick={click} html={<div>child</div>}>
//         <div style="color: blue;">
//           <div>child</div>
//         </div>
//       </Test>
//       <input />
//       {helloHTML}
//       {listHTML}
//     </div>
//   )
// }