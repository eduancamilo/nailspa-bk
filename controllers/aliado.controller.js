import pool from '../database/keys';

const aliado = {};

aliado.createCita = async (req, res) => {

    const {cli_name,cli_lastname, c_date,c_time,email,cli_address,cli_telephone,c_s_id,c_u_id, c_cli_id} = req.body;

    try {
        await pool.query('INSERT INTO clientes(cli_name,cli_lastname,cli_telephone,cli_email,cli_address) VALUES ($1,$2,$3,$4,$5)',[cli_name,cli_lastname,cli_telephone,email,cli_address]);     
        await pool.query('INSERT INTO citas(c_date,c_time,c_s_id,c_u_id,c_cli_id) VALUES ($1,$2,$3,$4,$5)', [c_date, c_time, c_s_id, c_u_id, c_cli_id]);
        res.status(200).json({
            message: 'Cita registrada Correctamente',
            cita: {
                c_date,
                c_time
            }
        });
      
       
       
    } catch (error) {
        res.status(500).json({
            message: 'A ocurrido un error!!',
            error
        })
    }
}

aliado.updateCita = async (req, res) => {
    const id = req.params.c_id;
    const {
        state
    } = req.body;
    console.log(state);
    try {
        await pool.query('UPDATE citas SET c_state=$1 WHERE c_id=$2', [state, id]);
        res.status(200).json({
            message: 'Estado de Cita Actualizada Correctamente',
            cita: {
                state
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'A ocurrido un error!!',
            error
        })

    }

}
module.exports = aliado;