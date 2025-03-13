import { useMutation } from "@tanstack/react-query";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleSendMessage = async () => {
  // return await
};
export const useMutationContact = () => {
  return useMutation({
    mutationFn: () => {
      return handleSendMessage();
    },
  });
};
