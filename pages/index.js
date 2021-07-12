import GridMain from '../src/components/GridMain'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/components/libs/AluraCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.gitHubUser}.png`}/>
    </Box>
  )
}

export default function Home() {
  const gitHubUser = 'cesarlucasjunior';
  const listOfPeoples = [ 'juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'marcobrunodev', 'felipefialho'];
  return (
    <>
      <AlurakutMenu />
      <GridMain>
        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar gitHubUser={gitHubUser}/>
        </div>
        <div className='welcomeArea' style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className='title'>Bem-vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da Comunidade ({listOfPeoples.length})</h2>
            <ul>
                {listOfPeoples.map((itemAtual) => {
                  return (
                    <li>
                      <a href={`/users/${itemAtual}`} key={itemAtual}>
                        <img src={`https://github.com/${itemAtual}.png`} />
                        <span>{itemAtual}</span>
                      </a>
                    </li>
                  )
                })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>Comunidades</Box>
        </div>
      </GridMain>
    </>
  )
}