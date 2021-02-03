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
import { signOut, getUser } from "../../services/security";

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
  const [showAnswers, SetShowAnswers] = useState(false);

  const [newAnswer, setNewAnswer] = useState("");

  const [answers, setAnswers] = useState(question.Answers);

  const qtdAnswers = answers.length;

  const handleAddAnswer = async (e) => {
    e.preventDefault();

    if (newAnswer.length < 10)
      return (alert = "A Resposta deve conter no mínimo 10 caracteres");
    try {
      const response = await api.post(`/questions/${question.id}/answers`, {
        description: newAnswer,
      });

      const aluno = getUser();

      const answerAdded = {
        id: response.data.id,
        description: newAnswer,
        created_at: response.data.created_at,
        Student: {
          id: aluno.studentId,
          name: aluno.name,
        },
      };

      setAnswers([...answers, answerAdded]);
      setNewAnswer("");
    } catch (error) {
      alert(error);
    }
  };

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
        <h1 onClick={() => SetShowAnswers(!showAnswers)}>
          {qtdAnswers === 0 ? (
            "Seja o primeiro a responder"
          ) : (
            <>
              {qtdAnswers} {qtdAnswers > 1 ? "Respostas" : "Resposta"}
            </>
          )}
        </h1>
        {showAnswers && (
          <>
            {answers.map((answer) => (
              <section>
                <header>
                  <img src={imgProfile} />
                  <strong>por {answer.Student.name}</strong>
                  <p>{answer.updated_at}</p>
                </header>
                <p>{answer.description}</p>
              </section>
            ))}
          </>
        )}

        <form onSubmit={handleAddAnswer}>
          <textarea
            placeholder="Responda essa dúvida"
            onChange={(e) => setNewAnswer(e.target.value)}
            required
          >
            {newAnswer}
          </textarea>
          <button>Enviar</button>
        </form>
      </footer>
    </QuestionCard>
  );
}

function Home() {
  const history = useHistory();

  // const [answers, setAnswers] = useState([]);
  // useEffect(() => {
  //   const loadAnswers = async () => {
  //     const response = await api.get("/feed");
  //     setAnswers(response.data);
  //   };

  //   loadAnswers();
  // }, []);

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
