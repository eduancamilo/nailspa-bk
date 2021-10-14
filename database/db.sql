CREATE DATABASE nailspa;

CREATE TABLE roles(
    rol_id SERIAL NOT NULL,
    rol_name VARCHAR(50) NOT NULL,
    CONSTRAINT roles_rol_id_pk PRIMARY KEY (rol_id),
    CONSTRAINT roles_rol_name_uk UNIQUE (rol_name)
);

CREATE TABLE usuarios (
    u_id SERIAL NOT NULL,
    u_name VARCHAR(100) NOT NULL,
    u_lastname VARCHAR(100) NOT NULL,
    u_email VARCHAR(100) NOT NULL,
    u_telephone VARCHAR(20) NOT NULL,
    u_address VARCHAR(50) NOT NULL,
    u_password VARCHAR(256) NOT NULL,
    u_role_id int,
    CONSTRAINT usuarios_u_id_pk PRIMARY KEY(u_id),
    CONSTRAINT usuarios_u_email_uk UNIQUE(u_email),
    CONSTRAINT usuarios_u_role_id_fk FOREIGN KEY (u_role_id)
        REFERENCES roles (rol_id) ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE clientes(
    cli_id SERIAL NOT NULL,
    cli_name VARCHAR(100) NOT NULL,
    cli_lastname VARCHAR(100) NOT NULL,
    cli_telephone VARCHAR(20) NOT NULL,
    cli_email VARCHAR(100) NOT NULL,
    cli_address VARCHAR(50) NOT NULL,
    CONSTRAINT clientes_id_cli_pk PRIMARY KEY(cli_id),
    CONSTRAINT clientes_cli_email_uk UNIQUE (cli_email)
   );

CREATE TABLE servicios (
    s_id SERIAL NOT NULL,
    s_name VARCHAR(50) NOT NULL,
    s_value INTEGER,
    s_tipo VARCHAR(20) NOT NULL DEFAULT 'Sede',
    s_u_id int,
    CONSTRAINT servicios_s_id_pk PRIMARY KEY(s_id),
    CONSTRAINT servicios_s_u_id_fk FOREIGN KEY (s_u_id)
        REFERENCES usuarios (u_id) ON UPDATE RESTRICT ON DELETE RESTRICT

 );

 CREATE TABLE citas (
     c_id SERIAL NOT NULL,
     c_date DATE NOT NULL,
     c_time TIME NOT NULL,
     c_creationDate DATE NOT NULL DEFAULT CURRENT_DATE,
     c_state VARCHAR(50) NOT NULL DEFAULT 'Pendiente',
     c_s_id int,
     c_u_id int,
     c_cli_id int,
     CONSTRAINT citas_c_id_pk PRIMARY KEY(c_id),
     CONSTRAINT citas_c_s_id_fk FOREIGN KEY(c_s_id)
        REFERENCES servicios(s_id) ON UPDATE RESTRICT ON DELETE RESTRICT,
     CONSTRAINT citas_c_u_id_fk FOREIGN KEY(c_u_id)
        REFERENCES usuarios(u_id) ON UPDATE RESTRICT ON DELETE RESTRICT,
     CONSTRAINT citas_cli_id_fk FOREIGN KEY(c_cli_id)
        REFERENCES clientes(cli_id) ON UPDATE RESTRICT ON DELETE RESTRICT
     
  
 );

 /* CONSULTA DE CITAS COMPLETA*/

 select ci.c_date,ci.c_time,ci.c_state,s_name,s_value,u_name,cli_name from citas as ci 
    join servicios as s on c_s_id=s.s_id 
    join usuarios as u on c_u_id=u.u_id 
    join clientes as cli on c_cli_id=cli.cli_id;
