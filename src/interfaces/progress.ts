export interface Progress {
  id: string
  title: string
  symbol: string
  completed_amount: number
  completed_percentage: number
  total_amount: number
  items: ProgressItem[]
}

export interface ProgressItem {
  id: string
  title: string
  items: ItemUnits[]
}

export interface ItemUnits {
  id: string
  title: string
  state: State
}

export enum State {
  Todo = 'todo',
  Done = 'done',
}
