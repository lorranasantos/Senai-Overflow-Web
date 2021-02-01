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

function Home() {
  return (
    <Container>
      <Header>
        <Logo src={logo} />
        <IconSignOut />
      </Header>
      <Content>
        <ProfileContainer>
          <Profile />
        </ProfileContainer>
        <FeedContainer>
          <QuestionCard>
            <header>
              <img src={imgProfile} />
              <strong>por Alcino cino</strong>
              <p>Em 12/12/2012 às 12:12</p>
            </header>
            <section>
              <strong>Título</strong>
              <p>Descrição</p>
              <img src="https://cdn.auth0.com/blog/illustrations/reactjs.png" />
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
                <textarea
                  placeholder="Responda essa dúvida"
                  required
                ></textarea>
                <button>Enviar</button>
              </form>
            </footer>
          </QuestionCard>
          <QuestionCard>
            <header>
              <img src={imgProfile} />
              <strong>por Alcino cino</strong>
              <p>Em 12/12/2012 às 12:12</p>
            </header>
            <section>
              <strong>Título</strong>
              <p>Descrição</p>
              <img src="https://cdn.auth0.com/blog/illustrations/reactjs.png" />
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
                <textarea
                  placeholder="Responda essa dúvida"
                  required
                ></textarea>
                <button>Enviar</button>
              </form>
            </footer>
          </QuestionCard>
        </FeedContainer>
        <ActionContainer>
          <button>Fazer uma Pergunta</button>
        </ActionContainer>
      </Content>
    </Container>
  );
}

export default Home;
