import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Text from '../../../doit-ui/Text';
import Spacing from '../../../doit-ui/Spacing';
import Input from '../../../doit-ui/Input';
import Button from '../../../doit-ui/Button';
import InlineList from '../../../doit-ui/InlineList';
import Form from '../../../doit-ui/Form';
import { Consumer as Modal } from '../../../doit-ui/Modal/context'; // 모달 소비자의 closeModal() 함수를 사용
import Api from '../../Api';

class TradeCoinPage extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values, closeModal) {
    const { name, code } = this.props;
    const formValues = {
      ...values,
      code,
      name,
    };
    Api.post('/transactions', formValues).then(() => closeModal()); // axios의 post() 함수를 사용하여 서버에 POST를 호출하여 거래 내역(transaction)을 생성합니다. 거래 요청을 마친 후 자동으로 모달창이 닫히도록 합니다.
  }
  render() {
    const { name, price, type } = this.props;
    const typeName = type === 'sell' ? '판매' : '구매'; // type에 따라 판매와 구매 화면을 구분
    return (
      <Modal>
        {(
          { closeModal }, // 모달 소비자의 closeModal() 함수를 사용합니다.
        ) => (
          <Form
            onSubmit={(values) => this.handleSubmit(values, closeModal)} // Form 컴포넌트의 onSubmit 프로퍼티로 전달한 handleSubmit() 콜백 함수의 인자로 values와 closeModal() 함수를 전달합니다.
            initValues={{ currentPrice: price }}
          >
            <Form.Consumer>
              {({ onChange, values }) => (
                <Spacing horizontal={4} vertical={8}>
                  <Text xlarge bold>
                    {name} {typeName}
                  </Text>
                  <Spacing bottom={2}>
                    <Input
                      name="currentPrice"
                      label="금액"
                      value={values['currentPrice']}
                      onChange={onChange}
                    />
                  </Spacing>
                  <Spacing bottom={2}>
                    <Input
                      name="amount"
                      label="수량"
                      value={values['amount']}
                      onChange={onChange}
                    />
                  </Spacing>
                  <InlineList spacingBetween={1}>
                    <Button primary>{typeName}</Button>
                    <Button onPress={closeModal}>취소</Button>
                    {/*거래화면에서 [취소]를 누르면 closeModal() 함수를 호출하여 모달을 닫습니다.*/}
                  </InlineList>
                </Spacing>
              )}
            </Form.Consumer>
          </Form>
        )}
      </Modal>
    );
  }
}

TradeCoinPage.propTypes = {
  createTransaction: PropTypes.func,
};

export default TradeCoinPage;
