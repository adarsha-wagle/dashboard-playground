import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/_public/')({
  component: App,
})

function App() {
  const [count1, setCount] = React.useState(0)
  const [count2, setCount2] = React.useState(0)
  const [count3, setCount3] = React.useState(0)

  const handleCount = () => {
    setCount((prev) => prev + 1)

    setCount2((prev) => prev + 1)
    setCount3((prev) => prev + 1)
  }

  console.log('Home Page re-rendered')

  return (
    <main className="container">
      <button onClick={handleCount}>Count:{count1}</button>
      <section>{count2}</section>
      <section>{count3}</section>
    </main>
  )
}
