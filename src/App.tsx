import { useState } from 'react'
import { ImSpinner9 } from 'react-icons/im'
import useProgress from './hooks/useProgress'

import 'react-circular-progressbar/dist/styles.css'
import { Module } from './components/Module'

const App = () => {
  const [selectedID, setSelectedID] = useState('')
  const { data, isLoading, isError } = useProgress()

  if (isLoading) {
    return (
      <section className='flex h-screen items-center justify-center text-3xl text-[#284b7c]'>
        <ImSpinner9 className='animate-spin' />
      </section>
    )
  }

  if (isError) {
    return (
      <section className='flex h-screen items-center justify-center text-3xl text-[#284b7c]'>
        <p>Something went wrong</p>
      </section>
    )
  }

  return (
    <section className='mt-20 flex flex-col items-center justify-center overflow-x-hidden text-3xl text-[#284b7c]'>
      Progreso
      <ul className='mt-4 cursor-pointer select-none text-base text-[#0e0e11]'>
        {data?.map((module) => (
          <li
            key={module.id}
            id={module.id}
            className='flex w-screen flex-col items-center justify-center border border-b-0 py-1 last:border'
            onClick={() => {
              if (selectedID === module.id) setSelectedID('')
              else setSelectedID(module.id)
            }}
          >
            <Module
              key={module.id}
              module={module}
              data={data}
              selectedID={selectedID}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default App
