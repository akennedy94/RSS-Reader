import React, { useState, useEffect } from "react";
import "./componentCSS/podcastSeries.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const DetailDisplay = ({ match, handleDelete }) => {
  const [search, setSearch] = useState("");
  const [selectedPod, setSelectedPod] = useState({});
  const [display, setDisplay] = useState(false);
  const [feedData, setFeedData] = useState(null);
  const [error, setError] = useState(false);
  const history = useHistory();
  const endPoint = match.match.params.podId;

  async function getDetailedInfo(endPoint) {
    const podDeets = await axios
      .get(`/podcastFeed/${endPoint}`, { id: endPoint })
      .then((response) => {
        if (!response.data.status) {
          setError(true);
          return;
        }
        setFeedData(response.data.feed);
      })
      .catch((error) => console.log(error));
  }

  // cleanup search input
  const handleSearch = (e) => {
    const string = e;
    setSearch(string.trim().toLowerCase());
  };

  const handleDisplay = (pod) => {
    if (!display) {
      setDisplay(true);
      setSelectedPod(pod);
    } else {
      setSelectedPod(pod);
    }
  };

  const handleButtonClick = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this feed?"
    );
    if (confirm) {
      handleDelete(confirm, endPoint);
      history.push("/");
    }
  };

  useEffect(() => {
    getDetailedInfo(endPoint);
  }, [endPoint]);

  // rerender component on search
  useEffect(() => {}, [search]);

  return (
    <React.Fragment>
      {feedData === null ? (
        <LoadingCard error={error} handleButtonClick={handleButtonClick} />
      ) : (
        <div>
          <div className="title">{feedData.title}</div>

          <div className="columns">
            <div className="column mt-3 search">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="searchInput"
                  placeholder="Search for an episode!"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-one-third pod-image-container">
              <img
                className="pod-Img px-5 pb-3"
                src={feedData.image.url}
                alt="pod icon"
              ></img>
            </div>
            <div className="column is-one-third list-container">
              <ul>
                <PodFeed
                  detailedData={feedData}
                  search={search}
                  select={handleDisplay}
                />
              </ul>
            </div>
            <div className="column is-one-third show-description">
              <div>
                <div className="title-container">
                  <h4 className="feed-title">{feedData.description}</h4>
                </div>

                {display ? <SelectedDisplay podcast={selectedPod} /> : null}
              </div>
            </div>
          </div>
          <div className="back-button">
            <Link to="/">
              <button className="button is-normal">Go back</button>
            </Link>
          </div>
          <div className="del-button">
            <button className="button is-danger" onClick={handleButtonClick}>
              Delete
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

const SelectedDisplay = ({ podcast }) => {
  return (
    <div className="selection-container">
      <div className="episode-title">{podcast.title}</div>
      <div>
        <p>{podcast.contentSnippet}</p>
      </div>
      <div className="mt-2 audio-player">
        <audio controls preload="none">
          <source src={podcast.enclosure.url} type={podcast.enclosure.type} />
        </audio>
      </div>
    </div>
  );
};

const PodFeed = ({ detailedData, search, select }) => {
  return detailedData.items
    .filter((item) => item.title.toLowerCase().includes(search))
    .map((item) => {
      return (
        <li className="mt-2 mb-2" key={item.guid}>
          <div className="columns">
            <div className="column">
              <button className="button episode" onClick={() => select(item)}>
                {item.title}
              </button>
            </div>
          </div>
        </li>
      );
    });
};

const LoadingCard = ({ error, handleButtonClick }) => {
  useEffect(() => {}, [error]);

  return (
    <React.Fragment>
      {error ? (
        <div className="loading-section">
          <div className="card ">
            <div className="card-content card-width">
              <div className="content">
                <p class="title is-4">
                  Uh oh! It looks like something went wrong with loading the RSS
                  feed
                </p>
                <p>
                  This error most commonly occurs when the link provided doesn't
                  direct to an RSS feed, try double checking the link and trying
                  again!
                </p>
              </div>
            </div>
            <div className="back-button">
              <Link to="/">
                <button className="button is-normal">Go back</button>
              </Link>
            </div>
            <div className="del-button">
              <button className="button is-danger" onClick={handleButtonClick}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="loading-section">
            <button className="button is-loading"></button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DetailDisplay;
