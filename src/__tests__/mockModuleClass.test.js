import { mockModuleClass } from '../index.js'

describe('mockModuleClass', () => {

  beforeEach(() => {
    jest.resetAllMocks()
  })

  function testModule(moduleSuffix) {
    return async () => {
      const modulePath = __dirname + `/fixtures/MyClass.${moduleSuffix}.js`
      const sut = new mockModuleClass(modulePath, 'getNowData')()

      expect(sut.getNowData.mock).toBeUndefined()
      expect(sut.getFromApi.mock).toBeDefined()
      expect(sut.now.mock).toBeDefined()

      sut.now.mockImplementationOnce(() => new Date('2017-01-16'))
      sut.getFromApi.mockImplementation(() => ({ data: 'value' }))

      const result = await sut.getNowData()

      expect(sut.getFromApi).toBeCalledWith(new Date('2017-01-16'))
      expect(result).toEqual({ data: 'value' })
    }
  }

  it('commonjs', testModule('commonjs'))
  it('default', testModule('default'))

  it('mocks constructor', async () => {
    const modulePath = __dirname + `/fixtures/MyClass.commonjs.js`
    const sut = new mockModuleClass(modulePath)()
    expect(sut.getNowData.mock).toBeDefined()
    expect(sut.getFromApi.mock).toBeDefined()
    expect(sut.now.mock).toBeDefined()
    expect(sut.now).not.toBeCalled()
  })

  it('unmocks constructor', async () => {
    const modulePath = __dirname + `/fixtures/MyClass.commonjs.js`
    const sut = new mockModuleClass(modulePath, 'constructor')(3, 2, 1)
    expect(sut.getNowData.mock).toBeDefined()
    expect(sut.getFromApi.mock).toBeDefined()
    expect(sut.now.mock).toBeDefined()
    expect(sut.now).toBeCalledWith(3, 2, 1)
  })

  it('unmocks constructor and other', async () => {
    const modulePath = __dirname + `/fixtures/MyClass.commonjs.js`
    const sut = new mockModuleClass(modulePath, 'constructor', 'getNowData')()
    expect(sut.getNowData.mock).toBeUndefined()
    expect(sut.getFromApi.mock).toBeDefined()
    expect(sut.now.mock).toBeDefined()
    expect(sut.now).toBeCalled()
  })

})
