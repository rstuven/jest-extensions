describe('asymmetricMatch', () => {

  it('is invalid', () => {
    const expectObject = {}
    require('../toHaveLength')(expectObject)
    const matcher = expectObject.toHaveLength(3)
    expect(() => matcher.asymmetricMatch('blah')).toThrowError("You must provide an array to toHaveLength, not 'blah'.")
  })

  it('is true', () => {
    const expectObject = {}
    require('../toHaveLength')(expectObject)
    const matcher = expectObject.toHaveLength(3)
    expect(matcher.asymmetricMatch([4,5,6])).toBe(true)
  })

  it('is false', () => {
    const expectObject = {}
    require('../toHaveLength')(expectObject)
    const matcher = expectObject.toHaveLength(3)
    expect(matcher.asymmetricMatch([4,5])).toBe(false)
  })

})

describe('jasmineToString', () => {

  it('renders', () => {
    const expectObject = {}
    require('../toHaveLength')(expectObject)
    const matcher = expectObject.toHaveLength(3)
    expect(matcher.jasmineToString([4,5,6])).toBe('<jasmine.toHaveLength(3)>')
  })

})
