import Swal from 'sweetalert2';

interface QuestionFireProps {
  title?: string,
  text?: string,
  confirmButtonText?: string
}

export const questionFire = async ({ title, text, confirmButtonText }: QuestionFireProps = {}) => {
  const theme = localStorage.getItem('theme');

  return Swal.fire({
    title: `${ title || 'Deseja realmente remover?' }`,
    text: `${ text || 'Sua ação não poderá ser desfeita!'}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#6366F1',
    cancelButtonText: 'Cancelar',
    confirmButtonText: `${ confirmButtonText || 'Sim, remover!'}`,
    customClass: {
      popup: `question ${theme === 'light' ? 'light-theme-popup' : 'dark-theme-popup'}`
    }
  });
};

export const toastFire = (message: string, type?: 'success' | 'warning' | 'error' | 'info') => {
  const theme = localStorage.getItem('theme');

  return Swal.fire({
    toast: true,
    position: 'top',
    icon: `${type || 'success'}`,
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      popup: `toast ${theme === 'light' ? 'light-theme-popup' : 'dark-theme-popup'}`
    }
  });
};
