import { mockModuleClassInstance } from '../index.js'

describe('mockModuleClassInstance', () => {

  function testModule(moduleSuffix) {
    return async () => {
      const modulePath = __dirname + `/fixtures/MyClass.${moduleSuffix}.js`
      const sut = mockModuleClassInstance(modulePath, 'getNowData')
      sut.now.mockImplementationOnce(() => new Date('2017-01-16'))
      sut.getFromApi.mockImplementation(() => ({ data: 'value' }))

      const result = await sut.getNowData()

      expect(sut.getFromApi).toBeCalledWith(new Date('2017-01-16'))
      expect(result).toEqual({ data: 'value' })
    }
  }

  it('commonjs', testModule('commonjs'))
  it('default', testModule('default'))

})
