import { FieldsProps, Form } from '@components/Form';
import { LayoutContainer } from '@components/LayoutContainer';
import { HomeContext } from '@context/Home';
import { useContext } from 'react';

import { EditBackgroundFocus, ImageContainer, UserLogo } from './styles';

export function Profile() {
  const { decodedUser } = useContext(HomeContext);

  const defaultProfileImage = `https://ui-avatars.com/api/?name=${decodedUser?.name}&size=100&background=333333&color=ffffff`;

  const profileFields: FieldsProps[] = [
    {
      type: 'default',
      name: 'name',
      value: '',
      handleChange: () => {},
      label: 'Nome',
      placeholder: 'Seu nome',
      labelInColumn: true  
    },
    {
      type: 'default',
      name: 'email',
      value: '',
      handleChange: () => {},
      label: 'E-mail',
      placeholder: 'Seu e-mail',
      labelInColumn: true  
    },
    {
      type: 'default',
      name: 'wage',
      value: '',
      handleChange: () => {},
      label: 'Salário líquido',
      placeholder: '0,00',
      labelInColumn: true  
    },
    {
      type: 'default',
      name: 'paymentDay',
      value: '',
      handleChange: () => {},
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
      handleChange: () => {},
      label: 'Senha atual',
      placeholder: '********',
      labelInColumn: true  
    },
    {
      type: 'default',
      name: 'newPassword',
      value: '',
      handleChange: () => {},
      label: 'Nova senha',
      placeholder: '********',
      labelInColumn: true  
    },
    {
      type: 'default',
      name: 'confirmNewPassword',
      value: '',
      handleChange: () => {},
      label: 'Confirmar nova senha',
      placeholder: '********',
      labelInColumn: true  
    },
  ];
  
  const forms = [
    {
      title: 'Meu Perfil',
      fields: profileFields,
      onSubmit: () => {},
      confirmText: 'Salvar alterações'
    },
    {
      title: 'Alterar senha',
      fields: passwordFields,
      onSubmit: () => {},
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
    </LayoutContainer>
  );
}