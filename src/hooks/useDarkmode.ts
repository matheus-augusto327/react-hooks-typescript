import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import useMedia from "./useMedia";

function useDarkmode() {
  const [enabledState, setEnabledState] = useLocalStorage<boolean>(
    "dark-mode-enabled",
    false
  )

  const preferDarkmode = usePreferDarkmode()

  const enabled = enabledState ?? preferDarkmode

  useEffect(() => {
    const className = "dark-mode"
    const element = window.document.body;
    if (enabled) {
      element.classList.add(className)
    } else {
      element.classList.remove(className)
    }
  }, [enabled])

  return [enabled, setEnabledState]
}

function usePreferDarkmode() {
  return useMedia<boolean>(["(prefers-color-scheme: dark"], [true], false)
}

export default useDarkmode