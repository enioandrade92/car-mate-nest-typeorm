# Boas-vindas ao repositório Car Mate!

Uma aplicação back-end onde é possível cadastrar, editar e buscar veículos e motoristas, além de criar relacionamento entre eles.

---
# Orientações

<details>
  <summary>
    <strong>⌨️ Tecnologias</strong>
  </summary>
  
  - **Nest**
  
  - **Typescript**
  
  - **Express**
  
  - **TypeORM**
  
  - **Sqlite**
  
  - **Jest**

</details>

<details>
  <summary>
    <strong>‼️ Antes de começar a utilizar você precisa</strong>
  </summary><br>

  1. Ter o nvm instalado;
  2. Instalar e utilizar o node versão 16.17;
  3. Instalar o Sqlite;
  
</details>

<details>
  <summary>
    <strong>🤝 Passo a Passo</strong>
  </summary><br>

  1. Clone o repositório

  - Use o comando: `git clone git@github.com:enioandrade92/car-mate.git`
  - Entre na pasta do repositório que você acabou de clonar:
    - `cd car-mate`

  2. Instale as dependências

  - Para isso, use o seguinte o comando: `npm install`
  
  4. Subindo a aplicação backend na porta 3000

  - Para isso, use o seguinte comando na raiz do backend: `npm run start`
  
</details>

<details>
  <summary>
    <strong>✍ Regras de negócio</strong>
  </summary><br>

- [x] Criar um motorista com o nome;
- [x] Editar o nome do motorista;
- [x] Buscar um motorista pelo número de identificação;
- [x] Buscar todos os motoristas, além de poder filtrar por parte do nome;
- [x] Deletar um motorista pelo número de identificação 
- (Quando não há relação em aberto com veículo);
- [x] Criar um veículo;
- [x] Editar o veículo;
- [x] Buscar um veículo pelo número de identificação;
- [x] Buscar todos os veículos, além de poder filtrar por cor e/ou marca;
- [x] Deletar um veículo pelo número de identificação;
- (Quando não há relação em aberto com motorista);
- [x] Criar uma relação entre motorista e veículo;
- [x] Encerrar um relação entre motorista e veículo;;
- [x] Buscar por todos registros de relação utilizando número de identificação do motorista;
- [x] Buscar por todos registros de relação utilizando número de identificação do veículo;
  
</details>

<details>
  <summary>
    <strong>🗣 Me dê feedbacks sobre o projeto!</strong>
  </summary><br>

  Qualquer tipo de feedback é bem vindo para que eu possa continuar melhorando. 
   - **enioandrade92@hotmail.com**

</details>

</details>

---

  
# Documentação

---
####  1 - Cadastrar motorista
- (POST): `http://localhost:3000/driver`
<details>
- Regras: 
    - Não é possível cadastrar o mesmo motorista;

- Payload: 
    ```json
    {
        "name": "Jack"
    }
    ``` 

- Response:
    ```json
    {
        "name": "Jack",
        "id": 1,
        "createdAt": "2024-01-11T18:17:49.000Z",
        "updatedAt": "2024-01-11T18:17:49.000Z",
        "deletedAt": null
    }
    ``` 
</details>

####  2 - Atualizar motorista
- (PUT): `http://localhost:3000/driver/:id`
<details>
- Payload: 
    ```json
    {
        "name": "Big Jack"
    }
    ``` 

- Response:
    ```json
    {
        "name": "Big Jack",
        "id": 1,
        "createdAt": "2024-01-11T18:17:49.000Z",
        "updatedAt": "2024-01-11T18:17:49.000Z",
        "deletedAt": null
    }
    ``` 
</details>

####  3 - Buscar motorista por número de identificação
- (GET): `http://localhost:3000/driver/:id`
<details>
- Response:
    ```json
    {
        "name": "Big Jack",
        "id": 1,
        "createdAt": "2024-01-11T18:17:49.000Z",
        "updatedAt": "2024-01-11T18:17:49.000Z",
        "deletedAt": null
    }
    ``` 
</details>


####  4 - Buscar todos os motoristas
- (GET): `http://localhost:3000/driver?page=1&limit=10`
<details>
- Response:
    ```json
    {
        "items": 
        [
            {
                "name": "Big Jack",
                "id": 1,
                "createdAt": "2024-01-11T18:17:49.000Z",
                "updatedAt": "2024-01-11T18:17:49.000Z",
                "deletedAt": null
            },
            {},
            {},
        ],
        "meta": 
        {
            "totalItems": 4,
            "itemCount": 4,
            "itemsPerPage": 10,
            "totalPages": 1,
            "currentPage": 1
        }
    }
    
    ``` 
</details>

