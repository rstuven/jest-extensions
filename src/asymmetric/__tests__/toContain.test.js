describe('asymmetricMatch', () => {

  it('is true for Array', () => {
    const expectObject = {}
    require('../toContain')(expectObject)
    const matcher = expectObject.toContain(5)
    expect(matcher.asymmetricMatch([4, 5, 6])).toBe(true)
  })

  it('is true for String', () => {
    const expectObject = {}
    require('../toContain')(expectObject)
    const matcher = expectObject.toContain('b')
    expect(matcher.asymmetricMatch('abc')).toBe(true)
  })

  it('is true for Array-like', () => {
    (function () {
      const expectObject = {}
      require('../toContain')(expectObject)
      const matcher = expectObject.toContain(5)
      expect(matcher.asymmetricMatch(arguments)).toBe(true)
    })(4, 5, 6)
  })

  it('is false for Array', () => {
    const expectObject = {}
    require('../toContain')(expectObject)
    const matcher = expectObject.toContain(5)
    expect(matcher.asymmetricMatch([4, 6])).toBe(false)
  })

  it('is false for String', () => {
    const expectObject = {}
    require('../toContain')(expectObject)
    const matcher = expectObject.toContain('b')
    expect(matcher.asymmetricMatch('ac')).toBe(false)
  })

  it('is false for Array-like', () => {
    (function () {
      const expectObject = {}
      require('../toContain')(expectObject)
      const matcher = expectObject.toContain(5)
      expect(matcher.asymmetricMatch(arguments)).toBe(false)
    })(4, 6)
  })

})

describe('jasmineToString', () => {

  it('renders', () => {
    const expectObject = {}
    require('../toContain')(expectObject)
    const matcher = expectObject.toContain(3)
    expect(matcher.jasmineToString([4, 5, 6])).toBe('<jasmine.toContain(3)>')
  })

})
