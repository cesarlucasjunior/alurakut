import React from 'react'
import GridMain from '../src/components/GridMain'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/components/libs/AluraCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar(props) {
  return (
    <Box as='aside'>
      <img src={`https://github.com/${props.gitHubUser}.png`}/>
      <hr />

      <p>
        <a className='boxLink' href={`https://github.com/${props.gitHubUser}`}>
          @{props.gitHubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return(
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">{props.title} ({props.items.length})</h2>
      <ul>
        {props.items.map((itemAtual) => {
          
            return (
              <li key={itemAtual.id}>
                <a href={`/users/${itemAtual.login}`} target='_blank'>
                  <img src={itemAtual.avatar_url} />
                  <span>{itemAtual.login}</span>
                </a>
              </li>
            )
          
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const [comunities, setComunities] = React.useState([]);
  const gitHubUser = 'cesarlucasjunior';
  const listOfPeoples = [ 'juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'marcobrunodev', 'felipefialho'];
  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(() => {
    fetch('https://api.github.com/users/cesarlucasjunior/followers')
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setSeguidores(response);
      });

    //Request para DatoCMS:
    fetch('https://graphql.datocms.com', {
      method: 'POST',
      headers: {
        'Authorization': 'c200cfece28eed14271bc041810474',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({'query': `
      query {
        allCommunities {
          id
          title
          creatorSlug
          imageUrl
        }
      }
      `})
    })
    .then(resp => resp.json())
    .then(respWithJson => {
      setComunities(respWithJson.data.allCommunities);
    })
  }, [])


  return (
    <>
      <AlurakutMenu githubUser={gitHubUser} />
      <GridMain>
        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar gitHubUser={gitHubUser}/>
        </div>
        <div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className='title'>Bem-vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className='subTitle'>O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateComunity(event) {
              event.preventDefault();
              const formDatas = new FormData(event.target);
              const newComunity = {
                // id: new Date().toISOString(),
                title: formDatas.get('title'),
                imageUrl: formDatas.get('image'),
                creatorSlug: gitHubUser,
              }
              fetch('/api/comunities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(newComunity)
              }).then(async (response) => {
                  const resposta = await response.json();
                  setComunities([...comunities, resposta.registroCriado]);
              })
            }}>
              <div>
                <input 
                  placeholder='Qual vai ser o nome da sua comunidade?' 
                  name='title' 
                  aria-label='Qual vai ser o nome da sua comunidade?'
                  type='text'
                />
              </div>
              <div>
                <input 
                  placeholder='Coloque uma URL para usarmos de capa' 
                  name='image' 
                  aria-label='Coloque uma URL para usarmos de capa'
                  type='text'
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={seguidores}/>          
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da Comunidade ({listOfPeoples.length})</h2>
            <ul>
                {listOfPeoples.map((itemAtual) => {
                  return (
                    <li key={itemAtual}>
                      <a href={`https://github.com/${itemAtual}`} target='_blank'>
                        <img src={`https://github.com/${itemAtual}.png`} />
                        <span>{itemAtual}</span>
                      </a>
                    </li>
                  )
                })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunities.length})</h2>
            <ul>
              {comunities.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.imageUrl}`} target='_blank'>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.creatorSlug}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            </ProfileRelationsBoxWrapper>
        </div>
      </GridMain>
    </>
  )
}