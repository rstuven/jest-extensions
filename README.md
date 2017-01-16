
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
