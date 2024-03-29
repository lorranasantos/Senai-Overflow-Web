import { Container, FormLogin, Header, Body, Button } from "./style";
import Input from "../../components/input";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";
import { signIn } from "../../services/security";
import Loading from "../../components/Loading";
import Alert from "../../components/alert";

function Login() {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState(undefined);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await api.post("/sessions", login);
      console.log(response.data);

      signIn(response.data);

      setIsLoading(false);

      history.push("/home");
    } catch (error) {
      console.error(error);
      setMessage({ title: "Ops...", description: error.response.data.error });
      setIsLoading(false);
    }
  };
  const handleInput = (e) => {
    setLogin({ ...login, [e.target.id]: e.target.value });
  };

  return (
    <>
      <Alert message={message} type="error" handleClose={setMessage} />
      {isLoading && <Loading />}
      <Container>
        <FormLogin onSubmit={handleSubmit}>
          <Header>
            <h1>BEM VINDO AO SENAI OVERFLOW</h1>
            <h2>O SEU PORTAL DE RESPOSTAS</h2>
          </Header>
          <Body>
            <Input
              id="email"
              label="E-mail"
              type="email"
              value={login.email}
              handler={handleInput}
              required
            />
            <Input
              id="password"
              label="Senha"
              type="password"
              value={login.password}
              handler={handleInput}
              required
            />
            <Button>Entrar</Button>
            <Link to="/register">Ou clique aqui para se cadastrar</Link>
          </Body>
        </FormLogin>
      </Container>
    </>
  );
}

export default Login;
