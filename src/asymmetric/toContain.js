
class ToContain {

  constructor(value) {
    this.value = value
  }

  asymmetricMatch(collection) {
    let converted = null
    if (Array.isArray(collection) || typeof collection === 'string') {
      // strings have `indexOf` so we don't need to convert
      // arrays have `indexOf` and we don't want to make a copy
      converted = collection
    } else {
      converted = Array.from(collection)
    }
    // At this point, we're either a string or an Array,
    // which was converted from an array-like structure.
    return converted.indexOf(this.value) != -1
  }

  jasmineToString() {
    return '<jasmine.toContain(' + this.value + ')>'
  }
}

module.exports = (expect) => {
    expect.toContain = (value) => new ToContain(value)
}
