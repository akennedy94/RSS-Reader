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
<<<<<<< HEAD
  const [detailedData, setDetailedData] = useState(null);
  async function getDetailedInfo(link) {
    const podDeets = await axios
      .post("/podcastFeed", { link: link })
      .then((response) => {
        setDetailedData(response.data);
      })
      .catch((error) => console.log(error));
  }

  async function handleDelete() {
    const remove = await axios
      .delete("/delete", { data: { id: props.id } })
      .then((response) => {
        if (response.status) {
          props.updateLocal(props.id);
          clickToastSuccess();
        } else {
          clickToastFail();
        }
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

  useEffect(() => {
    getDetailedInfo(props.link);
  }, []);

=======
>>>>>>> e8a181b973ab437d6e1828a80f7ae81934079497
  return (
    <div className="pod-box column is-quarter mt-4">
      <Link
        to={{
          pathname: `podcast/${props.id}`,
        }}
      >
        <button className="button" id={props.id}>
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
