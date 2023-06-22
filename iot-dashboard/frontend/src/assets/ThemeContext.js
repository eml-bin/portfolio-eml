import React, { useState } from 'react'

const ThemeContext = React.createContext({
  color: null,
})

export default ThemeContext

export function ThemeProvider (props) {
  const [color] = useState('default')

  return (
    <ThemeContext.Provider
      value={{ color }}
    >
      {props.children}
    </ThemeContext.Provider>
  )
}
