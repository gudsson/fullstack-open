import { useState } from 'react'

export const useCountry = (type) => {
  const [value, setValue] = userState([])
  
  const onChange = (event) => {
    setValue(event.target.value)
  }

  return (
    type,
    value,
    onChange
  )
}