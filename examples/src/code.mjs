import { ref, _createElement } from 'wisejs';

const state = ref(0);

const styles = {
  test: 'name',
}
const styles1 = {
  test: 'name',
}
const fn = function render() {
  return 'render';
}
const Test = () => {
  return (<div name="name">test</div>)
}

export default () => {
  const msg = 'hello';
  const click = () => {
    console.log('clcik');
  }
  const helloHTML = <div>hello</div>
  const listHTML = <div>{
    [1,2].map((value) => (<div>{value}</div>))
  }</div>
  return (
    <div style={'display: block'} class={styles.test} onClick={click} {...express}>
      {state}
      <div onClick={click}>{msg}</div>
      <Test name="name" onClick={click} html={<div>child</div>}>
        <div style="color: blue;">
          <div>child</div>
        </div>
      </Test>
      <input />
      {helloHTML}
      {listHTML}
    </div>
  )
}
