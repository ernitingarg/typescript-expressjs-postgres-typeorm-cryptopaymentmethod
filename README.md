# CryptoPaymentMethod project

This project is a backend server that exposes several API endpoints for managing different types of payments (eg: Nets, Visa, Crypto) by using various payment providers.
The server leverages the APIs provided by the external payment provider [TripleA](https://developers.triple-a.io/docs/triplea-api-doc/) for processing Crypto payments.

## Features
- The API server is implemented using `TypeScript` and runs on `Node.js`. It utilizes `Express.js` as the web framework.
- The project uses a `Postgres` database, which is deployed locally in a Docker container.
- Requested payload validation is implemented using the `express-validator` library, ensuring that incoming data is properly validated.
- Error handling is efficiently managed through middleware, reducing the need for excessive try/catch blocks.
- The project follows the factory and bridge design patterns to facilitate the integration of different payments methods and payment providers as needed.
	- The `TripleAPaymentProvider` is used for handling `Crypto` payments, utilizing the specific APIs provided by TripleA.
	- The `MockPaymentProvider` is used for handling `Nets` and `Visa` payments, using mock data for testing purposes.
	- The design allows for seamless integration of new payment methods and/or new payment providers by simply modifying the factory, without requiring changes to the overall design structure.
- Access token is managed by `AccessTokenManager` which is responsible to generate new access token.
- Payment providers can request access tokens and manage them in-memory or through a database for subsequent requests.
- **API endpoints:** The server supports the following API endpoints:
	- `GET /payment-methods`: Retrieves a list of supported payment options from the database.
	- `POST /payment-collections`: Creates a payment using the TripleA API and stores the response in the database.
	- `GET /payment-collections/{id}`: Retrieves payment details from the database.

## Directory structure
```
│   .env
│   .gitignore
│   docker-compose.yml
│   package-lock.json
│   package.json
│   README.md
│   tsconfig.json
│
├───postman
│       postman_collection.json
│
└───src
    │   config.ts
    │   data-source.ts
    │   index.ts
    │   routes.ts
    │
    ├───controllers
    │       PaymentCollectionController.ts
    │       PaymentMethodController.ts
    │
    ├───entities
    │       PaymentCollection.ts
    │       PaymentMethod.ts
    │
    ├───enums
    │       PaymentOption.ts
    │
    ├───middlewares
    │       errorHandler.ts
    │
    ├───migrations
    │       1689427418203-migration-seed.ts
    │
    ├───payment
    │   ├───factories
    │   │       PaymentFactory.ts
    │   │
    │   ├───interfaces
    │   │       IPayment.ts
    │   │       IPaymentProvider.ts
    │   │
    │   ├───methods
    │   │       CryptoPayment.ts
    │   │       NetsPayment.ts
    │   │       VisaPayment.ts
    │   │
    │   ├───providers
    │   │       MockPaymentProvider.ts
    │   │       TripleAPaymentProvider.ts
    │   │
    │   ├───requests
    │   │       AccessTokenRequest.ts
    │   │       PaymentRequest.ts
    │   │
    │   └───responses
    │           AccessTokenResponse.ts
    │           PaymentResponse.ts
    │
    └───security
            AccessTokenManager.ts
```


## Installation and Setup

To successfully run the application, please follow the steps below:

### Clone the Repository

```
git clone https://github.com/ernitingarg09/CryptoPaymentMethod.git
```
   
Navigate to the CryptoPaymentMethod folder.

### Set up Docker Environment for Postgres

```
docker-compose up -d
```
	
### Start the Server
```
 npm install
 npm run start
```

Default port is `5000`
	
### Run the db Migration
```
npm run migration:run 
```

### Enviornment Configuration
If you need to override any default configuration settings, please update the [.env](.env) file located in the project's root directory. 
Modify the values according to your specific environment.


### Import Postman Collection
Download the [postman_collection.json](postman/postman_collection.json) file and import it into Postman.

### Demo Video
For a visual demonstration of the application, please refer to the video provided below:

[![Watch the video](demo/demo.jpg)](https://www.dropbox.com/s/clwtjzqgyene851/demo.mp4?dl=0)

## Questions

### How to Safely Manage API keys in production environment?

To ensure the security of API keys in a production environment, Here are some recommended approaches for securely managing API keys:

#### Utilize Environment Variables: 
Set API keys as environment variables on the server hosting the application.
Cloud providers like Azure App Service provide configuration options specifically for managing environment variables.

#### Secrets Management Tools:
Use of secrets management tool provided by cloud platforms such as Azure Key Vault or AWS Secrets Manager. These tools offer secure storage and management of sensitive information, including API keys. 

### How to make docker container down?
```
docker-compose down
```

### How to cleanup dockerized environment?
```
docker-compose down -v --rmi all
```

The above command should remove container, image, network and also the data volume. 

### How to connect to Postgres database manually?

- Run below commands to connect to db container
```
  docker exec -it postgres bash
  psql -U admin -d paymentdb
```
- To see all tables, run below command 
```
paymentdb=# \dt;

              List of relations
 Schema |        Name        | Type  | Owner
--------+--------------------+-------+-------
 public | migrations         | table | admin
 public | payment_collection | table | admin
 public | payment_method     | table | admin
(3 rows)
```

- Run select query

```	
paymentdb=# select * from payment_collection ;
             payment_reference             | order_currency | order_amount |       expiry_date       |      notify_secret       |               access_token               | token_type | expires_in |
                                                        hosted_url                                                                  | crypto_currency | crypto_amount
-------------------------------------------+----------------+--------------+-------------------------+--------------------------+------------------------------------------+------------+------------+---------------------------------------------------------------------------------------------------------------------------------------------+-----------------+---------------
visa_d1adc71c-9995-40bc-a20c-1b5b6ba30295 | JPY            |         1.70 | 2023-07-18 14:50:04.056 | visa_notify_secret       | visa_access_token                        | Bearer     |       3600 | https://visa-hosted-url                                                                                                                     |                 |
nets_385483fc-68c8-491e-84c4-e5a6b54fc242 | JPY            |         1.70 | 2023-07-18 14:50:24.447 | nets_notify_secret       | nets_access_token                        | Bearer     |       3600 | https://nets-hosted-url                                                                                                                     |                 |
QEG-647143-PMT                            | JPY            |         1.70 | 2023-07-18 18:08:33.93  | neyPT6hQhCFc8Ft4WbeEjEfH | 498bc3981da2af79bba2019ceef765c760cdf45f | Bearer     |       1499 | https://app.triple-a.io/app/v1/payment_form?access_token=498bc3981da2af79bba2019ceef765c760cdf45f&payment_reference=QEG-647143-PMT&select=1 | testBTC         |    0.00000041
TYP-857692-PMT                            | SGD            |         1.70 | 2023-07-18 18:08:41.793 | 1RFwMaNa060AYXp7hNtu6T4V | 081e0fcae1e3133d1d3e9cf02dc67b9561effff1 | Bearer     |       1499 | https://app.triple-a.io/app/v1/payment_form?access_token=081e0fcae1e3133d1d3e9cf02dc67b9561effff1&payment_reference=TYP-857692-PMT&select=1 | testBTC         |    0.00004284
(6 rows)
```
