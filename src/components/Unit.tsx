import { UseMutationResult } from '@tanstack/react-query'
import { Progress, ProgressItem } from '../interfaces/progress'
import { UpdateProgress } from '../utils/updateProgress'
import { Session } from './Session'

interface Props {
  data: Progress[]
  module: Progress
  unit: ProgressItem
  mutation: UseMutationResult<unknown, unknown, UpdateProgress, unknown>
}

export const Unit = ({ unit, data, module, mutation }: Props) => {
  return (
    <div
      className='flex w-full max-w-[765px] flex-col justify-center'
      key={unit.id}
    >
      <span className='my-6'>{unit.title}</span>
      <ul>
        {unit.items.map((session) => (
          <Session
            mutation={mutation}
            key={session.id}
            session={session}
            data={data}
            module={module}
            unit={unit}
          />
        ))}
      </ul>
    </div>
  )
}
