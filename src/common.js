

import 'es5-shim';
import 'es5-shim/es5-sham';
import 'es6-shim';
import 'es6-shim/es6-sham';
import 'console-polyfill';
import 'dva';
import 'react';
import 'react-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';

// 全局设置 locale
moment.locale( 'zh-cn' );
