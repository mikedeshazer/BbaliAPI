# Bbali API

## Running project

You need to have installed Node.js and MongoDB 

DataBase: mongodb://localhost:27017/bbali

### Install dependencies 

To install dependencies enter project folder and run following command:
```
npm install
```

### Run server on local

To run server on local execute:
```
npm start 
```

### Run server on heroku

To run server on heroku, please follow following steps:
```
1. Create account at * https://dashboard.heroku.com/apps
2. Install Heroku CLI * [guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
3. Execute followings inside folder, where Node app is located, on Terminal for Mac or Command Line for Windows
	- heroku login (enter your heroku crendentials)
	- heroku create (once execute this command, it is registered the repository in heroku, please confirm by execute `git remote`)
	- git push heroku your branch name
	- heroku ps:scale web=1 (check it app is running or not.)
```

### Make Requests

***** signup: New User Create API
```
http POST /authorization/signup 

form parameters: {
	email: email,
	firstName: first name,
	lastName: last name,
	password: password, "new password, The password should contain a minimum of 8 characters, including at least 1 uppercase letter and 1 number" 
	phoneNumber: phone number
}

return:
SUCCESS
{
	error: false,
	data:{
		token: token
	}
}

FAILURE
{
    error: true,
    data: {
        message: error message
    }
}
```

***** login: login API
```
http POST /authorization/login 

form parameters: {
	email: email,
	password: password
}

return:
SUCCESS
{
	error: false,
	data:{
		token: token,
		name: first name
	}
}

FAILURE
{
    error: true,
    data: {
        message: error message
    }
}
```

***** Change Password endpoint
```
http POST /authorization/changePassword Authorization:'PUT_YOUR_TOKEN_HERE'

payload:
{
	password: password
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
        message: error message
    }
}
```

***** Forgotten Password API
```
http POST /authorization/forgotten

payload:
{
	email: email
}

return:
If success, send the email contains the link(/change-password/token) to the email address.

SUCCESS
{
	error: false,
	data: {}
}
FAILURE
{
	error: true,
	data: {
		message: error message
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

