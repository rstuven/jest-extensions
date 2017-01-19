
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
  const ClassMock = defaultOrNot(require.requireMock(module))
  const ClassActual = defaultOrNot(require.requireActual(module))
  const ctorIndex = unmockedMethods.indexOf('constructor')
  function Class() {
    var instance
    if (ctorIndex == -1) {
      instance = new ClassMock(...arguments)
    } else {
      const temp = class { }
      copyPrototype(temp, ClassActual)
      copyPrototype(ClassActual, ClassMock, unmockedMethods)
      instance = new ClassActual(...arguments)
      copyPrototype(ClassActual, temp)
    }
    const props = Object.getOwnPropertyNames(ClassMock.prototype)
    for (let prop of props) {
      if (prop === 'constructor') continue
      if (unmockedMethods.indexOf(prop) === -1) {
        instance[prop] = ClassMock.prototype[prop]
      } else {
        instance[prop] = ClassActual.prototype[prop].bind(instance)
      }
    }
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

function copyPrototype(target, source, exceptions = []) {
  const props = Object.getOwnPropertyNames(source.prototype)
  for (let prop of props) {
    if (prop === 'constructor') continue
    if (exceptions.indexOf(prop) === -1) {
      target.prototype[prop] = source.prototype[prop]
    }
  }
}
