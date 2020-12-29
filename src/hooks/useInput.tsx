import { useState } from 'react'

export const useInput = (initialValue: string) => {
  const [value, set] = useState<string>(initialValue)
  
  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => set(e.target.value)
  }
}