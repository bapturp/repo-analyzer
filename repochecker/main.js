import mongoose from "mongoose";
import https from "https";

let conn = null;

const uri =
  "mongodb+srv://yo7AgqB4KMEo9TmHP4Wb:L0onJRKbZAAUgjPw@cluster1.xx6kbup.mongodb.net/repoanalyzer?retryWrites=true&w=majority";

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (conn == null) {
    conn = mongoose.createConnection(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    await conn.asPromise();

    conn.model("Analysis", new mongoose.Schema({ name: String }));
  }

  const analysis = conn.model("Analysis");

  const doc = await analysis.findById(event.Records[0].body);

  const response = {
    statusCode: 200,
    body: doc,
  };
  return response;
};

function checkFileInGitHub(repository) {
  return new Promise((resolve, reject) => {
    const options = {
      host: "api.github.com",
      path: `/repos/${repository}/contents/package.json`,
      headers: {
        "User-Agent": "AWS-Lambda", // GitHub API requires a User-Agent header
      },
    };

    https
      .get(options, (res) => {
        if (res.statusCode === 200) {
          resolve(true);
        } else if (res.statusCode === 404) {
          resolve(false);
        } else {
          reject(
            new Error(
              `GitHub API request failed with status code ${res.statusCode}`
            )
          );
        }
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
