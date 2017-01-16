jest.mock('jest-matchers/build/spyMatchers')

describe('toBeCalled*', () => {
  let matchersObject
  const {toHaveBeenCalledTimes} = require(('jest-matchers/build/spyMatchers'))

  beforeEach(() => {
    jest.resetAllMocks()
    const expectObject = {
      extend(mo) { matchersObject = mo }
    }
    require('../toBeCalledTimes')(expectObject)
  })

  describe('toBeCalledTimes', () => {

    it('delegates', () => {
      matchersObject.toBeCalledTimes('received', 'times')
      expect(toHaveBeenCalledTimes).toBeCalledWith('received', 'times')
    })

    it('returns', () => {
      toHaveBeenCalledTimes.mockImplementation(() => 'result')
      const result = matchersObject.toBeCalledTimes('received', 'times')
      expect(result).toBe('result')
    })

  })

  describe('toBeCalledOnce', () => {

    it('delegates', () => {
      matchersObject.toBeCalledOnce('received')
      expect(toHaveBeenCalledTimes).toBeCalledWith('received', 1)
    })

    it('returns', () => {
      toHaveBeenCalledTimes.mockImplementation(() => 'result')
      const result = matchersObject.toBeCalledOnce('received')
      expect(result).toBe('result')
    })

  })

})
