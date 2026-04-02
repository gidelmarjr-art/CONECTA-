-- Criando banco de dados:
CREATE DATABASE CONECTA_DB DEFAULT CHARACTER SET = 'utf8mb4';

-- Selecionando database:

USE CONECTA_DB;

-- Criando as tabelas:
-- Tabela com dados das ONGs:

CREATE TABLE ONG_DATA(
    name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(14) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    public_space VARCHAR(255) NOT NULL,
    addess_number VARCHAR(10) NOT NULL,
    supplement VARCHAR(255),
    neighborhood VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zipcode CHAR(15) NOT NULL,
    representative_name VARCHAR(255) NOT NULL,
    objectives TEXT NOT NULL,
    fundation_date DATE NOT NULL,
    cadastration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cnpj),
    UNIQUE (name, cnpj)
) COMMENT 'Tabela para armazenar as informações das ONGs';

-- Tabela para as vagas:

CREATE TABLE Volunteer_data(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    supplement VARCHAR(255),
    type ENUM("In-person", "Remote", "Hybrid"),
    time ENUM("Morning", "Afternoon", "Evening", "Weekend"),
    requirements VARCHAR(2500),
    service_type ENUM("Beginner", "Intermediate", "Specialist"),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ongname VARCHAR(255),
    ong_cnpj VARCHAR(14),
    FOREIGN KEY (ongname, ong_cnpj) REFERENCES ONG_DATA(name, cnpj)
) COMMENT 'Tabela para armazenar as informações dos voluntários';

-- Tabela para os usuários:

CREATE TABLE User_data(  
    name VARCHAR(100) NOT NULL PRIMARY KEY,
    familyname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pictureurl VARCHAR(255),
    locale VARCHAR(15) NOT NULL,
    rtoken TEXT NOT NULL,
    googleid VARCHAR(255) NOT NULL,
    CPF VARCHAR(11) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) COMMENT 'Tabela para armazenar as informações dos usuários';