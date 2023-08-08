import { Router } from "express";

import * as JWT from "jsonwebtoken";

const router = Router();

router.post('/api/auth/verify', async (req,res) => {
    const { token, key } = req.body;
    try {
        JWT.verify(token, key);
        res.json({
            message: true
        })
    } catch (error) {
        res.json({
            message: false
        })
    }
})

export { router as authAPI }