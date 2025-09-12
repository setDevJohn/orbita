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
  const [form, setForm] = useState({
    name: '',
    cellPhone: '',
    email: '',
    wage: '',
    payday: ''
  });

  const { decodedUser } = useContext(HomeContext);
  
  const defaultProfileImage = `https://ui-avatars.com/api/?name=${decodedUser?.name}&size=100&background=333333&color=ffffff`;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const userResponse = await usersApi.findInfo();

        setForm({
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
        cellPhone: format.extractNumberOfCellPhone(form.cellPhone),
        email: form.email,
        name: form.name,
        payday: +form.payday,
        wage: format.currencyToDecimal(form.wage)
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
 
      await usersApi.update({
        cellPhone: format.extractNumberOfCellPhone(form.cellPhone),
        email: form.email,
        name: form.name,
        payday: +form.payday,
        wage: format.currencyToDecimal(form.wage)
      });

      toastFire('Perfil atualizado com sucesso');
    } catch (err) {
      toastFire((err as Error).message, 'error');
    } finally {
      setLoading(false);
    }
  }; 

  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const profileFields: FieldsProps[] = [
    {
      type: 'default',
      name: 'name',
      value: mask.name(form.name),
      handleChange,
      label: 'Nome',
      required: true,
      placeholder: 'Nome Sobrenome',
      labelInColumn: true  
    },
    {
      type: 'default',
      name: 'cellPhone',
      value: mask.phone(form.cellPhone),
      handleChange,
      label: 'Celular',
      placeholder: '(99) 99999-9999',
      labelInColumn: true  
    },
    {
      type: 'default',
      name: 'email',
      value: form.email,
      handleChange,
      label: 'E-mail',
      inputType: 'email',
      required: true,
      placeholder: 'seuemail@example.com',
      labelInColumn: true  
    },
    {
      type: 'default',
      name: 'wage',
      value: mask.currency(form.wage),
      handleChange,
      label: 'Salário líquido',
      placeholder: 'R$ 0,00',
      labelInColumn: true  
    },
    {
      type: 'default',
      name: 'payday',
      value: mask.dayOfMonth(form.payday),
      handleChange,
      label: 'Dia de pagamento',
      placeholder: '05',
      labelInColumn: true  
    },
  ];

  const passwordFields: FieldsProps[] = [
    {
      type: 'default',
      name: 'currentPassword',
      value: '',
      handleChange,
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
      value: '',
      handleChange,
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
      value: '',
      handleChange,
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