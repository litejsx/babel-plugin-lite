import { ref, createComponent } from 'wisejs';

const state = ref(0);

const styles = {
  test: 'name',
}
const styles1 = {
  test: 'name',
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
    <div class={styles.test}>
      {state}
      <div onClick={click}>{msg}</div>
      <Test />
      {helloHTML}
      {listHTML}
    </div>
  )
}