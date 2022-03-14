import { createContext, useContext, useState } from 'react'

const activeCountryNameContext = createContext()
const activeCountryNameSetContext = createContext()
export const ActiveCountryNameProvider = ({ children }) => {
  const [activeCountryName, setActiveCountryName] = useState(null)
  return (
    <activeCountryNameContext.Provider value={activeCountryName}>
      <activeCountryNameSetContext.Provider value={setActiveCountryName}>
        {children}
      </activeCountryNameSetContext.Provider>
    </activeCountryNameContext.Provider>
  )
}

export const useActiveCountryName = () => useContext(activeCountryNameContext)
export const useSetActiveCountryName = () => useContext(activeCountryNameSetContext)
