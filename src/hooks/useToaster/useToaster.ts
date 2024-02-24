import type { ToastOptions } from 'react-hot-toast'

import { useCallback } from 'react'
import reactHotToast from 'react-hot-toast'

export type UseToasterOptions = Pick<
  ToastOptions,
  'duration' | 'ariaProps' | 'id' | 'position'
>

const defaultOptions: UseToasterOptions = {
  duration: 4000,
  position: 'bottom-right',
}

export const useToaster = (options?: UseToasterOptions) => {
  const toast = useCallback(
    (message: string, overrideOptions?: UseToasterOptions) =>
      reactHotToast(message, {
        ...defaultOptions,
        ...options,
        ...overrideOptions,
      }),
    [options],
  )

  return toast
}
