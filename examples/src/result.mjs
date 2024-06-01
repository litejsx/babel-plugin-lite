import { source as _source, componentInstance as _componentInstance, runComponent as _runComponent, destroyComponent as _destroyComponent, element as _element, text as _text, insert as _insert, remove as _remove, append as _append, prop as _prop, spreadAttr as _spreadAttr, attr as _attr, event as _event, style as _style, classe as _classe, expression as _expression, effect as _effect } from "@lite/lite";
import { ref, _createElement } from 'wisejs';
const state = ref(0);
const styles = {
  test: 'name'
};
const styles1 = {
  test: 'name'
};
const fn = function render() {
  return 'render';
};
const Test = () => {
  return function render() {
    const _div = _element("div");
    const _text2 = _text("test");
    return {
      mount(target, anchor) {
        _insert(target, _div, anchor);
        _attr(_div, "name", "name");
        _append(target, _text2);
      },
      destroy() {
        _remove(_div);
      }
    };
  };
};
export default (() => {
  const msg = 'hello';
  const click = () => {
    console.log('clcik');
  };
  const helloHTML = function render() {
    const _div2 = _element("div");
    const _text3 = _text("hello");
    return {
      mount(target, anchor) {
        _insert(target, _div2, anchor);
        _append(target, _text3);
      },
      destroy() {
        _remove(_div2);
      }
    };
  };
  const listHTML = function render() {
    const _div3 = _element("div");
    const _express = _expression([1, 2].map(value => function render() {
      const _div4 = _element("div");
      const _express2 = _expression(value, "render");
      return {
        mount(target, anchor) {
          _insert(target, _div4, anchor);
          _express2.mount(target, anchor);
        },
        destroy() {
          _remove(_div4);
          _express2.destroy();
        }
      };
    }), "render");
    return {
      mount(target, anchor) {
        _insert(target, _div3, anchor);
        _express.mount(target, anchor);
      },
      destroy() {
        _remove(_div3);
        _express.destroy();
      }
    };
  };
  const _render = function render() {
    const _div7 = _element("div");
    const _text4 = _text("child");
    return {
      mount(target, anchor) {
        _insert(target, _div7, anchor);
        _append(target, _text4);
      },
      destroy() {
        _remove(_div7);
      }
    };
  };
  const _render2 = function render() {
    const _div8 = _element("div");
    const _div9 = _element("div");
    const _text5 = _text("child");
    return {
      mount(target, anchor) {
        _insert(target, _div8, anchor);
        _style(_div8, "color: blue;");
        _append(_div8, _div9);
        _append(target, _text5);
      },
      destroy() {
        _remove(_div8);
      }
    };
  };
  return function render() {
    const _div5 = _element("div");
    const _express3 = _expression(state, "render");
    const _div6 = _element("div");
    const _express4 = _expression(msg, "render");
    const _instance = _componentInstance(Test);
    const _input = _element("input");
    const _express5 = _expression(helloHTML, "render");
    const _express6 = _expression(listHTML, "render");
    return {
      mount(target, anchor) {
        _insert(target, _div5, anchor);
        _style(_div5, 'display: block');
        _classe(_div5, styles.test);
        _event(_div5, "onClick", click);
        _spreadAttr(_div5, express);
        _express3.mount(target, anchor);
        _append(_div5, _div6);
        _event(_div6, "onClick", click);
        _express4.mount(target, anchor);
        _runComponent(target, _instance, {
          name: "name",
          onClick: click,
          html: _render,
          children: _render2
        });
        _append(_div5, _input);
        _express5.mount(target, anchor);
        _express6.mount(target, anchor);
      },
      destroy() {
        _remove(_div5);
        _express3.destroy();
        _express4.destroy();
        _destroyComponent(_instance);
        _express5.destroy();
        _express6.destroy();
      }
    };
  };
});