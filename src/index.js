/*入口js */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import storeUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";

//读取local中到user到内存中
const user = storeUtils.getUser();
memoryUtils.user = user;

//将App组件中渲染到div上
ReactDOM.render(<App />, document.getElementById('root'));