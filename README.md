# Bbali API

## Running project

You need to have installed Node.js and MongoDB 

DataBase: mongodb://localhost:27017/bbali in Development Environment

DataBase: mongodb://bblia-user:Mlab-database111@ds125021.mlab.com:25021/bblia in Production Environment
To create mongodb instance, please follow below steps:
```
1. Create acount at https://mlab.com [guide](https://docs.mlab.com/)
2. Create New Instance
3. Select Plans, Cloud Provider and Cloud Region (current one is free version, and seleted AWS as clould provider.)
4. Input DB name and create DB user and passowrd.

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

To run server on heroku, please follow below steps:
```
1. Create account at (https://dashboard.heroku.com/apps)
2. Install Heroku CLI [guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
3. Execute followings inside folder, where Node app is located, on Terminal for Mac or Command Line for Windows
	- `heroku login` (enter your heroku crendentials)
	- Create app
	  * login heroku account and create app in UI. 
	  * heroku create (once execute this command, local repository is connected to created app repository in heroku, please confirm by execute `git remote`)
	- `git push heroku master`
	- `heroku ps:scale web=1` (check it app is running or not.)
	- `heroku logs` (check logs)
```

### Endpoints Description and sample payload

***** signup: New User Create API
```
http POST /authorization/signup 

form parameters: {
	email: email,
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

***** Change Password endpoint
```
http POST /authorization/changePassword  Authorization:'PUT_YOUR_TOKEN_HERE' in header

payload:
{
	password: new password
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