####  4 - Buscar motorista utilizando o nome ou parte dele
- (GET): `http://localhost:3000/driver?name=ja`
<details>
- Response:
    ```json
    [
        {
            "name": "Big Jack",
            "id": 1,
            "createdAt": "2024-01-11T18:17:49.000Z",
            "updatedAt": "2024-01-11T18:17:49.000Z",
            "deletedAt": null
        },
        {},
        {},
    ]
    ``` 
</details>

####  5 - Deletar motorista com o número de identificação
- (DELETE): `http://localhost:3000/driver/:id`
<details>
- Regras:
    - Só é possível deletar um motorista, quando ele não está com uma relação em andamento com um veículo.

- Response: 'Deleted successfully the driver id 1'

</details>

####  6 - Cadastrar veículo
- (POST): `http://localhost:3000/vehicle`
<details>
- Regras: 
    - Não é possível cadastrar mais de um carro com a mesma placa;

- Payload: 
    ```json
    {
        "brand":"Fiat",
        "name":"Uno",
        "color":"yellow",
        "plate":"abc1235"
    }
    ``` 

- Response:
    ```json
    {
        "brand": "Fiat",
        "name": "Uno",
        "color": "yellow",
        "plate": "abc1235",
        "id": 1,
        "createdAt": "2024-01-11T15:05:01.000Z",
        "updatedAt": "2024-01-11T15:05:01.000Z",
        "deletedAt": null
    }
    ``` 

</details>

####  7 - Atualizar veículo
- (PUT): `http://localhost:3000/vehicle/:id`
<details>
- Regras: 
    - Não é possível cadastrar mais de um carro com a mesma placa;

- Payload: 
    ```json
    {
        "color":"blue",
    }
    ``` 

- Response:
    ```json
    {
        "brand": "Fiat",
        "name": "Uno",
        "color": "blue",
        "plate": "abc1235",
        "id": 1,
        "createdAt": "2024-01-11T15:05:01.000Z",
        "updatedAt": "2024-01-11T15:05:01.000Z",
        "deletedAt": null
    }
    ``` 

</details>

####  8 - Buscar veículo por número de identificação
- (GET): `http://localhost:3000/vehicle/:id`
<details>
- Response:
    ```json
    {
        "brand": "Fiat",
        "name": "Uno",
        "color": "blue",
        "plate": "abc1235",
        "id": 1,
        "createdAt": "2024-01-11T15:05:01.000Z",
        "updatedAt": "2024-01-11T15:05:01.000Z",
        "deletedAt": null
    }
    ``` 

</details>

####  9 - Buscar todos os veículos
- (GET): `http://localhost:3000/vehicle`
<details>
- Response:
    ```json
    [
        {
            "brand": "Fiat",
            "name": "Uno",
            "color": "blue",
            "plate": "abc1235",
            "id": 1,
            "createdAt": "2024-01-11T15:05:01.000Z",
            "updatedAt": "2024-01-11T15:05:01.000Z",
            "deletedAt": null
        },
        {},
        {}
    ]
    ``` 

</details>

####  10 - Buscar veículos por filtro de cor e/ou marca
- (GET): `http://localhost:3000/vehicle?color=blue&brand=fiat`
<details>
- Response:
    ```json
    [
        {
            "brand": "Fiat",
            "name": "Uno",
            "color": "blue",
            "plate": "abc1235",
            "id": 1,
            "createdAt": "2024-01-11T15:05:01.000Z",
            "updatedAt": "2024-01-11T15:05:01.000Z",
            "deletedAt": null
        }
    ]
    ``` 

</details>

####  11 - Deletar veículo com o número de identificação
- (DELETE): `http://localhost:3000/vehicle/:id`
<details>
- Regras:
    - Só é possível deletar um veículo, quando ele não está com uma relação em andamento com um motorista.

- Response: 'Deleted successfully the vehicle id 1'

</details>

####  12 - Criar uma relação entre o motorista e um veículo
- (POST): `http://localhost:3000/vehicle-assignment/register`
<details>
- Regras: 
    - Só é possível criar uma relação entre veículo e motorista, caso ambos não estejam em outra relação;

- Payload:
    ```json
    {
        "driverId": 1,
        "vehicleId": 1,
        "reason": "trip"
    }
    ``` 

- Response:
    ```json
    {
        "vehicle": {
            "id": 1,
            "name": "Uno",
            "color": "black",
            "brand": "Fiat",
            "plate": "abc1234",
            "createdAt": "2024-01-11T15:04:48.000Z",
            "updatedAt": "2024-01-11T15:04:48.000Z",
            "deletedAt": null
        },
        "driver": {
            "id": 1,
            "name": "little Jack",
            "createdAt": "2024-01-11T15:06:53.000Z",
            "updatedAt": "2024-01-11T15:06:53.000Z",
            "deletedAt": null
        },
        "reason": "trip",
        "startDateAssignment": "2024-01-11T18:47:01.319Z",
        "endDateAssignment": null,
        "id": 1
    }
    ``` 
