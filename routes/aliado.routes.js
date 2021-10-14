import express from 'express';
import aliado from '../controllers/aliado.controller';

const router = express.Router();

router.post('/cita',aliado.createCita);
router.put('/cita/:c_id',aliado.updateCita);

module.exports=router;