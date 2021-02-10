import { useEffect, useState, useRef } from "react";
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
import { signOut, getUser, setUser } from "../../services/security";
import Modal from "../../components/Modal";
import { FormNewQuestion } from "../../components/Modal/styles";
import Select from "../../components/selects";
import Tag from "../../components/tag";
import Loading from "../../components/Loading";
import { validSquaredImage } from "../../utils";

function Profile({ setIsLoading, handleReload, setMessage }) {
  const [student, setStudent] = useState(getUser());

  // useEffect(() => {
  //   setStudent(getUser());
  // }, []);

  const handleImage = async (e) => {
    if (!e.target.files[0]) return;

    try {
      await validSquaredImage(e.target.files[0]);

      const data = new FormData();

      data.append("image", e.target.files[0]);

      setIsLoading(true);

      const response = await api.post(`/students/${student.id}/images`, data);

      setTimeout(() => {
        setStudent({ ...student, image: response.data.image });
        handleReload();
      }, 1000);

      setUser({ ...student, image: response.data.image });
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <section>
        <img src={student.image || imgProfile} alt="imagem de Perfil" />
        <label htmlFor="editImageProfile">Editar Foto</label>
        <input id="editImageProfile" type="file" onChange={handleImage} />
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
        <img src={answer.Student.image || imgProfile} alt="imagem de Perfil" />
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

function Question({ question, setIsLoading }) {
  const [showAnswers, SetShowAnswers] = useState(false);

  const [newAnswer, setNewAnswer] = useState("");

  const [answers, setAnswers] = useState(question.Answers);

  const qtdAnswers = answers.length;

  useEffect(() => {
    setAnswers(question.Answers);
  }, [question.Answers]);

  const handleAddAnswer = async (e) => {
    e.preventDefault();

    if (newAnswer.length < 10)
      return alert("A Resposta deve conter no mínimo 10 caracteres");
    setIsLoading(true);
    try {
      const response = await api.post(`/questions/${question.id}/answers`, {
        description: newAnswer,
      });

      const aluno = getUser();

      const answerAdded = {
        id: response.data.id,
        description: newAnswer,
        created_at: response.data.createdAt,
        Student: {
          id: aluno.studentId,
          name: aluno.name,
          image: aluno.image,
        },
      };

      setAnswers([...answers, answerAdded]);
      setNewAnswer("");
      setIsLoading(false);
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  const student = getUser();

  return (
    <QuestionCard>
      <header>
        <img
          src={question.Student.image || imgProfile}
          alt="imagem de Perfil"
        />
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

function NewQuestion({ handleReload, setIsLoading }) {
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
    gist: "",
  });
  const [categories, setCategories] = useState([]);

  const [categoriesSel, setCategoriesSel] = useState([]);

  const [image, setImage] = useState(null);

  const imageRef = useRef();

  const categoriesRef = useRef();

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);

      const response = await api.get("/categories");
      setCategories(response.data);
      setIsLoading(false);
    };
    loadCategories();
  }, []);

  const handleCategories = (e) => {
    const idSel = e.target.value;

    const categorySel = categories.find((c) => c.id.toString() === idSel);

    if (!categoriesSel.includes(categorySel)) {
      setCategoriesSel([...categoriesSel, categorySel]);
    }
    e.target[e.target.selectedIndex].disabled = true;
    e.target.value = "";
  };

  const handleImage = (e) => {
    if (e.target.files[0]) {
      imageRef.current.src = URL.createObjectURL(e.target.files[0]);
      imageRef.current.style.display = "flex";
    } else {
      imageRef.current.src = "";
      imageRef.current.style.display = "none";
    }

    setImage(e.target.files[0]);
  };

  const handleUnselCategory = (idUnsel) => {
    setCategoriesSel(categoriesSel.filter((c) => c.id !== idUnsel));

    const { options } = categoriesRef.current;

    for (var i = 0; i < options.length; i++) {
      if (options[i].value === idUnsel.toString()) options[i].disabled = false;
    }
  };

  const handleInput = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.id]: e.target.value });
  };

  const handleAddNewQuestion = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", newQuestion.title);
    data.append("description", newQuestion.description);

    const categories = categoriesSel.reduce((s, c) => (s += c.id + ","), "");
    data.append("categories", categories.substr(0, categories.length - 1));

    if (image) data.append("image", image);
    if (newQuestion.gist) data.append("gist", newQuestion.gist);

    setIsLoading(true);

    try {
      await api.post("/questions", data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      handleReload();
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };
  return (
    <>
      <FormNewQuestion onSubmit={handleAddNewQuestion}>
        <Input
          id="title"
          label="Título"
          value={newQuestion.title}
          handler={handleInput}
          required
        />
        <Input
          id="description"
          label="Descrição"
          value={newQuestion.description}
          handler={handleInput}
          required
        />
        <Input
          id="gist"
          label="Gist"
          value={newQuestion.gist}
          handler={handleInput}
        />
        <Select
          id="categories"
          label="Categorias"
          handler={handleCategories}
          ref={categoriesRef}
        >
          <option value="" selected disabled>
            Selecione
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.description}
            </option>
          ))}
        </Select>
        <div>
          {categoriesSel.map((c) => (
            <Tag
              key={c.id}
              info={c.description}
              handleClose={() => handleUnselCategory(c.id)}
            ></Tag>
          ))}
        </div>
        <input type="file" onChange={handleImage} />
        <img alt="Pré-visualização" ref={imageRef} />
        <button>Enviar</button>
      </FormNewQuestion>
    </>
  );
}

function Home() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);

  const [reload, setReload] = useState(null);

  const [showNewQuestion, setShowNewQuestion] = useState();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      const response = await api.get("/feed");
      setQuestions(response.data);

      setIsLoading(false);
    };
    loadQuestions();
  }, [reload]);

  const handleSignOut = () => {
    signOut();

    history.replace("/");
  };

  const handleReload = () => {
    setShowNewQuestion(false);
    setReload(Math.random());
  };

  return (
    <>
      {isLoading && <Loading />}
      {showNewQuestion && (
        <Modal
          title="Faça uma pergunta"
          handleClose={() => setShowNewQuestion(false)}
        >
          <NewQuestion
            handleReload={handleReload}
            setIsLoading={setIsLoading}
          />
        </Modal>
      )}
      <Container>
        <Header>
          <Logo src={logo} onClick={handleReload} />
          <IconSignOut onClick={handleSignOut} />
        </Header>
        <Content>
          <ProfileContainer>
            <Profile handleReload={handleReload} setIsLoading={setIsLoading} />
          </ProfileContainer>
          <FeedContainer>
            {questions.map((q) => (
              <Question question={q} setIsLoading={setIsLoading} />
            ))}
          </FeedContainer>
          <ActionContainer>
            <button onClick={() => setShowNewQuestion(true)}>
              Fazer uma Pergunta
            </button>
          </ActionContainer>
        </Content>
      </Container>
    </>
  );
}

export default Home;