</details>

####  13 - Criar uma relação entre o motorista e um veículo
- (PUT): `http://localhost:3000/vehicle-assignment`
<details>
- Payload:
    ```json
    {
        "driverId": 1,
        "vehicleId": 1,
    }
    ``` 

- Response:
    ```json
    {
        "vehicle": {
            "id": 1,
            "name": "Uno",
            "color": "black",
            "brand": "Fiat",
            "plate": "abc1234",
            "createdAt": "2024-01-11T15:04:48.000Z",
            "updatedAt": "2024-01-11T15:04:48.000Z",
            "deletedAt": null
        },
        "driver": {
            "id": 1,
            "name": "little Jack",
            "createdAt": "2024-01-11T15:06:53.000Z",
            "updatedAt": "2024-01-11T15:06:53.000Z",
            "deletedAt": null
        },
        "reason": "trip",
        "startDateAssignment": "2024-01-11T18:47:01.319Z",
        "endDateAssignment": "2024-01-11T20:47:01.319Z",
        "id": 1
    }
    ``` 
</details>

####  14 - Buscar todas as relação de um motorista
- (GET): `http://localhost:3000/vehicle-assignment/driver/1`
<details>
- Response:
    ```json
    [
        {
            "id": 3,
            "reason": "trip",
            "startDateAssignment": "2024-01-11T12:23:06.799Z",
            "endDateAssignment": null,
            "driver": {
                "id": 1,
                "name": "Jack",
                "createdAt": "2024-01-11T12:13:00.000Z",
                "updatedAt": "2024-01-11T12:13:00.000Z",
                "deletedAt": null
            },
            "vehicle": {
                "id": 1,
                "name": "Uno",
                "color": "blue",
                "brand": "Fiat",
                "plate": "abc123",
                "createdAt": "2024-01-11T12:14:30.000Z",
                "updatedAt": "2024-01-11T12:14:30.000Z",
                "deletedAt": null
            }
        },
        {
            "id": 2,
            "reason": "trip",
            "startDateAssignment": "2024-01-11T12:23:01.677Z",
            "endDateAssignment": "2024-01-11T12:23:04.214Z",
            "driver": {
                "id": 1,
                "name": "Jack",
                "createdAt": "2024-01-11T12:13:00.000Z",
                "updatedAt": "2024-01-11T12:13:00.000Z",
                "deletedAt": null
            },
            "vehicle": {
                "id": 1,
                "name": "Uno",
                "color": "blue",
                "brand": "Fiat",
                "plate": "abc123",
                "createdAt": "2024-01-11T12:14:30.000Z",
                "updatedAt": "2024-01-11T12:14:30.000Z",
                "deletedAt": null
            }
        }, 
    ]
    ``` 
</details>

####  15 - Buscar todas as relação de um veículo
- (GET): `http://localhost:3000/vehicle-assignment/vehicle/1`
<details>
- Response:
    ```json
    [
        {
            "id": 3,
            "reason": "trip",
            "startDateAssignment": "2024-01-11T12:23:06.799Z",
            "endDateAssignment": null,
            "driver": {
                "id": 1,
                "name": "Jack",
                "createdAt": "2024-01-11T12:13:00.000Z",
                "updatedAt": "2024-01-11T12:13:00.000Z",
                "deletedAt": null
            },
            "vehicle": {
                "id": 1,
                "name": "Uno",
                "color": "blue",
                "brand": "Fiat",
                "plate": "abc123",
                "createdAt": "2024-01-11T12:14:30.000Z",
                "updatedAt": "2024-01-11T12:14:30.000Z",
                "deletedAt": null
            }
        },
        {
            "id": 2,
            "reason": "trip",
            "startDateAssignment": "2024-01-11T12:23:01.677Z",
            "endDateAssignment": "2024-01-11T12:23:04.214Z",
            "driver": {
                "id": 1,
                "name": "Jack",
                "createdAt": "2024-01-11T12:13:00.000Z",
                "updatedAt": "2024-01-11T12:13:00.000Z",
                "deletedAt": null
            },
            "vehicle": {
                "id": 1,
                "name": "Uno",
                "color": "blue",
                "brand": "Fiat",
                "plate": "abc123",
                "createdAt": "2024-01-11T12:14:30.000Z",
                "updatedAt": "2024-01-11T12:14:30.000Z",
                "deletedAt": null
            }
        }, 
    ]
    ``` 
</details>
