import pool from '../database/keys';

const authentication = {};

authentication.signUpRegistrationUser = async (req, res) => {
    const {name,lastname,email,telephone,address,password,role_id} = req.body;

   try {
       await pool.query('INSERT INTO usuarios (u_name,u_lastname,u_email,u_telephone,u_address,u_password,u_role_id) VALUES ($1,$2,$3,$4,$5,$6,$7)',[name,lastname,email,telephone,address,password,role_id]);
       res.status(200).json({
            message: "Registrado Correctamente en tabla Usuario",
            usuarios: {name,lastname,email,telephone,address,password,role_id},
       });
    } catch (error) {
        if (error.constraint == "usuarios_u_email_uk") {

            res.status(500).json({
                message:'El Email ya esta en uso por otro usuario',
                error,
            });

            
        } else {
            res.status(500).json({
                message: 'A ocurrido un error',
                error
            })
            
        }
    }
};

authentication.login = async (req,res)=> {
    const {email,password} = req.body;

    try {
        const usuario =await(await pool.query('SELECT * FROM usuarios WHERE u_email=$1 AND u_password=$2',[email,password])).rows;
        if (usuario.length > 0) {
            const {u_id,u_name,u_lastname,u_email} = usuario[0];
            res.status(200).json({
                id:u_id,
                name:u_name,
                lastname: u_lastname,
                email: u_email
                
            });
            
        } else {
            res.status(200).json({
                message: "El Usuario o Constraeña estan Erradas",
                NotFound: true,
            })
        }
        
    } catch (error) {

        res.status(500).json({
            message: "A ocurrido un error",
            error
        })
        
    }

};

module.exports = authentication;