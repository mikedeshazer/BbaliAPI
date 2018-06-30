# BbaliAPI
Open-source E-vehicle rental and social Application (Node.js and Mongo)

## Running project

You need to have installed Node.js and MongoDB, and set environemnt for database and host, and email configuration.

You can find .env file on root directory. Set your host info before starting.

DataBase: mongodb://localhost:27017/bbali

### Install dependencies 

To install dependencies enter project folder and run following command:
```
npm install
```

### Run server

To run server execute:
```
npm start 
```

### Make Requests

***** Creating user for bbali: SignUp API
```
http POST /user/signup 
form parameters {
	email: 'required',
	phoneNumber: 'optional',
	password: 'required'
}
return token

```

***** Forgotten Password API
```
http POST /user/forgotten

payload:
{
	email: email
}

***** Change Password endpoint
```
http POST /user/changePassword Authorization:'PUT_YOUR_TOKEN_HERE'

payload:
{
	password: String //new password, The password should contain a minimum of 8 characters, including at least 1 uppercase letter and 1 number 
}

return:
SUCCESS
{
	error: false,
	data:{}
}

FAILURE
{
    error: true,
    data: {
        message: "Your password should contain a minimum of 8 characters, including at least 1 uppercase letter and 1 number"
    }
}
```

## Modules used

Some of non standard modules used:
* [express](https://www.npmjs.com/package/express)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [nconf](https://www.npmjs.com/package/nconf)
* [nodemailer](https://www.npmjs.com/package/nodemailer)
* [request](https://www.npmjs.com/package/request)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [lodash](https://www.npmjs.com/package/lodash)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [helmet](https://www.npmjs.com/package/helmet)