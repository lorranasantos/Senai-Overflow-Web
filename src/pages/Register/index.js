import { Container, FormRegister, Header, Body, Button } from "./style";
import Input from "../../components/input";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import api from "../../services/api";

function Register() {
  const history = useHistory();
  const [student, setStudent] = useState({
    ra: "",
    nome: "",
    email: "",
    password: "",
    validPassword: "",
  });

  const handleInput = (e) => {
    setStudent({ ...student, [e.target.id]: e.target.value });
  };

  const validPassword = () => {
    return student.password === student.validPassword;
  };

  const buttonDisabled = () => {
    const { ra, name, email, password } = student;

    if (!ra || !name || !email || !password || !validPassword()) return true;

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validPassword()) return alert("As senhas precisam ser iguais");

    try {
      const { ra, name, email, password } = student;

      const response = await api.post("/students", {
        ra,
        name,
        email,
        password,
      });
      console.log(response);
      history.push("/home");
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  return (
    <Container>
      <FormRegister onSubmit={handleSubmit}>
        <Header>
          <h1>BEM VINDO AO SENAI OVERFLOW</h1>
          <h2>INFORME OS SEUS DADOS</h2>
        </Header>
        <Body>
          <Input
            id="ra"
            label="RA"
            type="text"
            value={student.ra}
            handler={handleInput}
            required
          />
          <Input
            id="name"
            label="Nome"
            type="text"
            value={student.name}
            handler={handleInput}
            required
          />
          <Input
            id="email"
            label="E-mail"
            type="email"
            value={student.email}
            handler={handleInput}
            required
          />
          <Input
            id="password"
            label="Senha"
            type="password"
            value={student.password}
            handler={handleInput}
            required
          />
          <Input
            id="validPassword"
            label="Confirmar Senha"
            type="password"
            onBlur={(e) => {
              if (!validPassword()) alert("As senhas precisam ser iguais");
              e.target.focus();
            }}
            value={student.validPassword}
            handler={handleInput}
            required
          />
          <Button disabled={buttonDisabled()}>Entrar</Button>
          <Link to="/">Ou se já cadastrado, clique aqui para logar</Link>
        </Body>
      </FormRegister>
    </Container>
  );
}

export default Register;
