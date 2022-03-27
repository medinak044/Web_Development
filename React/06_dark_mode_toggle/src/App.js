import './App.css';
import { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme, GlobalStyles } from './components/styles/themes'


const StyledApp = styled.div`
color: ${props => props.theme.fontColor}
`

function App() {
  const [theme, setTheme] = useState(`light`)

  const themeToggler = () => {
    theme === `light` ? setTheme(`dark`) : setTheme(`light`)
  }

  return (
    <ThemeProvider theme={theme === `light` ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>Hello
        <button onClick={themeToggler}>Change theme</button>
      </StyledApp>
    </ThemeProvider>
  )
}

export default App;
