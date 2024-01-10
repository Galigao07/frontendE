/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from 'sweetalert2';

const showSuccessAlert = (message:any) => {
  
  Swal.fire({
    title: 'Success',
    text: message,
    icon: 'success',
    confirmButtonText: 'OK'
  });
  setTimeout(() => {
    Swal.close();
  }, 2000);
};

export default showSuccessAlert;
