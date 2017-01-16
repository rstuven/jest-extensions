
describe('toBeCalledNthWith', () => {
  let matchersObject

  beforeEach(() => {
    jest.resetAllMocks()
    const expectObject = {
      extend(mo) { matchersObject = mo }
    }
    require('../toBeCalledNthWith')(expectObject)
  })

  it('pass: true', () => {
    const mock = jest.fn(function name() {})
    mock('call1', 'callA')
    mock('call2', 'callB')
    const result1 = matchersObject.toBeCalledNthWith(mock, 0, 'call1', 'callA')
    const result2 = matchersObject.toBeCalledNthWith(mock, 1, 'call2', 'callB')
    expect(result1.pass).toBe(true)
    expect(result2.pass).toBe(true)
  })

  it('pass: false', () => {
    const mock = jest.fn(function name() {})
    mock('call1', 'callA')
    mock('call2', 'callB')
    const result = matchersObject.toBeCalledNthWith(mock, 1, 'call0', 'callX')
    expect(result.pass).toBe(false)
    expect(result.message()).toMatchSnapshot()
  })

})
