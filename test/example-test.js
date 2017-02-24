

/* globals describe:true it:true */
import expect from 'expect';

// test example
import { add } from '../src/utils/add';


// 函数测试
describe( '#utils', () => {
  describe( '#add()', () => {
    it( '加法1', () => {
      expect( add( 1, 2 ) ).toEqual( 3 );
    } );
    it( '加法2', () => {
      expect( add( 6, 7 ) ).toEqual( 13 );
    } );
  } );
} );
