import styled from 'styled-components'

const StyledPicker = styled.select`
  background-color: black;
  color: white;
  -webkit-font-smoothing: antialiased;

  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  font-weight: 600;
  appearance: none;
  -webkit-appearance: none;
  border-radius: 0;
  padding: 0.25em 0.5em;
  border: none;
  border-bottom: 3px solid #2F80ED;
  margin: 0 0.35rem;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`

export default StyledPicker
