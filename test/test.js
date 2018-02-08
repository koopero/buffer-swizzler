const Swizzler = require('../src/Swizzler')
const assert = require('chai').assert

describe('Swizzler', () => {
  it(`doesn't smork`, () => {
    assert.isFunction( Swizzler )
    let swizzler = new Swizzler()
    assert.isObject( swizzler )

    let input = new Buffer( 16 )
    // console.log( input )

    let result = swizzler.swizzle( input )

    assert( Buffer.isBuffer( result ) )


  })
})
