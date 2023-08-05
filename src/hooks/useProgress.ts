import { useQuery } from '@tanstack/react-query'
import { Progress } from '../interfaces/progress'

const getProgress = async (): Promise<Progress[]> => {
  const response = await fetch(
    import.meta.env.VITE_API_URL || 'http://localhost:3001/items',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
  )
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
