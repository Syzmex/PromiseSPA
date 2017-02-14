

import expect from 'expect';

// test example
import add from '../src/utils/add';


// 函数测试
describe( '#utils', () => {
  describe( '#add()', () => {
    it( '加法', () => {
      expect( add( 1, 2 ) ).toEqual( 3 );
    } );
  } );
} );
