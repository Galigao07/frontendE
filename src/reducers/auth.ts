
 import Swal from 'sweetalert2'

 const swalWithBootstrapButtons = Swal.mixin({
   customClass: {
     confirmButton: 'btn btn-success',
     cancelButton: 'btn btn-danger'
   },
   buttonsStyling: false
 })


const initialState = {
    isAuthenticated: null,
    username: ''
};

