import React from 'react';
import ReactDOM from 'react-dom';
import Affix from './components/affix';
import Button from './components/button';
import Alert from './components/alert';



// function camelCase(name) {
//   return name.charAt(0).toUpperCase() +
//     name.slice(1).replace(/-(\w)/g, (m, n) => {
//       return n.toUpperCase();
//     });
// }

// const req = require.context('./components', true, /^\.\/[^_][\w-]+\/(style\/)?index\.jsx?$/);

// console.log(req);



ReactDOM.render(
  <Alert message="成功提示1123123的文案" type="success" />,
  document.getElementById('content'));