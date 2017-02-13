

import Mock from 'mockjs';

export const getUser = ( req, res ) => {
  res.type('text');
  res.json(
    Mock.mock( {
      state: {
        'return': 'true',
        info: ''
      },
      'data|10-30': [ {
        'id|+1': 1
      } ]
    } )
  );
};

