import { createElement as _createElement2 } from "litejs";
import { ref, _createElement } from 'wisejs';
const state = ref(0);
const styles = {
  test: 'name'
};
const styles1 = {
  test: 'name'
};
const Test = () => {
  return _createElement2("div", null, "test");
};
export default (() => {
  const msg = 'hello';
  const click = () => {
    console.log('clcik');
  };
  const helloHTML = _createElement2("div", null, "hello");
  const listHTML = _createElement2("div", null, [1, 2].map(value => _createElement2("div", null, value)));
  return _createElement2("div", {
    class: styles.test,
    onClick: click
  }, [state, _createElement2("div", {
    onClick: click
  }, [" ", msg]), _createElement2(Test), _createElement2("input"), helloHTML, listHTML]);
});