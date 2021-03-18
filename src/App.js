import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PodcastForm from "./components/PodcastForm";
import DetailDisplay from "./components/DetailDisplay";
import { toast } from "bulma-toast";

function App() {
  const [podContent, setPodContent] = useState([]);
  
  const updateLocalPod = (id) => {
    const updatedProjects = podContent.filter((podcast) => podcast._id !== id);
    setPodContent(updatedProjects);
  };

  async function getPodDatabase() {
    await axios
      .get("/podcasts")
      .then((response) => {
        setPodContent(response.data);
      })
      .catch((error) => console.log(error));
  }
  
  const clickToastSuccess = () =>
  toast({
    message: "Podcast successfully deleted!",
    type: "is-success",
    position: "bottom-center",
    dismissible: true,
    animate: { in: "fadeIn", out: "fadeOut" },
  });

  const clickToastFail = () =>
    toast({
      message: "Something went wrong!",
      type: "is-danger",
      position: "center",
      dismissible: true,
      animate: { in: "fadeIn", out: "fadeOut" },
    });

  async function handleDelete(confirm, endPoint) {
    if(confirm){
      const remove = await axios
      .delete("/delete", { data: { id: endPoint } })
      .then((response) => {
        if (response.status) {
          updateLocalPod(endPoint);
          clickToastSuccess();
        } else {
          clickToastFail();
        }
      })
      .catch((error) => console.log(error));
    }
  }


  useEffect(() => {
    getPodDatabase();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <PodcastForm
                podcasts={podContent}
                setPodContent={setPodContent}
              />
            )}
          />
          <Route
            exact
            path="/podcast/:podId"
            component={(match) => {return <DetailDisplay match={match} handleDelete={handleDelete}/>}}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
