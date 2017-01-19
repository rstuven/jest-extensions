const jestExtensions = require.requireActual('../..')

test('index exports', () => {
  expect(jestExtensions.extend).toBeDefined()
  expect(jestExtensions.mockModuleClass).toBeDefined()
})
