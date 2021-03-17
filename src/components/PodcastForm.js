import React, { useState, useEffect } from "react";
import "./componentCSS/podcastForm.css";
import axios from "axios";
import { toast } from "bulma-toast";
import DisplayPodcastSeries from "./DisplayPodcastSeries";

const PodcastForm = ({ podcasts, setPodContent }) => {
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({title: false, link: false});
  const validUrl = require("valid-url");

  // validate link
  const checkURL = (URL) => {
    return validUrl.isHttpsUri(URL);
  };

  const clickToastSuccess = () =>
    toast({
      message: "Podcast successfully added!",
      type: "is-success",
      position: "bottom-center",
      dismissible: true,
      animate: { in: "fadeIn", out: "fadeOut" },
    });

  const clickToastFail = (message) =>
    toast({
      message: message,
      type: "is-danger",
      position: "bottom-center",
      dismissible: true,
      animate: { in: "fadeIn", out: "fadeOut" },
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errorChecker = {...error};
    setError({title: false, link: false});

    if (!checkURL(link.trim()) && !title) {
      clickToastFail("Please fill out both fields!");
      setSubmitted(false);
      errorChecker.title = true;
      errorChecker.link = true;
      setError(errorChecker)
      return;
    } else if (!checkURL(link.trim())) {
      clickToastFail("Please enter a valid link!");
      setSubmitted(false);
      errorChecker.link = true;
      setError(errorChecker)
      return;
    } else if (!title) {
      clickToastFail("Please enter a title!");
      setSubmitted(false);
      errorChecker.title = true;
      setError(errorChecker);
      return;
    } else {
      const newPod = {
        title: title,
        link: link.trim(),
      };

      const savePod = axios.post("/save", newPod).then((response) => {
        const update = [...podcasts];
        update.push(response.data);
        setPodContent(update);
        setSubmitted(false);
      });

      setTitle("");
      setLink("");
      clickToastSuccess();
    }
  };

  useEffect(() => {}, [podcasts]);

  return (
    <div>
      <div className="wrapper">
        <div className="box mt-4">
          <h3>Enter a RSS link to a podcast below!</h3>
          <div className="form">
            <div className="field">
              <label className="label is-normal form-label">Link Name</label>
              <div className="control">
                <input
                  className={error.title ? "input form-error" : "input"}
                  type="text"
                  id="formInput"
                  placeholder="Ex. My Brother, My Brother, and Me"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="field ">
              <label className="label form-label">Link</label>
              <div className="control">
                <input
                  className={error.link ? "input form-error" : "input"}
                  type="text"
                  id="formInput"
                  placeholder="Ex. https://yourlinkhere.com"
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button
                  className={submitted ? "button is-loading disabled" : "button form"}
                  id="formSub"
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <DisplayPodcastSeries podcasts={podcasts} setPodcasts={setPodContent} />
      </div>
    </div>
  );
};

export default PodcastForm;
