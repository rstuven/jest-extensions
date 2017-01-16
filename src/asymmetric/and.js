
class And {

  constructor(matches) {
    this.matches = matches
  }

  asymmetricMatch(other) {
    return this.matches.reduce((acc, cur) => acc && cur.asymmetricMatch(other), true)
  }

  jasmineToString() {
    return '<jasmine.and(' + this.matches.map(x => {
      if (typeof x.jasmineToString === 'function') {
        return x.jasmineToString()
      }
      return JSON.stringify(x)
    }).join(', ') + ')>'
  }

}

module.exports = (expect) => {
  expect.and = (...matches) => new And(matches)
}

