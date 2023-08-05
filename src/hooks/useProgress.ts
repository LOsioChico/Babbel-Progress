import { useQuery } from '@tanstack/react-query'
import { Progress } from '../interfaces/progress'

const getProgress = async (): Promise<Progress[]> => {
  const response = await fetch('http://localhost:3001/items')
  return response.json()
}

const useProgress = () => {
  const progressQuery = useQuery({
    queryKey: ['progress'],
    queryFn: getProgress,
  })

  return progressQuery
}

export default useProgress
