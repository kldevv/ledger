import { useEffect } from 'react'

export const DotStreamLoader = () => {
  useEffect(() => {
    async function getLoader() {
      const { dotStream } = await import('ldrs')
      dotStream.register()
    }
    void getLoader()
  }, [])

  return <l-dot-stream color="gray" />
}
