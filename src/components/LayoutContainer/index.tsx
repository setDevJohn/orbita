import { Container, Content, Header, Title } from './styles';

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
      
      <Content> {children} </Content>
    </Container>
  );
}