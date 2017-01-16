
function defaultOrNot(module) {
  if (module.__esModule && module.hasOwnProperty('default')) {
    return module.default
  }
  return module
}

// Gets a new class instance with all methods mocked,
// except those specified in arguments
export function mockModuleClassInstance(module: string, ...unmockedMethods: string[]): Object {
  const ClassMock = defaultOrNot(require.requireMock(module))
  const ClassActual = defaultOrNot(require.requireActual(module)).prototype
  const api = new ClassMock()
  unmockedMethods.forEach((method) => {
    api[method] = ClassActual[method].bind(api)
  })
  return api
}

export function extend(expect) {
  [
    './matchers/toBeCalledNthWith',
    './matchers/toBeCalledTimes',
    './asymmetric/and',
    './asymmetric/toContain',
    './asymmetric/toHaveLength',
  ].forEach((module) => {
    require(module)(expect)
  })
}
