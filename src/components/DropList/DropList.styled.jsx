import styled from 'styled-components';

export const List = styled.ul`
  position: absolute;
  top: 55px;
  right: 30px;
  width: 150px;
  padding: 10px;
  background-color: ${props => props.theme.listItemBcgColor};

  &.drop-enter {
    opacity: 0;
    transform: translateY(-100px);
  }

  &.drop-enter-active {
    transform: translateY(0px);
    opacity: 1;
    transition: all ${props => props.theme.animationDuration}
      ${props => props.theme.animationTimeFunction};
  }

  &.drop-exit {
    opacity: 1;
    transform: translateY(0px);
  }

  &.drop-exit-active {
    opacity: 0;
    transform: translateY(-100px);
    transition: all ${props => props.theme.animationDuration}
      ${props => props.theme.animationTimeFunction};
  }

  & > li + li {
    margin-top: 10px;
  }
`;

export default List;
