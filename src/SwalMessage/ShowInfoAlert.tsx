import Swal from 'sweetalert2';

const showInfoAlert = (message:any) => {
  Swal.fire({
    title: 'Info',
    text: message,
    icon: 'info', // Use 'info' for info icon
    confirmButtonText: 'OK'
  });
  setTimeout(() => {
    Swal.close();
  }, 2000);
};

export default showInfoAlert;
