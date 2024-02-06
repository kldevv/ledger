import { useEffect } from 'react'

export const LineWobbleLoader = () => {
  useEffect(() => {
    async function getLoader() {
      const { lineWobble } = await import('ldrs')
      lineWobble.register()
    }
    void getLoader()
  }, [])

  return <l-line-wobble color="gray" size={80} stroke={20} bg-opacity={0.9} />
}
