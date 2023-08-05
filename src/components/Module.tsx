import { CircularProgressbar } from 'react-circular-progressbar'
import { FaChevronDown } from 'react-icons/fa'
import { Progress, ProgressItem } from '../interfaces/progress'
import { Unit } from './Unit'

interface Props {
  data: Progress[]
  module: Progress
  selectedID: string
}

export const Module = ({ module, data, selectedID }: Props) => {
  return (
    <>
      <div className='flex h-20 w-full max-w-[765px] items-center justify-between'>
        <div className='flex gap-5'>
          <div className='flex h-14 w-14 items-center justify-center rounded-full border font-semibold'>
            <CircularProgressbar
              value={module.completed_percentage}
              text={module.symbol}
              className='text-black'
              styles={{
                path: {
                  stroke:
                    module.completed_percentage === 100 ? '#00b341' : '#284b7c',
                  transition: 'all 0.5s ease-in-out',
                },
                trail: {
                  stroke: '#e9eaed',
                  strokeLinecap: 'butt',
                },
                text: {
                  fill:
                    module.completed_percentage === 100 ? '#00b341' : '#284b7c',
                  transition: 'all 0.5s ease-in-out',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                },
              }}
            />
          </div>
          <div className='flex flex-col items-start justify-center gap-1'>
            <p className='font-semibold'>{module.title}</p>
            <p className='text-sm text-[#535665]'>
              {Number(module.completed_amount) > 0 ? (
                <span>
                  {module.completed_amount}/{module.total_amount} clases
                  completadas
                </span>
              ) : (
                <span>{module.total_amount} clases</span>
              )}
            </p>
          </div>
        </div>
        <FaChevronDown
          className={`${
            selectedID === module.id
              ? 'rotate-180 transform duration-200'
              : 'rotate-0 transform duration-200'
          }`}
        />
      </div>
      {selectedID === module.id && (
        <div
          className='flex w-full cursor-default flex-col items-center justify-center border-t bg-[#fafafa] pb-4'
          onClick={(e) => e.stopPropagation()}
        >
          {module.items.map((unit: ProgressItem) => (
            <Unit key={unit.id} unit={unit} data={data} module={module} />
          ))}
        </div>
      )}
    </>
  )
}
