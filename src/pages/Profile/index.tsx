import { BasicButton } from '@components/Buttons';
import { FieldsProps, Form } from '@components/Form';
import { FileInput } from '@components/Inputs/File';
import { LayoutContainer } from '@components/LayoutContainer';
import { LoadingPage } from '@components/Loading';
import { AuthContext } from '@context/Auth';
import { usersApi } from '@services/users';
import { UserBase } from '@services/users/interface';
import { format } from '@utils/format';
import { mask } from '@utils/mask';
import { questionFire, toastFire } from '@utils/sweetAlert';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';

import { EditBackgroundFocus, ImageContainer, UserLogo } from './styles';

export function Profile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserBase | null>(null);
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
  
  const { logout } = useContext(AuthContext);

  const imageRef = useRef<HTMLImageElement>(null);
  const defaultProfileImage = `https://ui-avatars.com/api/?name=${user?.name}&size=100&background=333333&color=ffffff`;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const userResponse = await usersApi.findInfo();

        setUser(userResponse);
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

  const handleRemoveAccount = async () => {
    try {
      const result = await questionFire({
        title: 'Deseja excluir sua conta?',
        text: 'Ao excluir sua conta, não será possível recuperá-la!',
        confirmButtonText: 'Excluir minha conta!'
      });

      if (result.isConfirmed) {
        setLoading(true);

        await usersApi.deleteAccount();
        await logout();
      }     
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

  const handleChangeImageProfile = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files[0]) {
      const file = files[0];
      const newFormData = new FormData();

      newFormData.append('file', file);

      try {
        setLoading(true);
        await usersApi.updateProfileImage(newFormData);
        toastFire('Imagem de perfil atualizada');
      } catch (err) {
        return toastFire(err as string, 'error');
      } finally {
        setLoading(false);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const urlFile = reader.result as string;
        if (imageRef.current) { imageRef.current.src = urlFile; }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <LayoutContainer title="Perfil">
      <ImageContainer>
        <UserLogo
          ref={imageRef}
          alt="Foto usuário"
          src={user?.profileImage || defaultProfileImage} 
          onError={(e) => (e.target as HTMLImageElement).src = defaultProfileImage}
        />

        <EditBackgroundFocus>
          <FileInput text='Editar' handleChange={handleChangeImageProfile} />
        </EditBackgroundFocus>
      </ImageContainer>

      {forms.map((formProps, index) => (
        <Form
          separator
          key={index}
          {...formProps}
          marginBottom={20}
        />
      ))}

      <BasicButton 
        type="cancel"
        text="Excluir conta"
        action={handleRemoveAccount}
        custonStyle={{ width: '85%' }}
      />

      {loading && <LoadingPage/>}
    </LayoutContainer>
  );
}