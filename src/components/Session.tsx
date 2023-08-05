import { UseMutationResult } from '@tanstack/react-query'
import { FaRegDotCircle } from 'react-icons/fa'
import {
  ItemUnits,
  Progress,
  ProgressItem,
  State,
} from '../interfaces/progress'
import { UpdateProgress } from '../utils/updateProgress'

interface Props {
  session: ItemUnits
  data: Progress[]
  module: Progress
  unit: ProgressItem
  mutation: UseMutationResult<unknown, unknown, UpdateProgress, unknown>
}

export const Session = ({ session, data, module, unit, mutation }: Props) => {
  return (
    <li
      className={`mb-5 flex ${session.state === State.Done && 'opacity-40'}`}
      key={session.id}
      onClick={() => {
        mutation.mutate({
          progress: data,
          moduleID: module.id,
          unitID: unit.id,
          sessionID: session.id,
        })
      }}
    >
      <div className='relative w-5'>
        <FaRegDotCircle className='absolute -left-1 top-0 -translate-y-1/2 transform rounded-full bg-[#e9eaed] text-lg text-[#b2b4bd]' />
        <div className='absolute left-1 top-0 mt-4 h-4/5 transform border bg-black' />
      </div>
      <div className='ml-3 flex w-full cursor-pointer items-center justify-between rounded-2xl rounded-tl-none bg-white p-6 font-semibold shadow-sm'>
        <span>{session.title}</span>
        {session.state === 'done' && (
          <span className='mr-4 rounded-md bg-[#3645ab] px-2 py-1 text-xs text-white'>
            {session.updatedAt}
          </span>
        )}
      </div>
    </li>
  )
}
