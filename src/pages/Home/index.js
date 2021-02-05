import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
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

import Input from "../../components/input";
import imgProfile from "../../assets/foto_perfil.png";
import logo from "../../assets/logo.png";
import api from "../../services/api";
import { signOut, getUser } from "../../services/security";
import Modal from "../../components/Modal";
import { FormNewQuestion } from "../../components/Modal/styles";
import Select from "../../components/selects";
import Tag from "../../components/tag";

function Profile() {
  const student = getUser();

  return (
    <>
      <section>
        <img src={imgProfile} alt="imagem de Perfil" />
        <a href="a">Editar Foto</a>
      </section>
      <section>
        <strong>NOME:</strong>
        <p>{student.name}</p>
      </section>
      <section>
        <strong>RA:</strong>
        <p>{student.ra}</p>
      </section>
      <section>
        <strong>EMAIL:</strong>
        <p>{student.email}</p>
      </section>
    </>
  );
}

function Answer({ answer }) {
  const student = getUser();

  return (
    <section>
      <header>
        <img src={imgProfile} alt="imagem de Perfil" />
        <strong>
          Por{" "}
          {student.studentId === answer.Student.id
            ? "você"
            : answer.Student.name}
        </strong>
        <p>{format(new Date(answer.created_at), "dd/MM/yyyy 'às' HH:mm")}</p>
      </header>
      <p>{answer.description}</p>
    </section>
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
      return alert("A Resposta deve conter no mínimo 10 caracteres");
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

  const student = getUser();

  return (
    <QuestionCard>
      <header>
        <img src={imgProfile} alt="imagem de Perfil" />
        <strong>
          Por{" "}
          {student.studentId === question.Student.id
            ? "você"
            : question.Student.name}
        </strong>
        <p>
          Em {format(new Date(question.created_at), "dd/MM/yyyy 'às' HH:mm")}
        </p>
      </header>
      <section>
        <strong>{question.title}</strong>
        <p>{question.description}</p>
        <img src={question.image} alt="imagem da postagem" />
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
            {answers.map((a) => (
              <Answer answer={a} />
            ))}
          </>
        )}

        <form onSubmit={handleAddAnswer}>
          <textarea
            placeholder="Responda essa dúvida"
            onChange={(e) => setNewAnswer(e.target.value)}
            required
            value={newAnswer}
          ></textarea>
          <button>Enviar</button>
        </form>
      </footer>
    </QuestionCard>
  );
}

function NewQuestion() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        alert(error);
      }
    };
    loadCategories();
  }, []);

  return (
    <FormNewQuestion>
      <Input id="title" label="Título" />
      <Input id="description" label="Descrição" />
      <Input id="gist" label="Gist" />
      <Select id="categories" label="Categorias">
        {categories.map((c) => (
          <option value={c.id}>{c.description}</option>
        ))}
      </Select>
      <div>
        <Tag info="Backend"></Tag>
        <Tag info="Banco de dados"></Tag>
      </div>
      <Input type="file" />
      <button>Enviar</button>
    </FormNewQuestion>
  );
}

function Home() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);

  const [reload, setReload] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      const response = await api.get("/feed");
      setQuestions(response.data);
    };

    loadQuestions();
  }, [reload]);

  const handleSignOut = () => {
    signOut();

    history.replace("/");
  };

  const handleReload = () => {
    setReload(Math.random());
  };

  return (
    <>
      <Modal title="Faça uma pergunta">
        <NewQuestion />
      </Modal>
      <Container>
        <Header>
          <Logo src={logo} onClick={handleReload} />
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
    </>
  );
}

export default Home;
