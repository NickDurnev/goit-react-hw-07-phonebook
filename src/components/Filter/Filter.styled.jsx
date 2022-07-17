import styled from 'styled-components';

export const Label = styled.label`
  font-weight: ${props => props.theme.mainTextFontWeight};
  & > input {
    margin-left: 10px;
    margin-bottom: 20px;
    width: 200px;
    height: 30px;
    padding: 5px;
    font-size: 15px;
    font-weight: 500;
    color: ${props => props.theme.textColor};
    border-color: ${props => props.theme.bgElementColor};
    background-color: ${props => props.theme.bgColor};
    transition: border-color ${props => props.theme.hoverTransition}
      ${props => props.theme.hoverTimeFunction};

    &:hover,
    &:focus {
      border-color: ${props => props.theme.bgElementHoverColor};
    }
  }
`;
