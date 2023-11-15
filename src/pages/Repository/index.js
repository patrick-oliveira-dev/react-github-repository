import { useParams } from "react-router-dom";
import { Container, Owner, Loading, BackButton } from "./styles";
import {useState, useEffect} from 'react';
import {FaArrowLeft} from 'react-icons/fa'
import api from '../../services/api'
 
export default function Repository(){
    
    const name = useParams();

    const [repository, setRepository] = useState({});
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      async function load() {
        const repoName = name;
        console.log("Repo Name:", repoName);
    
        try {
          const [repositoryData, issuesData] = await Promise.all([
            api.get(`/repos/${repoName.repository}`),
            api.get(`/repos/${repoName.repository}/issues`, {
              params: {
                state: 'open',
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
    
    }, [name]);

    if (loading) {
      return(
        <Loading>
          <h1>Carregando...</h1>
        </Loading>
      )
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

        </Container>
    );
}