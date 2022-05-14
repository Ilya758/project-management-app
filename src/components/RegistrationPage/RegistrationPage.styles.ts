import styled from 'styled-components';

export const StyledLoginPage = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 2px 2px 6px 0px rgb(0 0 0 / 30%);
  padding: 20px;
  & .container {
    form-size: 32px;
  }
  & .title {
    font-size: 24px;
    font-weight: 800;
  }
  & .form__row {
    margin-top: 20px;
  }
  & .form__row-fotter {
    display: flex;
    justify-content: center;
  }
  & .form__row-input {
    margin-top: 5px;
  }
  & .form__input {
    width: 100%;
  }
  & .form__input:hover {
    border: 2px solid black;
  }
  & .form__submit {
    justify-self: center;
  }
`;
