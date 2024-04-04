import type { Toast as _Toast } from 'react-hot-toast'

import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { resolveValue } from 'react-hot-toast'

export const Toast = (t: _Toast) => {
  return (
    <div className="text-dark-shades flex items-center rounded-md bg-white px-6 py-4 text-sm font-normal leading-6 shadow-md">
      <InformationCircleIcon className="text-light-accent mr-2 size-5" />
      {resolveValue(t.message, t)}
    </div>
  )
}
