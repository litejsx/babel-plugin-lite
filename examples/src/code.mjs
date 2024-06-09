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
const refStyle = ref(styles.name)

const style2 = {
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
    <div style={'display: block'} class={refStyle.value} onClick={click} {...spreadExpress}>
      {state.name}
      {...spread}
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
