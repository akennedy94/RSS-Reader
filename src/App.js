import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from "react-router-dom";
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PodcastForm from './components/PodcastForm';
import SinglePod from './components/SinglePod';

function App() {  
  const [podContent, setPodContent] = useState([]);

  async function getPodDatabase() {
    await axios.get('/podcasts')
      .then(response => {
        setPodContent(response.data);
      })
      .catch(error => console.log(error))
  } 
  
  useEffect(() => {getPodDatabase()}, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={() => <PodcastForm podcasts={podContent} setPodContent={setPodContent}/>} />
          <Route exact path="/podcast/:podId" component={(match) => <SinglePod match={match}/>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;