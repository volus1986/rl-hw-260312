import { useEffect, useState } from 'react'

// hook
export const useHook = (initial: string) => {
  const [value, setValue] = useState(initial)

  useEffect(() => {
    // side effect
  }, [value])

  // return
  return { value, setValue }
}
