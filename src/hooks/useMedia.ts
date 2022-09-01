import { useEffect, useState } from "react"

const useMedia = <T>(queries: string[], values: T[], defaultValue: T) => {
  //array contendo a lista de media queries
  const mediaQuerieList = queries.map((q) => window.matchMedia(q))

  //função que vai retornar o valor baseado na media query
  const getValue = () => {
    const index = mediaQuerieList.findIndex((mql) => mql.matches)
    return values?.[index] || defaultValue
  }

  //state e função setter
  const [value, setValue] = useState<T>(getValue)

  useEffect(() => {
    const handler = () => setValue(getValue)

    mediaQuerieList.forEach((mql) => mql.addListener(handler))

    return () => mediaQuerieList.forEach((mql) => mql.removeListener(handler))
  })

  return value
}

export default useMedia