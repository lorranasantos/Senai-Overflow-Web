import { Container, FormLogin, Header, Body, Button } from "./style";
import Input from "../../components/input";

function Login() {
  return (
    <Container>
      <FormLogin>
        <Header>
          <h1>BEM VINDO AO SENAI OVERFLOW</h1>
          <h2>INFORME OS SEUS DADOS</h2>
        </Header>
        <Body>
          <Input id="ra" label="RA" type="text" />
          <Input id="name" label="Nome" type="text" />
          <Input id="email" label="E-mail" type="email" />
          <Input id="password" label="Senha" type="password" />
          <Input id="valid-password" label="Confirmar Senha" type="password" />
          <Button>Entrar</Button>
          <a href="a">Ou clique aqui para se cadastrar</a>
        </Body>
      </FormLogin>
    </Container>
  );
}

export default Login;
