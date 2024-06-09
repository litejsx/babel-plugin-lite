import { source as _source, buildComponent as _buildComponent, element as _element, text as _text, insert as _insert, remove as _remove, append as _append, prop as _prop, spreadAttr as _spreadAttr, attr as _attr, event as _event, style as _style, classe as _classe, expression as _expression, effect as _effect } from "@lite/lite";
import { ref, _createElement, test as localTest } from 'wisejs';
import styles from './styles.module.scss';

// export default ({ param }) => {
//   const state = ref({
//     name: ''
//   });
//   const state1 = ref({
//     name: ''
//   });
//   const state2 = ref({
//     name: ''
//   });
//   const state3 = ref({
//     name: ''
//   });
//   const click = () => {
//     console.log(state1, state2, state3, param, localTest)
//   }

//   return (
//     <div class={state.name}>
//       {state.name}
//       {localTest}
//       <div>test</div>
//     </div>
//   )
// }

const state = ref(0);
const refStyle = ref(styles.name);
const style2 = {
  test: 'name'
};
const styles1 = {
  test: 'name'
};
const fn = function render() {
  return 'render';
};
const Test = () => {
  const _hoist_render = function render() {
    const _div = _element("div");
    const _text2 = _text("test");
    return {
      mount(target, anchor) {
        _insert(target, _div, anchor);
        _attr(_div, "name", "name");
        _append(target, _text2);
      },
      update(ref) {},
      destroy() {
        _remove(_div);
      }
    };
  };
  return _hoist_render;
};
export default (() => {
  const msg = 'hello';
  const click = () => {
    console.log('clcik');
  };
  const _hoist_render2 = function render() {
    const _div2 = _element("div");
    const _text3 = _text("hello");
    return {
      mount(target, anchor) {
        _insert(target, _div2, anchor);
        _append(target, _text3);
      },
      update(ref) {},
      destroy() {
        _remove(_div2);
      }
    };
  };
  const helloHTML = _hoist_render2;
  const _hoist_render3 = function render() {
    const _div3 = _element("div");
    const _hoist_render7 = function render() {
      const _div9 = _element("div");
      const _express7 = _expression(value);
      return {
        mount(target, anchor) {
          _insert(target, _div9, anchor);
          _express7.mount(target, _express7);
        },
        update(ref) {},
        destroy() {
          _remove(_div9);
          _express7.destroy();
        }
      };
    };
    const _express = _expression([1, 2].map(value => _hoist_render7));
    return {
      mount(target, anchor) {
        _insert(target, _div3, anchor);
        _express.mount(target, _express);
      },
      update(ref) {},
      destroy() {
        _remove(_div3);
        _express.destroy();
      }
    };
  };
  const listHTML = _hoist_render3;
  const _hoist_render4 = function render() {
    const _div6 = _element("div");
    const _text4 = _text("child");
    return {
      mount(target, anchor) {
        _insert(target, _div6, anchor);
        _append(target, _text4);
      },
      update(ref) {},
      destroy() {
        _remove(_div6);
      }
    };
  };
  const _hoist_render5 = function render() {
    const _div7 = _element("div");
    const _div8 = _element("div");
    const _text5 = _text("child");
    return {
      mount(target, anchor) {
        _insert(target, _div7, anchor);
        _style(_div7, "color: blue;");
        _append(_div7, _div8);
        _append(target, _text5);
      },
      update(ref) {},
      destroy() {
        _remove(_div7);
      }
    };
  };
  const _hoist_render6 = function render() {
    const _div4 = _element("div");
    const _express2 = _expression(state.name);
    const _express3 = _expression(spread);
    const _div5 = _element("div");
    const _express4 = _expression(msg);
    const _component = _buildComponent(Test, {
      name: "name",
      onClick: click,
      html: _hoist_render4,
      children: _hoist_render5
    });
    const _input = _element("input");
    const _express5 = _expression(helloHTML);
    const _express6 = _expression(listHTML);
    return {
      mount(target, anchor) {
        _insert(target, _div4, anchor);
        _style(_div4, 'display: block');
        _classe(_div4, refStyle.value);
        _event(_div4, "onClick", click);
        _spreadAttr(_div4, spreadExpress);
        _express2.mount(target, _express2);
        _express3.mount(target, _express3);
        _append(_div4, _div5);
        _event(_div5, "onClick", click);
        _express4.mount(target, _express4);
        _component.mount(target, anchor);
        _append(_div4, _input);
        _express5.mount(target, _express5);
        _express6.mount(target, _express6);
      },
      update(ref) {
        if ([refStyle].includes(ref)) _classe(ref);
        if ([state].includes(ref)) _express2.mount(ref);
        _component.mount(ref);
      },
      destroy() {
        _remove(_div4);
        _express2.destroy();
        _express3.destroy();
        _express4.destroy();
        _component.destroy();
        _express5.destroy();
        _express6.destroy();
      }
    };
  };
  return _hoist_render6;
});