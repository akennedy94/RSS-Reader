import React, { useState, useEffect } from "react";
import "./componentCSS/podcastSeries.css";
import { Link, useHistory } from "react-router-dom";

const SinglePod = ({ match }) => {
  return (
    <DetailDisplay
      detailedData={match.location.props.detailedData}
      handleDelete={match.location.props.handleDelete}
    />
  );
};

const DetailDisplay = ({ detailedData, handleDelete }) => {
  const [search, setSearch] = useState("");
  const [selectedPod, setSelectedPod] = useState({});
  const [display, setDisplay] = useState(false);
  const history = useHistory();

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
      handleDelete();
      history.push("/");
    }
  };

  // rerender component on search
  useEffect(() => {}, [search]);

  return (
    <div>
      <div className="title">{detailedData.title}</div>

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
            src={detailedData.image.url}
            alt="pod icon"
          ></img>
        </div>
        <div className="column is-one-third list-container">
          <ul>
            <PodFeed
              detailedData={detailedData}
              search={search}
              select={handleDisplay}
            />
          </ul>
        </div>
        <div className="column is-one-third show-description">
          <div>
            <div className="title-container">
              <h4 className="feed-title">{detailedData.description}</h4>
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

export default SinglePod;
