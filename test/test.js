const Swizzler = require('../src/Swizzler')
const assert = require('chai').assert

describe('Swizzler', () => {
  it(`doesn't smork`, () => {
    assert.isFunction( Swizzler )
    let swizzler = new Swizzler('A:A')
    assert.isObject( swizzler )

    let input = new Buffer( 16 )
    // console.log( input )

    let result = swizzler.swizzle( input )

    assert( Buffer.isBuffer( result ) )
  })

  it(`actually swizzles`, () => {
    let swizzler = new Swizzler('AB:A')
    let input = Buffer.from( [ 1, 2, 3, 4])
    let result = swizzler.swizzle( input )
    assert.equal( result.length, 2 )
    assert.equal( result[0], 1 )
    assert.equal( result[1], 3 )
  })

  it(`expands`, () => {
    let swizzler = new Swizzler('RGB:RGB101')
    let input = Buffer.from( [ 1, 2, 3 ] )
    let result = swizzler.swizzle( input )

    console.log( swizzler )
    assert.equal( result.length, 6 )
    assert.equal( result[5], 255 )
    assert.equal( result[4], 0 )
  })


})
