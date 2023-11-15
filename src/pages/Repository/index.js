import { useParams } from "react-router-dom";
import { Container, Owner, Loading, BackButton, IssuesList, PageAction, StateFilters } from "./styles";
import {useState, useEffect} from 'react';
import {FaArrowLeft} from 'react-icons/fa'
import api from '../../services/api'
 
export default function Repository(){
    
    const name = useParams();

    const [repository, setRepository] = useState({});
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [state, setState] = useState('open')

    useEffect(() => {
      async function load() {
        const repoName = name;
    
        try {
          const [repositoryData, issuesData] = await Promise.all([
            api.get(`/repos/${repoName.repository}`),
            api.get(`/repos/${repoName.repository}/issues`, {
              params: {
                state: state,
                per_page: 5
              }
            }),
          ]);
    
          setRepository(repositoryData.data);
          setIssues(issuesData.data);
          setLoading(false);
        } catch (error) {
          console.error("API Error:", error);
        }
      }
    
      load();
    
    }, [name, state]);

    useEffect(()=> {

      async function loadIssue() {

        const response = await api.get(`/repos/${name.repository}/issues`, {
          params: {
            state: 'open',
            page: page,
            per_page: 5,
          },
        })

        setIssues(response.data)
      }

      loadIssue()

    }, [name, page])

    if (loading) {
      return(
        <Loading>
          <h1>Carregando...</h1>
        </Loading>
      )
    }

    function handlePage(action) {
      setPage(action === 'back' ? page - 1 : page + 1)
    }

    function handleFilter(filter) {
      if (filter === "all") {
        setState("all")
      }
      if (filter === "open") {
        setState("open")
      }
      if (filter === "closed") {
        setState("closed")
      }
    }
 
    return(
        <Container>
          <BackButton to="/">
            <FaArrowLeft color="#000" size={30}/>
          </BackButton>
          <Owner>
            <img src={repository.owner.avatar_url} alt={repository.owner.login}></img>
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
          </Owner>
          <StateFilters>
            <button type="button" disabled={state === "all"} onClick={()=>{handleFilter("all")}}>Todos</button>
            <button type="button" disabled={state === "open"} onClick={()=>{handleFilter("open")}}>Abertos</button>
            <button type="button" disabled={state === "closed"} onClick={()=>{handleFilter("closed")}}>Fechados</button>
          </StateFilters>
          <IssuesList>
            {
              issues.map(issue => (
                <li key={String(issue.id)}>
                  <img src={issue.user.avatar_url} alt={issue.user.login}/>

                  <div>
                    <strong>
                      <a href={issue.html_url}>
                        {issue.title}
                      </a>
                      <div>
                        {issue.labels.map(label => (
                          <span key={String(label.id)} row={true}>{label.name}</span>
                        ))}

                      </div>
                    </strong>
                    <p>{issue.user.login}</p>
                  </div>
                </li>
              ))
            }
          </IssuesList>
          <PageAction>
            <button type="button" disabled={page < 2} onClick={()=>handlePage('back')}>Voltar</button>
            <button type="button" onClick={()=>handlePage('next')}>Próximo</button>
          </PageAction>

        </Container>
    );
}