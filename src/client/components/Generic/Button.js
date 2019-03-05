import styled from 'styled-components'

const Button = styled.button`
  padding: 0.25em 0.75em;
  cursor: pointer;
  
  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 0.1em solid ${props => props.theme.main};

  transition: 100ms ease box-shadow;

  &:hover {
    box-shadow: 2px 2px 0 ${props => props.theme.shadow}
  }
`

Button.defaultProps = {
  theme: {
    main: 'black',
    shadow: 'gray',
  },
}

export default Button
