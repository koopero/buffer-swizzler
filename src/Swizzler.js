class Swizzler {
  constructor( config ) {

    let inStride = 6
    let outStride = 3

    this.swizzle = function ( input ) {
      // TODO: Assert input is a buffer

      let outLength = Math.floor( input.length / inStride ) * outStride

      let output = new Buffer( outLength )
      return output
    }
  }
}

module.exports = Swizzler
