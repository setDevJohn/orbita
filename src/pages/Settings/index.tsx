import { ToggleButton } from '@components/Buttons';
import { SelectInput } from '@components/Inputs';
import { LayoutContainer } from '@components/LayoutContainer';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsCurrencyDollar, BsGlobe2 } from 'react-icons/bs';
import { FaRegCreditCard, FaRegFileAlt } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import { IoNotificationsOutline } from 'react-icons/io5';
import { MdChevronRight, MdFingerprint, MdNotificationsActive, MdOutlineColorLens, MdOutlineShield, MdOutlineTextsms } from 'react-icons/md';
import { Separator, Title } from 'styles/main';

import packageJson from '../../../package.json';

import { IconLabelContainer, Item, List, SettingsSection, TitleContainer } from './styles';

interface ISettingsList {
  type: 'select' | 'toggle' | 'clickable',
  name: string,
  label: string,
  icon: React.ReactNode,
  options?: { label: string, value: string }[],
  checked?: boolean,
}

interface ISettingsSectionsProps {
  title: string,
  list: ISettingsList[]
}

export function Settings() {
  const generalList: ISettingsList[] = [
    {  
      type: 'select',
      name: 'theme',
      label: 'Tema',
      icon: <MdOutlineColorLens size={26}/>,
      options: [
        { label: 'Sistema', value: 'system' },
        { label: 'Escuro', value: 'dark' },
        { label: 'Claro', value: 'light' },
      ]
    },
    {  
      type: 'select',
      name: 'language',
      label: 'Idioma',
      icon: <BsGlobe2 size={25}/>,
      options: [
        { label: 'Português', value: 'pt-BR' },
        { label: 'Inglês', value: 'en-US' },
      ]
    },
    {  
      type: 'select',
      name: 'currency',
      label: 'Moeda padrão',
      icon: <BsCurrencyDollar size={26}/>,
      options: [
        { label: 'Real', value: 'BRL' },
        { label: 'Dólar', value: 'USD' },
      ]
    },
    {  
      type: 'select',
      name: 'creditReleases',
      label: 'Lançamentos na próxima fatura', 
      icon: <FaRegCreditCard size={30}/>,
      options: [
        { label: 'Dia fechamento', value: 'atClosing' },
        { label: 'Dia após fechamento', value: 'afterClosure' },
      ]
    },
  ];

  const securityList: ISettingsList[] = [
    { 
      type: 'toggle',  
      name: 'biometricAuth', label: 'Autenticação biométrica', 
      icon: <MdFingerprint size={26}/>,
      checked: true,
    },
    { 
      type: 'toggle',  
      name: 'passwordLock', label: 'Bloqueio por senha', 
      icon: <FiLock size={26}/>,
      checked: true,
    },
  ];

  const notificationList: ISettingsList[] = [
    { 
      type: 'toggle',  
      name: 'push', label: 'Notificações por push', 
      icon: <MdNotificationsActive size={26}/>,
      checked: true,
    },
    { 
      type: 'toggle',  
      name: 'email', label: 'Notificações por e-mail', 
      icon: <HiOutlineMail size={26}/>,
      checked: true,
    },
    { 
      type: 'toggle',  
      name: 'sms', label: 'Notificações por SMS', 
      icon: <MdOutlineTextsms size={26}/>,
      checked: true,
    },
  ];

  const notificationTypesList: ISettingsList[] = [
    {
      type: 'toggle',
      name: 'general',
      label: 'Notificações gerais',
      icon: <IoNotificationsOutline size={26}/>,
      checked: true,
    },
    {
      type: 'toggle',
      name: 'projections',
      label: 'Lembretes de projeções',
      icon: <IoNotificationsOutline size={26}/>,
      checked: true,
    },
    {
      type: 'toggle',
      name: 'invoices',
      label: 'Lembretes de faturas',
      icon: <IoNotificationsOutline size={26}/>,
      checked: true,
    },
    {
      type: 'toggle',
      name: 'accounts',
      label: 'Lembretes de contas',
      icon: <IoNotificationsOutline size={26}/>,
      checked: true,
    },
    {
      type: 'toggle',
      name: 'reports',
      label: 'Relatórios mensais',
      icon: <IoNotificationsOutline size={26}/>,
      checked: true,
    },
    {
      type: 'toggle',
      name: 'lowLimit',
      label: 'Alertas de limite baixo',
      icon: <IoNotificationsOutline size={26}/>,
      checked: true,
    },
    {
      type: 'toggle',
      name: 'reports',
      label: 'Alerta de saldo baixo',
      icon: <IoNotificationsOutline size={26}/>,
      checked: true,
    },
  ];

  const aboutList: ISettingsList[] = [
    { 
      type: 'clickable',
      name: 'appVersion', label: 'Versão do aplicativo', 
      icon: <AiOutlineInfoCircle size={26}/>,
    },
    { 
      type: 'clickable',
      name: 'termsOfService', label: 'Termos de serviço', 
      icon: <FaRegFileAlt size={26}/>,
    },
    { 
      type: 'clickable',
      name: 'privacyPolicy', label: 'Política de privacidade', 
      icon: <MdOutlineShield size={26}/>,
    },
  ];

  const settingsSections: ISettingsSectionsProps[] = [
    { title: 'Geral', list: generalList },
    { title: 'Segurança', list: securityList },
    { title: 'Notificações', list: notificationList },
    { title: 'Tipos de notificações', list: notificationTypesList },
    { title: 'Sobre', list: aboutList },
  ];

  return (
    <LayoutContainer title="Configurações">
      {settingsSections.map(({ title, list }) => (
        <SettingsSection key={title}>
          <TitleContainer>
            <Title $margin='0'>{title}</Title>
          </TitleContainer>
          <Separator $margin={10}/>

          <List>
            {list.map((item, i) => (
              <Item key={i} style={item.type === 'select' ? { padding: '0px 10px' } : {}}>
                <IconLabelContainer>
                  {item.icon} {item.label}
                </IconLabelContainer>    
                
                {item.type === 'select' && (
                  <SelectInput
                    name='select'
                    minSelectWidth='135px'
                    options={item.options ? [{  label: '', value: '' } , ...item.options] : []}
                    value={item.label}
                    handleChange={() => {}}
                  />
                )}

                {item.type === 'toggle' && (
                  <ToggleButton
                    checked={!!item.checked}
                    handleClick={() => {}}
                  />
                )}

                {item.type === 'clickable' && (
                  <>
                    {item.label === 'Versão do aplicativo' ? packageJson.version : (
                      <MdChevronRight
                        size={26}
                        onClick={() => {}}
                        style={{ cursor: 'pointer' }}
                      />
                    )}
                  </>
                )}
              </Item>
            ))}
          </List>
        </SettingsSection>
      ))}
    </LayoutContainer>
  );
}