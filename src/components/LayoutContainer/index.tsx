import { forwardRef } from 'react';

import { Container, Content, Header, Overflow, Title } from './styles';

interface ILayoutContainer {
  children: React.ReactNode;
  title?: string;
}

export const LayoutContainer = forwardRef<HTMLDivElement, ILayoutContainer>(
  ({ children, title }, ref) => {
    return (
      <Container>
        <Header>
          <Title> {title} </Title>
        </Header>
        <Overflow ref={ref}>
          <Content> {children} </Content>
        </Overflow>
      </Container>
    );
  }
);
