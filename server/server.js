const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');
const { Configuration, OpenAIApi } = require("openai");
const dummyData = require('./dummydata.js');
const { auth } = require('express-oauth2-jwt-bearer');
const { AuthenticationClient } = require('auth0');

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
//client/dist
const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "dist");
app.use(express.static(REACT_BUILD_DIR));
app.use(express.json());
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const jwtCheck = auth({
    audience: process.env.IDENTIFIER,
    issuerBaseURL: 'https://dev-8ijhw6j7na5tmfoy.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

  const auth0 = new AuthenticationClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
  });

// creates an endpoint for the route "/""
app.get('/', (req, res) => {
    //res.json({ message: 'Hola, from My template ExpressJS with React-Vite' });
    res.sendFile(path.join(REACT_BUILD_DIR, "index.html"));
});

// create the get request for users in the endpoint '/api/users'
app.get('/api/users', async (req, res) => {
    try {
        const { rows: users } = await db.query('SELECT * FROM users');
        //console.log(users);
        res.send(users);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// create the get request that will do a post request for prompts in the endpoint api/get-sql-schemes
app.get('/api/get-sql-schemes', async (req, res) => {
    try {
        const { rows: posts } = await db.query('SELECT * FROM posts');
        // DO-NO DELETE - Commented for not doing API calls directly while testing frontend
        // const response = await openai.createCompletion({
        //     model: "text-davinci-003",
        //     prompt: prompt,
        //     temperature: 0.3,
        //     max_tokens: 256,
        //     n: 1,
        //     frequency_penalty: 0,
        //     presence_penalty: 0

        // })
        let resultDB = posts
        //console.log(resultDB);
        res.json(resultDB)
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate SQL scheme' });
    }
  });
  
const userRequired = async (req, res, next) => {
    const userProfile = await auth0.getProfile(req.auth.token);
    //console.log(userProfile);
    const newUser = {
        id: userProfile.sub,
        name: userProfile.name,
        email: userProfile.email,
    };
    //console.log(newUser);
    let result;
    try{
        result = await db.query('SELECT * from users WHERE id=$1', [newUser.id]);
        if(result.rows.length === 0){
            result = await db.query(
                'INSERT INTO users(id, name, email) VALUES($1, $2, $3) RETURNING *',
                [newUser.id, newUser.name, newUser.email],
            );
            //console.log(result.rows[0]);
        }
    } catch(e){
        console.log(e);
        return res.status(400).json({ e });
    }
    req.user = result.rows[0];
    next()
}

// // create the POST request
app.post('/api/post-sql-schemes', jwtCheck, userRequired, async (req, res) => {
    const newPost = {
        author_id: req.user.id,
        title: req.body.search,
        content: dummyData.sqlScheme[0].text,
        create_at: new Date()
    }
    //console.log(newPost);
    const result = await db.query(
        'INSERT INTO posts(author_id, title, content, create_at) VALUES($1, $2, $3, $4) RETURNING *',
        [newPost.author_id, newPost.title, newPost.content, newPost.create_at],
    );
    //console.log(result.rows[0]);
    res.json(result.rows[0]);
 });


 // // create the POST request for the FAVORITES
app.post('/api/favorites', async (req, res) => {
    const newFavorite = {
        user_id: req.body.user,
        post_id: req.body.postid,
    };
    let result;
    try{
        //console.log("Line 128 server", newFavorite);
    result = await db.query(
        'INSERT INTO favorites(user_id, post_id) VALUES($1, $2) RETURNING *',
        [newFavorite.user_id, newFavorite.post_id],
    );
    console.log(result.rows[0]);

    } catch(e){
        console.log(e)

    }
    
 });


// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
});