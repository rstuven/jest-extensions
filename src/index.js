
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

// Gets a new class with all methods mocked,
// except those specified in arguments
export function mockModuleClass(module, ...unmockedMethods: string[]): Object {
  const ctorIndex = unmockedMethods.indexOf('constructor')
  function Class() {
    const ClassMock = defaultOrNot(require.requireMock(module))
    const ClassActual = defaultOrNot(require.requireActual(module))
    var instance
    const mocks = createMocks(ClassActual.prototype)
    if (ctorIndex == -1) {
      instance = new ClassMock(...arguments)
      copyProps(instance, ClassActual.prototype)
    } else {
      const temp = {}
      copyProps(temp, ClassActual.prototype)
      copyProps(ClassActual.prototype, mocks, unmockedMethods)
      instance = new ClassActual(...arguments)
      copyProps(ClassActual.prototype, temp)
    }
    copyProps(instance, mocks, unmockedMethods)
    return instance
  }
  return Class
}

function defaultOrNot(module) {
  if (module.__esModule && module.hasOwnProperty('default')) {
    return module.default
  }
  return module
}

function copyProps(target, source, exceptions = []) {
  const props = Object.getOwnPropertyNames(source)
  for (let prop of props) {
    if (prop === 'constructor') continue
    if (exceptions.indexOf(prop) === -1) {
      target[prop] = source[prop]
    }
  }
}

function createMocks(source) {
  const target = {}
  const props = Object.getOwnPropertyNames(source)
  for (let prop of props) {
    target[prop] = jest.fn()
  }
  return target
}
