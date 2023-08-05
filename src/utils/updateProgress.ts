import { Progress, State } from '../interfaces/progress'
import { currentDateFormated } from './currentDateFormated'

interface UpdateProgress {
  progress: Progress[]
  moduleID: string
  unitID: string
  sessionID: string
}

export const updateProgress = async ({
  progress,
  moduleID,
  unitID,
  sessionID,
}: UpdateProgress) => {
  const module = progress.find((module) => module.id === moduleID)
  const unit = module?.items.find((unit) => unit.id === unitID)
  const session = unit?.items.find((session) => session.id === sessionID)

  session?.state === State.Done
    ? (session.state = State.Todo)
    : (session!.state = State.Done)

  session!.updatedAt = currentDateFormated()

  const newModule = {
    ...module,
    completed_amount: module?.items.reduce(
      (acc, unit) =>
        acc +
        unit.items.filter((session) => session.state === State.Done).length,
      0,
    ),
    completed_percentage: Math.round(
      (module!.items.reduce(
        (acc, unit) =>
          acc +
          unit.items.filter((session) => session.state === State.Done).length,
        0,
      ) /
        module!.items.reduce((acc, unit) => acc + unit.items.length, 0)) *
        100,
    ),
  }

  const response = await fetch(`http://localhost:3001/items/${moduleID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newModule),
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  module!.completed_amount = newModule.completed_amount ?? 0
  module!.completed_percentage = newModule.completed_percentage ?? 0

  return response.json()
}
