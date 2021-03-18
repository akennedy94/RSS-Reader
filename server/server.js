const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 3005;

const database = require("./serverDatabase");
const bodyParser = require("body-parser");

const Parser = require("rss-parser");
const parser = new Parser();

app
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use("/", express.static(path.join(__dirname, "../build")));

async function getFeed(URL) {
  return new Promise((resolve, reject) => {
    const feed = parser.parseURL(URL, (err, feed) => {
      if (err) reject({ status: false, err: err });

      if (feed) resolve({ status: true, feed: feed });
    });
  });
}

app.get("/podcasts", async (req, res) => {
  const getPodLinks = await database
    .getAllPods()
    .then((response) => {
      if (response.status) {
        res.send(response.docs).status(200);
      } else res.status(404);
    })
    .catch((error) => console.log(error));
});

app.get("/podcastFeed/:id", async (req, res) => {
  const id = req.params.id;
  const getSinglePodFeed = await database
    .getSinglePod(id)
    .then(async (response) => {
      if (response.status) {
        const podFeed = await getFeed(response.doc[0].link).then((response) => {
          if (response.status) {
            res.send({ status: true, feed: response.feed }).status(200);
          } else res.send(response.status).status(404);
        });
      } else res.status(404);
    })
    .catch((error) => {
      console.log(error);
      res.send({ status: false }).status(404);
    });
});

app.post("/podcastFeed", async (req, res) => {
  const podFeed = await getFeed(req.body.link)
    .then((response) => {
      if (response.status) {
        res.send(response.feed).status(200);
      } else {
        res.status(404);
      }
    })
    .catch((error) => console.log(error));
});

app.post("/save", async (req, res) => {
  const savePod = await database
    .saveNewPod(req.body)
    .then((response) => {
      if (response.status) {
        res.send(response.doc).status(200);
      } else res.status(500);
    })
    .catch((error) => console.log(error));
});

app.patch("/update", async (req, res) => {
  const updatePod = await database
    .updatePod(req.body)
    .then((response) => {
      if (response.status) {
        res.send(response.docs).status(204);
      } else res.status(500);
    })
    .catch((error) => console.log(error));
});

app.delete("/delete", async (req, res) => {
  const deletePod = await database
    .deletePod(req.body.id)
    .then((response) => {
      if (response.status) {
        res.send(response.status).status(202);
      } else res.status(500);
    })
    .catch((error) => console.log(error));
});

// catch all
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(PORT, () => {
  console.log("server running on PORT: ", PORT);
  console.log(path.join(__dirname, "../build"));
});
