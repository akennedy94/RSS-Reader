import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'bulma-toast';
import { Link } from 'react-router-dom';

const DisplayPodcastSeries = ({ podcasts, setPodcasts }) => {

    const updateLocalPod = (id) => {
        const updatedProjects = podcasts.filter(podcast => podcast._id !== id);
        setPodcasts(updatedProjects);
    }

    // rerender component when new podcast added
    useEffect(() => {}, [podcasts])

    return (
        <div className="mt-6">
            <div>
                <h3>Podcast Feeds</h3>
            </div>
            <div id="hidden" className="active columns is-multiline px-2">
                { podcasts.map(podcast => {
                    return <PodcastSeries title={podcast.title} link={podcast.link} key={podcast._id} id={podcast._id} updateLocal={updateLocalPod}/>
                    })
                }
            </div>
        </div>
    )
}

const PodcastSeries = (props) => {
    const [detailedData, setDetailedData] = useState(null);
  
    async function handleDelete () {
        const remove = await axios.delete('/delete', {data: {id: props.id}})
            .then(response => { 
                console.log(response)
                if (response.status) {
                    props.updateLocal(props.id);
                    clickToastSuccess();
                } else {
                    clickToastFail();
                }
            }).catch(error => console.log(error))
      }
  
    const clickToastSuccess = () => toast({
        message: 'Podcast successfully deleted!',
        type: 'is-success',
        position: 'bottom-center',
        dismissible: true,
        animate: { in: 'fadeIn', out: 'fadeOut' },
      })
  
    const clickToastFail = () => toast({
      message: 'Something went wrong!',
      type: 'is-danger',
      position: 'center',
      dismissible: true,
      animate: { in: 'fadeIn', out: 'fadeOut' },
    })
  
    async function getDetailedInfo(link) {
      const podButton = document.getElementById(props.id);
  
      const podDeets = await axios.post('/podcastFeed', { link: link })
          .then(response => { setDetailedData(response.data) })
          .then(() => {
            podButton.classList.remove("is-loading");
            podButton.removeAttribute("disabled");
          })
          .catch(error => console.log(error))
    }

    useEffect(() => { getDetailedInfo(props.link) }, [])
  
    return (
      <div className="pod-box column is-quarter mt-4" >
        <Link to={
          { 
          pathname: `podcast/${props.id}`,
          props: {
            detailedData: detailedData,
            handleDelete: handleDelete
          }}}>
            <button className="button is-loading" id={props.id} disabled>
            {props.title}
            </button>
        </Link>
      </div>
    )
  }

export default DisplayPodcastSeries;