import express from 'express'
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/private.js'
import auth from './middlewares/auth.js'


const app = express();
app.use(express.json());

//Rota Post
app.use('/', publicRoutes);
app.use('/', auth, privateRoutes);


app.listen(3000, ()=> console.log("Servidor Rodando"));

//String MONGODB
// mongodb+srv://deUser:UE4Rr6dktluIOGMa@cluster0.vi7idmi.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0