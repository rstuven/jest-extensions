# () Jest extensions

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
  expcet(mock).toBeCalledNthWith(0, 'arg1', 'arg2')
  expcet(mock).toBeCalledNthWith(1, 'arg3', 'arg4')
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
