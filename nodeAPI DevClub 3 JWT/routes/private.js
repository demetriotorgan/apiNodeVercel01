import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient();

//Rota List
router.get('/listar-usuario', async (req,res)=>{
    try {
        const users = await prisma.user2.findMany()
        res.status(200).json({message:'Usários listados com sucesso', users})

    } catch (error) {
        res.status(500).json({message:'Falha no servidor'})
    }
})

export default router