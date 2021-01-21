import React, { useState, useEffect } from 'react';
import './componentCSS/podcastForm.css';
import axios from 'axios';
import { toast } from 'bulma-toast';
import DisplayPodcastSeries from './DisplayPodcastSeries';

const PodcastForm = ({podcasts, setPodContent}) => {
    const [title, setTitle] = useState(null);
    const [link, setLink] = useState('');
    
    // validate link
    const checkURL = (URL) => {
        const validUrl = require('valid-url');
        return validUrl.isHttpsUri(URL);
    }

    const clickToastSuccess = () => toast({
        message: 'Podcast successfully added!',
        type: 'is-success',
        position: 'bottom-center',
        dismissible: true,
        animate: { in: 'fadeIn', out: 'fadeOut' },
    })

    const clickToastFail = (message) => toast({
      message: message,
      type: 'is-danger',
      position: 'bottom-center',
      dismissible: true,
      animate: { in: 'fadeIn', out: 'fadeOut' },
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const formInputs = document.querySelectorAll("#formInput");
        formInputs.forEach(input => input.style.borderColor = "#dbdbdb");
        const button = document.getElementById("formSub");

        button.classList.add("is-loading");

        if(!checkURL(link.trim()) && !title){
            formInputs.forEach(input => input.style.borderColor = "red");
            clickToastFail("Please fill out the form!");
            button.classList.remove("is-loading");
            return
        } else if (!checkURL(link.trim())) {
            formInputs[1].style.borderColor = "red";
            clickToastFail("Please enter a valid link!");
            button.classList.remove("is-loading");
            return
        } else if (!title) {
            formInputs[0].style.borderColor = "red";
            clickToastFail("Please enter a title!");
            button.classList.remove("is-loading");
            return
        } else {

            formInputs.forEach(input => input.style.borderColor = "#dbdbdb");
            const newPod = {
                title: title,
                link: link.trim()
            }

            const savePod = axios.post('/save', newPod)
                .then(response => {
                    const update = [...podcasts];
                    update.push(response.data);
                    setPodContent(update);
                })

            formInputs.forEach(input => input.value = "")

            setTitle('');
            setLink('');
            clickToastSuccess();
            button.classList.remove("is-loading");
        }
    }

    useEffect(() => {}, [podcasts])

    return (
        <div>
            <div className="wrapper">
                <div className="box mt-4">
                    <h3>Enter a RSS link to a podcast below!</h3>
                    <div className="form">
                        <div className="field">
                            <label className="label is-normal form-label">Link Name</label>
                            <div className="control">
                                <input className="input" type="text" id="formInput" placeholder="Ex. My Brother, My Brother, and Me" onChange={e => setTitle(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field ">
                            <label className="label form-label">Link</label>
                            <div className="control" >
                                <input className="input" type="text" id="formInput" placeholder="Ex. https://yourlinkhere.com" onChange={e => setLink(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button className="button form" id="formSub" onClick={e => handleSubmit(e)}>
                                Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <DisplayPodcastSeries podcasts={podcasts} setPodcasts={setPodContent}/>
            </div>
        </div>
    )
}

export default PodcastForm;