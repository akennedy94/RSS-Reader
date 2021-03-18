import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const DisplayPodcastSeries = ({ podcasts, setPodcasts }) => {
  const updateLocalPod = (id) => {
    const updatedProjects = podcasts.filter((podcast) => podcast._id !== id);
    setPodcasts(updatedProjects);
  };
  
  // rerender component when new podcast added
  useEffect(() => {}, [podcasts]);

  return (
    <div className="mt-6">
      <div className="flex-center">
        {podcasts.length === 0 ? <EmptyCard /> : <h3>Podcast Feeds</h3>}
      </div>
      <div id="hidden" className="active columns is-multiline px-2">
        {podcasts.map((podcast) => {
          return (
            <PodcastSeries
              title={podcast.title}
              link={podcast.link}
              key={podcast._id}
              id={podcast._id}
              updateLocal={updateLocalPod}
            />
          );
        })}
      </div>
    </div>
  );
};

const PodcastSeries = (props) => {
    
  return (
    <div className="pod-box column is-quarter mt-4">
      <Link
        to={{
            pathname: `podcast/${props.id}`
          }
        }
      >
        <button
          className="button"
          id={props.id}
        >
          {props.title}
        </button>
      </Link>
    </div>
  );
};

const EmptyCard = () => {
  return (
    <div className="card card-size">
      <div className="card-content ">
        <div className="content">
          {`You haven't added any podcast feeds yet! \n
          When you do, they'll show up here!`}
        </div>
      </div>
    </div>
  );
};

export default DisplayPodcastSeries;
