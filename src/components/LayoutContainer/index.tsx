import { Container, Content, Header, Overflow, Title } from './styles';

interface ILayoutContainer {
  children: React.ReactNode;
  title?: string;
}

export function LayoutContainer({ children, title }: ILayoutContainer) {
  return (
    <Container>
      <Header> 
        <Title> {title} </Title>
      </Header>
      
      <Overflow>
        <Content> {children} </Content>
      </Overflow>
    </Container>
  );
}