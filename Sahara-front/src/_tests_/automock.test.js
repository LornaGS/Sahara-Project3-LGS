// import utils from './utils';
// //This option tells Jest that all imported modules in your tests should be mocked automatically. 
// //All modules used in your tests will have a replacement implementation, keeping the API surface.


// test('if utils mocked automatically', () => {
//   // Public methods of `utils` are now mock functions
//   expect(utils.authorize.mock).toBeTruthy();
//   expect(utils.isAuthorized.mock).toBeTruthy();

//   // You can provide them with your own implementation
//   // or pass the expected return value
//   utils.authorize.mockReturnValue('mocked_token');
//   utils.isAuthorized.mockReturnValue(true);

//   expect(utils.authorize()).toBe('mocked_token');
//   expect(utils.isAuthorized('not_wizard')).toBeTruthy();
// });

// Import the utils module
import utils from './utils';

// Mock the utils module
jest.mock('./utils', () => ({
  authorize: jest.fn(),
  isAuthorized: jest.fn(),
}));

test('if utils mocked automatically', () => {
  // Public methods of `utils` are now mock functions
  expect(utils.authorize.mock).toBeTruthy();
  expect(utils.isAuthorized.mock).toBeTruthy();

  // You can provide them with your own implementation or leave them as mock functions
  utils.authorize.mockImplementation(() => true);
  expect(utils.authorize()).toBe(true);

  utils.isAuthorized.mockImplementation(() => false);
  expect(utils.isAuthorized()).toBe(false);
});
