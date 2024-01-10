/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from 'sweetalert2';

const showErrorAlert = (errorMessage:any) => {
  
  Swal.fire({
    title: 'Error',
    text: errorMessage,
    icon: 'error',
    confirmButtonText: 'OK'
  });

  setTimeout(() => {
    Swal.close();
  }, 2000);
};

export default showErrorAlert;
