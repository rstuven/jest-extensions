describe('asymmetricMatch', () => {

  it('empty', () => {
    const expectObject = {}
    require('../or')(expectObject)
    const matcher = expectObject.or()
    expect(matcher.asymmetricMatch()).toBe(false)
  })

  it('true || false', () => {
    const expectObject = {}
    require('../or')(expectObject)
    const matcher = expectObject.or(expect.any(String), expect.any(Date))
    expect(matcher.asymmetricMatch(new Date)).toBe(true)
  })

  it('false || false || false', () => {
    const expectObject = {}
    require('../or')(expectObject)
    const matcher = expectObject.or(expect.any(String), expect.any(Date), expect.stringMatching(/ing$/))
    expect(matcher.asymmetricMatch({})).toBe(false)
  })

  it('true || true', () => {
    const expectObject = {}
    require('../or')(expectObject)
    const matcher = expectObject.or(expect.anything(), expect.any(String))
    expect(matcher.asymmetricMatch('abc')).toBe(true)
  })

})

describe('jasmineToString', () => {

  it('empty', () => {
    const expectObject = {}
    require('../or')(expectObject)
    const matcher = expectObject.or()
    expect(matcher.jasmineToString()).toBe('<jasmine.or()>')
  })

  it('matchers', () => {
    const expectObject = {}
    require('../or')(expectObject)
    const matcher = expectObject.or(expect.any(String), expect.any(Date))
    expect(matcher.jasmineToString()).toBe('<jasmine.or(<jasmine.any(String)>, <jasmine.any(Date)>)>')
  })

  it('values', () => {
    const expectObject = {}
    require('../or')(expectObject)
    const matcher = expectObject.or('value', { x: 123 })
    expect(matcher.jasmineToString()).toBe('<jasmine.or("value", {"x":123})>')
  })

})
