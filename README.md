# back-end-crud-pontotel 

<p>
JavaScript | NodeJS | Express | JWT | BCRYPT | PostgreSQL | Knex | Yup | Heroku | Cors <br><br>
REST API onde é possível obter e fazer alterações em um banco de dados relacional utilizando token, encriptação de senha, e auxílio do knex e yup para um clean code ainda melhor.
</p>

## 📝 Open API

Fora do servidor Node, a aplicação vem com Swagger; uma [documentação aberta da API](https://swagger.io/specification/), que é usada para descrever APIs RESTful.

**Acesse o Swagger UI dessa aplicação aqui na [Heroku](https://back-end-crud-pontotel.herokuapp.com/docs)**

<br>

<h2>📷 Preview</h2>

<img src="./.gif">

## Pré-requisitos

- [NodeJS](https://nodejs.org/en/download/)

## 🛠️ Instalação	

```bash
#Fazer o fork do repositório para sua conta

#Executar git clone do seu fork no terminal para clonar o repositório

# Instale as Dependências para o funcionamento do projeto
$ npm install
```

## 🔒 Environment

Por padrão, após a instalação das dependências a aplicação vem com um módulo de configuração que pode ler todas as variáveis ​​de ambiente do arquivo `.env`.

```bash
# Crie um arquivo .env usando de exemplo o arquivo .env.example
$ cp .env.example .env
```

| Key                       | Description                                                          | Default Value              |
| ------------------------- | -------------------------------------------------------------------- | -------------------------- |
| PORT                      | Porta da aplicação.                                                  | 4000                       |
| USER                      | Usuário do banco de dados                                            | usuario                    |
| HOST                      | Endpoint do banco de dados                                           | localhost                  |
| DATABASE                  | Nome do banco de dados                                               | banco_de_dados             |
| PASSWORD                  | Senha do banco de dados                                              | 123456                     |
| PASSWORD_JWT              | Senha para geração do Json Web Token                                 | a0B1c2D3e4F5g6H7i8J9k      |

## 🏃 Executando o app

```bash
# Para somente executar, após a instalação use:
$ npm run start

# Se você vai realizar desenvolvimento use:
$ npm run dev
```

Aplicação ficará disponível em **http://localhost:4000** caso o valor padrão não seja alterado.


Abaixo segue as regras de negócio incluidas na API:


#### `POST` `/users`

Cadastrar Usuário - POST
Todas as informações são obrigatórias conforme o modelo abaixo no exemplo.
A SENHA DEVE TER NO MÍNIMO 6 CARACTERES

```json
{
  "name": "admin",
  "email": "admin@admin.com",
  "cpf": "11122233345",
  "pis": "99988877765",
  "password": "123456",
  "adress": {
    "cep": "01001000",
    "rua": "Praça da Sé",
    "numero": "10",
    "complemento": "lado ímpar",
    "bairro": "Sé",
    "municipio": "São Paulo",
    "estado": "São Paulo",
    "pais": "Brazil"
  }
}

```

#### `POST` `/login`

Login Usuário - POST
Todas as informações são obrigatórias conforme o modelo abaixo no exemplo.
O login podera ser feito através do email pis ou cpf.

```json
{
  "identifier": "11122233345",
  "password": "123456"
}
```


O retorno da requisição é um objeto com informações do usuário e um Json Web Token (JWT) que é utilizado para autenticação. Como no exemplo abaixo:

```json
{
  "user": {
    "id": 3,
    "name": "admin",
    "email": "admin@admin.com",
    "cpf": "11122233345",
    "pis": "99988877765",
    "adress": {
      "adress_id": 3,
      "user_id": 3,
      "cep": "01001000",
      "rua": "Praça da Sé",
      "numero": "10",
      "complemento": "lado ímpar",
      "bairro": "Sé",
      "municipio": "São Paulo",
      "estado": "São Paulo",
      "pais": "Brazil"
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjM5ODY0NzU2LCJleHAiOjE2Mzk4OTM1NTZ9.6_iYWxylNzOu2im57Hq1U24EqNKI7uQJ3TxlwFUIFiI"
}
```


Copie somente o token entre parenteses para utilizar nas próximas requisições, colando este mesmo token no cabeçalho da requisição como Bearer Token.


#### `GET` `/profile`

Obter Perfil do Usuário - GET
Esta rota retorna o perfil do usuário logado. Não é necessário informar nada no body da requisição apenas o token no cabeçalho da requisição como Bearer Token. A requisição vai retornar o perfil do usuário logado como no exemplo abaixo:

```json
{
  "id": 3,
  "name": "admin",
  "email": "admin@admin.com",
  "cpf": "11122233345",
  "pis": "99988877765",
  "adress": {
    "adress_id": 3,
    "user_id": 3,
    "cep": "01001000",
    "rua": "Praça da Sé",
    "numero": "10",
    "complemento": "lado ímpar",
    "bairro": "Sé",
    "municipio": "São Paulo",
    "estado": "São Paulo",
    "pais": "Brazil"
  }
}

```
#### `PUT` `/profile`

Atualizar Perfil do Usuário - PUT
O token deve ser enviado no cabeçalho da requisição.
Todas as informações com excessão da senha são obrigatórias conforme o modelo abaixo no exemplo.
Caso não queira alterar a senha, deixe o campo senha em branco.
CASO A SENHA SEJA ALTERADA, DEVE TER NO MÍNIMO 6 CARACTERES

```json
{
  "name": "admin",
  "email": "admin@admin.com",
  "cpf": "11122233345",
  "pis": "99988877765",
  "password": "",
  "adress": {
    "cep": "01001000",
    "rua": "Praça da Sé",
    "numero": "10",
    "complemento": "lado ímpar",
    "bairro": "Sé",
    "municipio": "São Paulo",
    "estado": "São Paulo",
    "pais": "Brazil"
  }
}

```
#### `DELETE` `/profile`

Deletar Perfil do Usuário - DELETE
O token deve ser enviado no cabeçalho da requisição.

###### tags: `JavaScript`  `NodeJS`  `Express`  `JWT`  `BCRYPT`  `PostgreSQL`  `Knex`  `Yup` `Heroku` `Cors`