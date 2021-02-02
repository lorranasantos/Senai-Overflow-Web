import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Header,
  Logo,
  Content,
  ProfileContainer,
  FeedContainer,
  ActionContainer,
  QuestionCard,
  IconSignOut,
} from "./styles";

import imgProfile from "../../assets/foto_perfil.png";
import logo from "../../assets/logo.png";
import api from "../../services/api";
import { signOut } from "../../services/security";

function Profile() {
  return (
    <>
      <section>
        <img src={imgProfile} />
        <a href="a">Editar Foto</a>
      </section>
      <section>
        <strong>NOME:</strong>
        <p>Alcino</p>
      </section>
      <section>
        <strong>RA:</strong>
        <p>0000001</p>
      </section>
      <section>
        <strong>EMAIL:</strong>
        <p>alcino@gmail.com</p>
      </section>
    </>
  );
}

function Question({ question }) {
  return (
    <QuestionCard>
      <header>
        <img src={imgProfile} />
        <strong>por {question.Student.name}</strong>
        <p>Em {question.created_at}</p>
      </header>
      <section>
        <strong>{question.title}</strong>
        <p>{question.description}</p>
        <img src={question.image} />
      </section>
      <footer>
        <h1>11 Respostas</h1>
        <section>
          <header>
            <img src={imgProfile} />
            <strong>por Fulano</strong>
            <p>12/12/2012 às 12:13</p>
          </header>
          <p>Resposta para a pergunta</p>
        </section>
        <form>
          <textarea placeholder="Responda essa dúvida" required></textarea>
          <button>Enviar</button>
        </form>
      </footer>
    </QuestionCard>
  );
}

function Home() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const loadQuestions = async () => {
      const response = await api.get("/feed");
      setQuestions(response.data);
    };

    loadQuestions();
  }, []);

  const handleSignOut = () => {
    signOut();

    history.replace("/");
  };

  return (
    <Container>
      <Header>
        <Logo src={logo} />
        <IconSignOut onClick={handleSignOut} />
      </Header>
      <Content>
        <ProfileContainer>
          <Profile />
        </ProfileContainer>
        <FeedContainer>
          {questions.map((q) => (
            <Question question={q} />
          ))}
        </FeedContainer>
        <ActionContainer>
          <button>Fazer uma Pergunta</button>
        </ActionContainer>
      </Content>
    </Container>
  );
}

export default Home;
