import { useMutation } from '@tanstack/react-query'
import Swal from 'sweetalert2'

export const useMutationContact = () => {
  return useMutation({
    mutationFn: () => {
      Swal.fire({
        title: 'Sending Message...',
        html: 'Please wait while we send your message',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      return new Promise((resolve) => {
        setTimeout(() => {
          Swal.fire({
            title: 'Message Sent',
            icon: 'success',
            html: 'Your message has been sent successfully',
          });

          // resolve();
        }, 3000);
      });
    }
  })
}