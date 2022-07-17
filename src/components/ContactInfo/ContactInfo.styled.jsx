import styled from 'styled-components';
import { Input, Button } from '../ContactForm/ContactForm.styled';

export const InfoForm = styled.form`
  min-width: 350px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  padding: 20px;
  background-color: ${props => props.theme.bgColor};

  & p {
    color: ${({ theme }) => theme.bgElementColor};
    font-size: 12px;
  }

  & p::before {
    display: inline;
    content: '⚠  ';
  }

  & > button {
    margin-top: 20px;
  }
`;
export const InfoLabel = styled.label`
  display: block;
  font-weight: ${props => props.theme.mainTextFontWeight};
  color: ${props => props.theme.textColor};
  text-align: center;

  & + & {
    margin-top: 20px;
  }
`;
export const InfoInput = styled(Input)``;
export const InfoButton = styled(Button)``;
