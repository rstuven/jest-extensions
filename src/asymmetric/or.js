
class Or {

  constructor(matches) {
    this.matches = matches
  }

  asymmetricMatch(other) {
    return this.matches.reduce((acc, cur) => acc || cur.asymmetricMatch(other), false)
  }

  jasmineToString() {
    return '<jasmine.or(' + this.matches.map(x => {
      if (typeof x.jasmineToString === 'function') {
        return x.jasmineToString()
      }
      return JSON.stringify(x)
    }).join(', ') + ')>'
  }

}

module.exports = (expect) => {
  expect.or = (...matches) => new Or(matches)
}

