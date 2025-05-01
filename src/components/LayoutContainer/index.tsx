import { Container, Content, Header } from './styles';

interface ILayoutContainer {
  children: React.ReactNode;
  title?: string;
}

export function LayoutContainer({ children, title }: ILayoutContainer) {
  return (
    <Container>
      <Header> {title} </Header>
      <Content> {children} </Content>
    </Container>
  );
}