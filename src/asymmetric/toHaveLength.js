
class ToHaveLength {

  constructor(length) {
    this.length = length
  }

  asymmetricMatch(other) {
    var className = Object.prototype.toString.call(other)
    if (className !== '[object Array]') { throw new Error('You must provide an array to toHaveLength, not \'' + other + '\'.') }
    return other.length === this.length
  }

  jasmineToString() {
    return '<jasmine.toHaveLength(' + this.length + ')>'
  }
}

module.exports = (expect) => {
  expect.toHaveLength = (length) => new ToHaveLength(length)
}
