// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.3';

// aphrodite의 DOM함수 호출 과정을 중지시킵니다. 
import * as Aphrodite from 'aphrodite'; 
import * as AphroditeNoImportant from 'aphrodite/no-important';

Aphrodite.StyleSheetTestUtils.suppressStyleInjection();
AphroditeNoImportant.StyleSheetTestUtils.suppressStyleInjection();

configure({ adapter: new Adapter() });

afterEach(()=>{
    console.error.mockClear(); 
});
beforeEach(()=>{
    jest.spyOn(global.console,'error').mockImplementation((e)=>{ 
        throw new Error(e); 
    });
});