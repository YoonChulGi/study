import React from 'react';
import { shallow } from 'enzyme';

import Input from '../../03/Input';

describe('<Input>', () => {
  it('renders without crashing', () => {
    expect(() => {
      shallow(<Input name="test_name" />);
    }).not.toThrow();
  });

  it('has one element', () => {
    const wrapper = shallow(<Input name="test_name" />);
    expect(wrapper.length).toEqual(1);
    expect(wrapper).toHaveLength(1);
  });

  it('assigns the prop value and type', () => {
    const expectedValue = '123';
    const wrapper = shallow(<Input name="test_name" value={expectedValue} />);
    expect(wrapper.find('input').prop('value')).toBe(expectedValue);
    const { type, value } = wrapper.find('input').props();
    expect(value).toBe(expectedValue);
    expect(type).toBe('text');
  });

  it('renders errorMessage', () => {
    const wrapper = shallow(<Input name="test_name" />);

    // error 스타일을 포함한 오류 메시지가 존재하는지 검사
    expect(wrapper.find('.error')).toHaveLength(0);
    const expectedErrorMessage = '잘못된 값이 입력되었습니다.';

    // setProps()함수로 errorMessage프로퍼티의 값을 변경
    wrapper.setProps({ errorMessage: expectedErrorMessage });

    expect(wrapper.find('span').prop('className')).toBe('error');

    // errorMessage 프로퍼티가 추가되었기 때문에 error 스타일을 포함한 오류 메시지 1개가 정상적으로 포함된 것을 확인
    expect(wrapper.find('.error')).toHaveLength(1);

    // html()함수를 사용하여 출력된 HTML에서 실제 오류 메시지가 정상적으로 출력되었는지 검증
    expect(wrapper.html()).toContain(expectedErrorMessage);
  });

  it('calls back onChange on input change', () => {
    // jest는 감시함수 (fn())를 제공하여 생성된 함수의 호출을 감시하는 방법을 제공합니다.
    const changeStub = jest.fn();

    // 생성된 감시 함수를 입력 컴포넌트의 onChange 프로퍼티에 할당
    const wrapper = shallow(<Input name="test_name" onChange={changeStub} />);

    // 이벤트 재현 시점을 기준으로 이벤트 실행 이전에는 콜백 함수가 호출되지 않은 상태를
    // expect()함수의 호출 검증 메소드 toHaveBennCalled()로 검증합니다.
    expect(changeStub).not.toHaveBeenCalled();
    const expectedTargetValue = 'updated input';

    // enzyme의 이벤트 재현 메소드를 사용하여 input값이 변경되는 이벤트(onChange)를 재현합니다.
    // 재현을 위해 실제 브라우저에서 전달한 값을 전달해야 합니다.
    // target.value에 값이 전달되므로 객체형으로 가상의 입력값을 전달합니다.
    wrapper.find('input').simulate('change', { target: { value: expectedTargetValue } });

    // fn()함수로 반환된 콜백 함수를 expect() 함수의 호출 검증 메소드
    //(toHaveBeenCalledTimes, toHaveBeenCalledWith)로 호출 횟수와 호출 인자들을 검사합니다.
    expect(changeStub).toHaveBeenCalledTimes(1);
    expect(changeStub).toHaveBeenCalledWith('test_name', expectedTargetValue);
  });
});

describe('contains <Input>', () => {
  it('renders one input', () => {
    const wrapper = shallow(<Input name="test_name" />);
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('label')).toHaveLength(1);
  });
});
