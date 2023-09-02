import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import userRouter from './Routes/UserRoutes.js';
import { errorHandler } from './Middlewares/errorMiddleware.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB(app);

//Main Route
app.get('/', (req, res) => {
    res.send('API is running...');
});
//Other Route
app.use('/api/users', userRouter);

//error handling middleware
app.use(errorHandler);

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    const article = await db.collection('articles').findOne({ name });
    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;

    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 },
    })

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.send(`The ${name} article now has ${article.upvotes} upvotes`);
    } else {
        res.send (`That article does not exist`);
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text } },
    });

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.send(article.comments);
    } else {
        res.send (`That article does not exist`);
    }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost/${PORT}`);
});
