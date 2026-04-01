import { useEffect, useState } from 'react'
import { compile } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'

export default function MDXLoader({ file }) {
  const [Content, setContent] = useState(null)

  useEffect(() => {
    async function loadMDX() {
      const res = await fetch(file)
      const text = await res.text()

      const compiled = await compile(text, { outputFormat: 'function-body' })

      const fn = new Function(String(compiled))
      const { default: MDXContent } = fn({ ...runtime })

      setContent(() => MDXContent)
    }

    loadMDX()
  }, [file])

  return Content ? <Content /> : <p>Loading...</p>
}