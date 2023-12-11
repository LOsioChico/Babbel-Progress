import { Progress, State } from '../interfaces/progress'
import { currentDateFormated } from './currentDateFormated'
import supabase from './supabase'

export interface UpdateProgress {
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

  const newProgress = progress.map((module) =>
    module.id === moduleID ? newModule : module,
  )

  const { error } = await supabase
    .from('progress')
    .update({ items: JSON.stringify(newProgress) })
    .match({ id: 'progress' })

  if (error) {
    throw new Error(error.message)
  }

  module!.completed_amount = newModule.completed_amount ?? 0
  module!.completed_percentage = newModule.completed_percentage ?? 0

  return newProgress
}
