import Swal from 'sweetalert2';

interface QuestionFireProps {
  title?: string,
  text?: string,
  confirmButtonText?: string
}

export const questionFire = async ({ title, text, confirmButtonText }: QuestionFireProps = {}) => {
  return Swal.fire({
    title: `${ title || 'Deseja remover?' }`,
    text: `${ text || 'Sua ação não poderá ser desfeita!'}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6366F1',
    cancelButtonText: 'Cancelar',
    confirmButtonText: `${ confirmButtonText || 'Sim, remover!'}`,
    customClass: {
      popup: 'question dark-theme-popup'
    }
  });
};

export const toastFire = (message: string, type?: 'success' | 'warning' | 'error' | 'info') => {
  return Swal.fire({
    toast: true,
    position: 'top',
    icon: `${type || 'success'}`,
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      popup: 'toast dark-theme-popup'
    }
  });
};
