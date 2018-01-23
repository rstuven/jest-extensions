# Jest extensions

## Usage

`some-test.js`:
```js
const jestExtensions = require('jest-extensions')
jestExtensions.extend(expect)

test('success', () => {
  const mock = jest.fn()
  mock('arg1', 'arg2')
  mock('arg3', 'arg4')
  expect(mock).toBeCalledTimes(2)
  expect(mock).toBeCalledNthWith(0, 'arg1', 'arg2')
  expect(mock).toBeCalledNthWith(1, 'arg3', 'arg4')
})

test('fail', () => {
  const mock = jest.fn()
  expect(mock).toBeCalledOnce()
})
```

## Assertions

* `toBeCalledTimes(number)` is an alias for `toHaveBeenCalledTimes(number)`
* `toBeCalledOnce()` is an alias for `toHaveBeenCalledTimes(1)`
* `toBeCalledNthWith(index, arg1, arg2, ...)` is equivalent to:

```
expect(mockedFunction.mock.calls[index][0]).toEqual(arg1)
expect(mockedFunction.mock.calls[index][1]).toEqual(arg2)
// ...
```

## Asymmetric matchers

* `expect.and(matcher1, matcher2, ...)` - logical AND operator over many matchers.
* `expect.or(matcher1, matcher2, ...)` - logical OR operator over many matchers.
* `expect.toContain(<value>)` - checks that the value is contained in the `actual` collection.
* `expect.toHaveLength(<number>)` - checks that the `actual` has a .length property and it is set to a certain numeric value.

## Utilities

* `mockModuleClass` gets a new class with all methods mocked, except those specified in arguments. For example:

`./src/MyClass.js`:
```js
export default class MyClass {
  
  now() {
    return new Date
  }

  async getFromApi(date) {
    // asynchronously request external API
  }

  async getNowData() {
    return await this.getFromApi(this.now())
  }

}
```

`./src/__tests__/MyClass.test.js`:
```js
import { mockModuleClass } from 'jest-extensions'

function mockMyClass(...unmockedMethods) {
  return mockModuleClass(__dirname + '/../MyClass.js', ...unmockedMethods)
}

describe('MyClass', () => {

  describe('getNowData', () => {

    it('succeeds', async () => {
      const sut = new mockMyClass('getNowData')()

      // All other methods are already mocked.
      // Even if mock implementations aren't defined,
      // no accidental side effect evaluations or state changes can occur.
      sut.now.mockImplementationOnce(() => new Date('2017-01-16'))
      sut.getFromApi.mockImplementation(() => ({ data: 'value' }))

      const result = await sut.getNowData()

      expect(sut.getFromApi).toBeCalledWith(new Date('2017-01-16'))
      expect(result).toEqual({ data: 'value' })
    })

  })

})
```
