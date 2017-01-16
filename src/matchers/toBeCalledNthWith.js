// Based on jest/packages/jest-matchers/src/spyMatchers.js

const isSpy = spy => spy.calls && typeof spy.calls.count === 'function'
const {equals} = require('jest-matchers/build/jasmine-utils')
const {
  // ensureExpectedIsNumber,
  // ensureNoExpected,
  // EXPECTED_COLOR,
  matcherHint,
  pluralize,
  printExpected,
  printReceived,
  // printWithType,
  RECEIVED_COLOR,
} = require('jest-matcher-utils')
const RECEIVED_NAME = {
  'mock function': 'jest.fn()',
  spy: 'spy',
}
const CALL_PRINT_LIMIT = 3
const LAST_CALL_PRINT_LIMIT = 1

const formatReceivedCallIndex = (calls, index) => {
  if (calls.length) {
    const printedCall = printReceived(calls[index])
    return `But it was called with:\n  ` + printedCall
  } else {
    return `But it was ${RECEIVED_COLOR('not called')}.`
  }
}

const ensureMock = (mockOrSpy, matcherName) => {
  if (
    !mockOrSpy ||
    (mockOrSpy.calls === undefined || mockOrSpy.calls.all === undefined) &&
    mockOrSpy._isMockFunction !== true
  ) {
    throw new Error(
      matcherHint('[.not]' + matcherName, 'jest.fn()', '') + '\n\n' +
      `${RECEIVED_COLOR('jest.fn()')} value must be a mock function or spy.\n` +
      printWithType('Received', mockOrSpy, printReceived),
    )
  }
}

module.exports = (expect) => {
  expect.extend({
    toBeCalledNthWith(received: any, index: number, ...expected: any) {
      const matcherName = 'toBeCalledNthWith'
      ensureMock(received, matcherName)

      const receivedIsSpy = isSpy(received)
      const type = receivedIsSpy ? 'spy' : 'mock function'
      const calls = receivedIsSpy
        ? received.calls.all().map(x => x.args)
        : received.mock.calls
      const pass = equals(calls[index], expected)

      const message = pass
        ? () => matcherHint('.not' + matcherName, RECEIVED_NAME[type]) + '\n\n' +
          `Expected ${type} to not have been called with:\n` +
          `  ${printExpected(expected)}`
        : () => matcherHint(matcherName, RECEIVED_NAME[type]) + '\n\n' +
          `Expected ${type} to have been called with:\n` +
          `  ${printExpected(expected)}\n` +
          formatReceivedCallIndex(calls, index)

      return { message, pass }
    },
  })
}
