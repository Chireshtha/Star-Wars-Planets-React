import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import PlanetCard from './PlanetCard';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter} from 'react-router-dom';
import Navbar from './Navbar';


function App() {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState();
  const [residentsInfo, setResidentsInfo] = useState([]);

  // using axios api extracting data from url
  useEffect(() => {
    axios.get("https://swapi.dev/api/planets/?format=json")
      .then((response) => {
        setPlanets(response.data.results);
        setNextPage(response.data.next);
        console.log("planets Data", response.data);
      })
      .catch((error) => {
        console.log("No Data Found", error.response.data);
      });
  }, []);

  //Using axios sends an HTTP get request to load next pages  
  const loadNextPages = () =>{
    if(nextPage){
      axios.get(nextPage)
      .then((response)=>{
        setPlanets(prevPlanets => [...prevPlanets, ...response.data.results])
        setNextPage(response.data.next)
      })
      .catch((error)=>{
        console.log("While fetching planets getting error", error)
      })
    }
  }


  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />
      <PlanetCard planets = {planets} loadNextPages = {loadNextPages} residentsInfo={residentsInfo} setResidentsInfo ={setResidentsInfo}  />
      {nextPage && (
        <button className='btn btn-success' onClick={loadNextPages}> Show More</button>
      )}
    </div>
    </BrowserRouter>
  );
}

export default App;
