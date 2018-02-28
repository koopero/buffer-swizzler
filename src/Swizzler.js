class Swizzler {
  constructor( config ) {

    if ( 'string' == typeof config ) {
      this.configureIOString( config )
    } else {
      throw new Error('Invalid configuration.')
    }

    // let inStride = 6
    // let outStride = 3

    // this.swizzle = function ( input ) {
    //   // TODO: Assert input is a buffer


    // }
  }

  swizzle( input ) {
    let outLength = Math.floor( input.length / this.inStride ) * this.outStride

    let output = new Buffer( outLength )

    
    let inIndex = 0 
    for ( let outIndex = 0; outIndex < outLength; outIndex += this.outStride ) {
      for ( let outOffset = 0; outOffset < this.outStride; outOffset ++ ) {
        let map = this.outMap[outOffset]
        if ( map != -1 ) 
          output[outIndex+outOffset] = input[inIndex+map]
        else 
          output[outIndex+outOffset] = this.outDefault[outOffset]
      }

      inIndex += this.inStride
    }


    return output
  }

  swizzleCopy( input, output, length ) {

  }

  configureIOString( str ) {
    let split = str.split(':')
    if ( split.length != 2 || !split[0] || !split[1] )
      throw new Error(`String configuration must be in format 'XX:XX'`)

    let [ inStr, outStr ] = split
    
    this.inStride = inStr.length 
    this.outStride = outStr.length
    this.outMap = new Array( this.outStride )
    this.outDefault = new Buffer( this.outStride )
    
    for ( let i = 0 ; i < this.outStride; i ++ ) {
      let char = outStr[i]
      let found = this.outMap[i] = inStr.indexOf( char )
      if ( found == -1 ) {
        switch( char ) {
          case '0': this.outDefault[i] = 0;   break
          case '1': this.outDefault[i] = 255; break
          default: throw new Error(`Output '${char}' has no match in input '${inStr}' and no default value.`)
        }
      }
    }


  }
}

module.exports = Swizzler
