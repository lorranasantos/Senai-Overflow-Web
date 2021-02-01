import { Container, FormLogin, Header, Body, Button } from "./style";
import Input from "../../components/input";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

function Login() {
  const history = useHistory();

  const [login, setLogin] = useState({
    ra: "",
    nome: "",
    email: "",
    password: "",
    validPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/sessions", login);
      console.log(response.data);
      history.push("/register");
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };
  const handleInput = (e) => {
    setRegister({ ...register, [e.target.id]: e.target.value });
  };

  return (
    <Container>
      <FormLogin onSubmit={handleSubmit}>
        <Header>
          <h1>BEM VINDO AO SENAI OVERFLOW</h1>
          <h2>INFORME OS SEUS DADOS</h2>
        </Header>
        <Body>
          <Input
            id="ra"
            label="RA"
            type="text"
            value={register.ra}
            handler={handleInput}
            required
          />
          <Input
            id="name"
            label="Nome"
            type="text"
            value={register.name}
            handler={handleInput}
            required
          />
          <Input
            id="email"
            label="E-mail"
            type="email"
            value={register.email}
            handler={handleInput}
            required
          />
          <Input
            id="password"
            label="Senha"
            type="password"
            value={register.password}
            handler={handleInput}
            required
          />
          <Input
            id="validPassword"
            label="Confirmar Senha"
            type="password"
            value={register.validPassword}
            handler={handleInput}
            required
          />
          <Button>Entrar</Button>
          <Link to="/">Ou se já cadastrado, clique aqui para logar</Link>
        </Body>
      </FormLogin>
    </Container>
  );
}

export default Login;
