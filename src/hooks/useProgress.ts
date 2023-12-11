import { useQuery } from '@tanstack/react-query'
import { Progress } from '../interfaces/progress'
import supabase from '../utils/supabase'

const getProgress = async (): Promise<Progress[]> => {
  const { data, error } = await supabase.from('progress').select('items')

  if (error) {
    throw new Error(error.message)
  }

  const response = JSON.parse(data[0].items)
  return response as Progress[]
}

const useProgress = () => {
  const progressQuery = useQuery({
    queryKey: ['progress'],
    queryFn: getProgress,
  })

  return progressQuery
}

export default useProgress
