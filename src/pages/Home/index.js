import {
  Container,
  Header,
  Content,
  ProfileContainer,
  FeedContainer,
  ActionContainer,
  QuestionCard,
} from "./style";

import imgProfile from "../../assets/foto_perfil.png";

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
                <img src="https://www.google.com/search?q=reactjs&safe=strict&rlz=1C1SQJL_pt-BRBR927BR927&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjZ4pTU9cHuAhW6HrkGHSWzCyIQ_AUoAXoECBUQAw&biw=967&bih=927#imgrc=43LG89qCxGo6aM" />
              </section>
              <footer></footer>
            </QuestionCard>
          </FeedContainer>
          <ActionContainer>
            <button>Fazer uma Pergunta</button>
          </ActionContainer>
        </Content>
      </Header>
    </Container>
  );
}

export default Home;
