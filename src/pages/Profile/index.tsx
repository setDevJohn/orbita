import { FieldsProps, Form } from '@components/Form';
import { LayoutContainer } from '@components/LayoutContainer';
import { LoadingPage } from '@components/Loading';
import { HomeContext } from '@context/Home';
import { usersApi } from '@services/users';
import { format } from '@utils/format';
import { mask } from '@utils/mask';
import { toastFire } from '@utils/sweetAlert';
import { useContext, useEffect, useState } from 'react';

import { EditBackgroundFocus, ImageContainer, UserLogo } from './styles';

export function Profile() {
  const [loading, setLoading] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
    cellPhone: '',
    email: '',
    wage: '',
    payday: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const { decodedUser } = useContext(HomeContext);
  
  const defaultProfileImage = `https://ui-avatars.com/api/?name=${decodedUser?.name}&size=100&background=333333&color=ffffff`;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const userResponse = await usersApi.findInfo();

        setProfileForm({
          name: userResponse.name.trim(),
          cellPhone: userResponse.cellPhone || '',
          email: userResponse.email,
          wage: userResponse.wage ? parseFloat(userResponse.wage.toString()).toFixed(2) : '',
          payday: userResponse.payday?.toString() || ''
        });
      } catch (err) {
        toastFire((err as Error).message, 'error');
      } finally {
        setLoading(false);
      }
    }; 
    
    fetchUserInfo();
  }, []);

  const handleSubmitProfile = async () => {
    try {
      setLoading(true);
 
      await usersApi.update({
        cellPhone: format.extractNumberOfCellPhone(profileForm.cellPhone),
        email: profileForm.email,
        name: profileForm.name,
        payday: +profileForm.payday,
        wage: format.currencyToDecimal(profileForm.wage)
      });

      toastFire('Perfil atualizado com sucesso');
    } catch (err) {
      toastFire((err as Error).message, 'error');
    } finally {
      setLoading(false);
    }
  }; 

  const handleSubmitPassword = async () => {
    try {
      setLoading(true);
 
      const { currentPassword, newPassword, confirmNewPassword } = passwordForm;
      
      if (newPassword.length < 6) {
        return toastFire('A senha deve ter no mínimo 6 caracteres', 'warning');
      }

      if (newPassword !== confirmNewPassword) {
        return toastFire('As senhas não coincidem', 'warning');
      } 

      await usersApi.updatePassword({ currentPassword, newPassword });

      toastFire('Senha atualizada com sucesso');
    } catch (err) {
      toastFire((err as Error).message, 'error');
    } finally {
      setLoading(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
    }
  }; 

  const handleChangeProfileForm = (name: string, value: string) => {
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleChangePasswordForm = (name: string, value: string) => {
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const profileFields: FieldsProps[] = [
    {
      type: 'default',
      name: 'name',
      value: mask.name(profileForm.name),
      handleChange: handleChangeProfileForm,
      label: 'Nome',
      required: true,
      placeholder: 'Nome Sobrenome',
      labelInColumn: true  
    },
    {
      type: 'default',
      name: 'cellPhone',
      value: mask.phone(profileForm.cellPhone),
      handleChange: handleChangeProfileForm,
      label: 'Celular',
      placeholder: '(99) 99999-9999',
      labelInColumn: true  
    },
    {
      type: 'default',
      name: 'email',
      value: profileForm.email,
      handleChange: handleChangeProfileForm,
      label: 'E-mail',
      inputType: 'email',
      required: true,
      placeholder: 'seuemail@example.com',
      labelInColumn: true  
    },
    {
      type: 'default',
      name: 'wage',
      value: mask.currency(profileForm.wage),
      handleChange: handleChangeProfileForm,
      label: 'Salário líquido',
      placeholder: 'R$ 0,00',
      labelInColumn: true  
    },
    {
      type: 'default',
      name: 'payday',
      value: mask.dayOfMonth(profileForm.payday),
      handleChange: handleChangeProfileForm,
      label: 'Dia de pagamento',
      placeholder: '05',
      labelInColumn: true  
    },
  ];

  const passwordFields: FieldsProps[] = [
    {
      type: 'default',
      name: 'currentPassword',
      value: passwordForm.currentPassword,
      handleChange: handleChangePasswordForm,
      label: 'Senha atual',
      placeholder: '********',
      inputType: 'password',
      autoComplete: 'current-password',
      required: true,
      labelInColumn: true  
    },
    {
      type: 'default',
      name: 'newPassword',
      value: passwordForm.newPassword,
      handleChange: handleChangePasswordForm,
      label: 'Nova senha',
      placeholder: '********',
      inputType: 'password',
      autoComplete: 'new-password',
      required: true,
      labelInColumn: true  
    },
    {
      type: 'default',
      name: 'confirmNewPassword',
      value: passwordForm.confirmNewPassword,
      handleChange: handleChangePasswordForm,
      label: 'Confirmar nova senha',
      placeholder: '********',
      inputType: 'password',
      autoComplete: 'confirm-new-password',
      required: true,
      labelInColumn: true  
    },
  ];
  
  const forms = [
    {
      title: 'Meu Perfil',
      fields: profileFields,
      onSubmit: handleSubmitProfile,
      confirmText: 'Salvar alterações'
    },
    {
      title: 'Alterar senha',
      fields: passwordFields,
      onSubmit: handleSubmitPassword,
      confirmText: 'Atualizar senha'
    }
  ];

  return (
    <LayoutContainer title="Perfil">
      <ImageContainer>
        <UserLogo
          alt="Foto usuário"
          src={decodedUser?.profileImage || defaultProfileImage} 
          onError={(e) => (e.target as HTMLImageElement).src = defaultProfileImage}
        />

        <EditBackgroundFocus>
          <span>Editar</span>
        </EditBackgroundFocus>
      </ImageContainer>

      {forms.map((formProps, index) => (
        <Form 
          key={index}
          {...formProps}
          marginBottom={30}
        />
      ))}

      {loading && <LoadingPage/>}
    </LayoutContainer>
  );
}