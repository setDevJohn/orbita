import { LayoutContainer } from '@components/LayoutContainer';
import { useEffect, useState } from 'react';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';

import { ButtonCardContainer, ButtonFilter, ButtonFilterContainer, IconLabelContainer, Item, List, ListContainer, NoNotificationSpan, SpanButton } from './styles';

export function Notifications() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications([]);
  }, []);

  return (
    <LayoutContainer title="Notificações">
      <ButtonFilterContainer>
        <ButtonFilter 
          $select={selectedFilter === 'all'}
          onClick={() => setSelectedFilter('all')}
        >
          Todas
        </ButtonFilter>
        <ButtonFilter 
          $select={selectedFilter === 'unread'}
          onClick={() => setSelectedFilter('unread')}
        >
          Não lidas
        </ButtonFilter>
      </ButtonFilterContainer>

      <SpanButton>Marcar todas como lidas</SpanButton>

      {!notifications.length && (
        <NoNotificationSpan>Nenhuma notificação</NoNotificationSpan>
      )}

      <ListContainer>
        <List>
          <Item>
            <IconLabelContainer>
              <MdOutlineAccountBalanceWallet size={26} />
              O saldo da sua conta está inferior á R$200
            </IconLabelContainer>

            <ButtonCardContainer>
              <span>Excluir</span>
              <span>Marcar como lida</span>
            </ButtonCardContainer>
          </Item>
            
          <Item>
            <IconLabelContainer>
              <MdOutlineAccountBalanceWallet size={26} />
              Sua fatura do NuBank fechou hoje
            </IconLabelContainer>

            <ButtonCardContainer>
              <span>Excluir</span>
              <span>Marcar como lida</span>
            </ButtonCardContainer>
          </Item>
            
          <Item>
            <IconLabelContainer>
              <MdOutlineAccountBalanceWallet size={26} />
              Seu cartão de crédito do Itaú vence amanhã
            </IconLabelContainer>

            <ButtonCardContainer>
              <span>Excluir</span>
              <span>Marcar como lida</span>
            </ButtonCardContainer>
          </Item>
        </List>
      </ListContainer>
    </LayoutContainer>
  );
}