import { forwardRef } from 'react';
import { Title } from 'styles/main';

import { Container, Content, Header, Overflow } from './styles';

interface ILayoutContainer {
  children: React.ReactNode;
  title?: string;
}

export const LayoutContainer = forwardRef<HTMLDivElement, ILayoutContainer>(
  ({ children, title }, ref) => {
    return (
      <Container>
        <Header>
          <Title $lightColor $margin='0'> {title} </Title>
        </Header>
        <Overflow ref={ref}>
          <Content> {children} </Content>
        </Overflow>
      </Container>
    );
  }
);
