import { useCallback, useState } from "react"

// passando parâmetro booleano valor default false
const useToggle = (initialState: boolean = false): [boolean, () => void] => {
  // inicializando o state
  const [state, setState] = useState<boolean>(initialState)
  //definindo função de momoização para o valor do state
  const toggle = useCallback((): void => setState((state) => !state), [])

  return [state, toggle]
}

export default useToggle