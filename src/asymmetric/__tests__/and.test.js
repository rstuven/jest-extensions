describe('asymmetricMatch', () => {

  it('empty', () => {
    const expectObject = {}
    require('../and')(expectObject)
    const matcher = expectObject.and()
    expect(matcher.asymmetricMatch()).toBe(true)
  })

  it('true && false', () => {
    const expectObject = {}
    require('../and')(expectObject)
    const matcher = expectObject.and(expect.any(String), expect.any(Date))
    expect(matcher.asymmetricMatch(new Date)).toBe(false)
  })

  it('true && true && true', () => {
    const expectObject = {}
    require('../and')(expectObject)
    const matcher = expectObject.and(expect.any(String), expect.anything(), expect.stringMatching(/ing$/))
    expect(matcher.asymmetricMatch('string')).toBe(true)
  })

  it('false && false', () => {
    const expectObject = {}
    require('../and')(expectObject)
    const matcher = expectObject.and(expect.any(Date), expect.any(String))
    expect(matcher.asymmetricMatch({})).toBe(false)
  })

})

describe('jasmineToString', () => {

  it('empty', () => {
    const expectObject = {}
    require('../and')(expectObject)
    const matcher = expectObject.and()
    expect(matcher.jasmineToString()).toBe('<jasmine.and()>')
  })

  it('matchers', () => {
    const expectObject = {}
    require('../and')(expectObject)
    const matcher = expectObject.and(expect.any(String), expect.any(Date))
    expect(matcher.jasmineToString()).toBe('<jasmine.and(<jasmine.any(String)>, <jasmine.any(Date)>)>')
  })

  it('values', () => {
    const expectObject = {}
    require('../and')(expectObject)
    const matcher = expectObject.and('value', { x: 123 })
    expect(matcher.jasmineToString()).toBe('<jasmine.and("value", {"x":123})>')
  })

})
