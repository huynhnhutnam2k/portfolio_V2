import { useMutation } from '@tanstack/react-query'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleSendMessage = async(data: {[key: string]: string}) => {
  // return await 
}
export const useMutationContact = () => {
  return useMutation({
    mutationFn: (data: {[key: string]: string}) => {
      return handleSendMessage(data)
    }
  })
}