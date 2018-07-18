# ridesharing-test v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [Ride](#ride)
	- [Create ride](#create-ride)
	- [Delete ride](#delete-ride)
	- [Retrieve ride](#retrieve-ride)
	- [Retrieve rides](#retrieve-rides)
	- [Update ride](#update-ride)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	
- [Vehicle](#vehicle)
	- [Create vehicle](#create-vehicle)
	- [Delete vehicle](#delete-vehicle)
	- [Retrieve vehicle](#retrieve-vehicle)
	- [Retrieve vehicles](#retrieve-vehicles)
	- [Update vehicle](#update-vehicle)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

# Ride

## Create ride



	POST /rides


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| timeStarted			| 			|  <p>Ride's timeStarted.</p>							|
| type			| 			|  <p>Ride's type.</p>							|
| duration			| 			|  <p>Ride's duration.</p>							|
| ratePerUnitTime			| 			|  <p>Ride's ratePerUnitTime.</p>							|
| currency			| 			|  <p>Ride's currency.</p>							|
| timeEnded			| 			|  <p>Ride's timeEnded.</p>							|
| paymentMethodID			| 			|  <p>Ride's paymentMethodID.</p>							|
| status			| 			|  <p>Ride's status.</p>							|
| rideTotal			| 			|  <p>Ride's rideTotal.</p>							|
| locationPickupLon			| 			|  <p>Ride's locationPickupLon.</p>							|
| locationPickupLat			| 			|  <p>Ride's locationPickupLat.</p>							|
| locationdropOffLon			| 			|  <p>Ride's locationdropOffLon.</p>							|
| locationDropoffLat			| 			|  <p>Ride's locationDropoffLat.</p>							|
| loctionDropoffAddress			| 			|  <p>Ride's loctionDropoffAddress.</p>							|

## Delete ride



	DELETE /rides/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve ride



	GET /rides/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve rides



	GET /rides


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update ride



	PUT /rides/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| timeStarted			| 			|  <p>Ride's timeStarted.</p>							|
| type			| 			|  <p>Ride's type.</p>							|
| duration			| 			|  <p>Ride's duration.</p>							|
| ratePerUnitTime			| 			|  <p>Ride's ratePerUnitTime.</p>							|
| currency			| 			|  <p>Ride's currency.</p>							|
| timeEnded			| 			|  <p>Ride's timeEnded.</p>							|
| paymentMethodID			| 			|  <p>Ride's paymentMethodID.</p>							|
| status			| 			|  <p>Ride's status.</p>							|
| rideTotal			| 			|  <p>Ride's rideTotal.</p>							|
| locationPickupLon			| 			|  <p>Ride's locationPickupLon.</p>							|
| locationPickupLat			| 			|  <p>Ride's locationPickupLat.</p>							|
| locationdropOffLon			| 			|  <p>Ride's locationdropOffLon.</p>							|
| locationDropoffLat			| 			|  <p>Ride's locationDropoffLat.</p>							|
| loctionDropoffAddress			| 			|  <p>Ride's loctionDropoffAddress.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|

# Vehicle

## Create vehicle



	POST /vehicles


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| qrcodeIdentifier			| 			|  <p>Vehicle's qrcodeIdentifier.</p>							|
| name			| 			|  <p>Vehicle's name.</p>							|
| type			| 			|  <p>Vehicle's type.</p>							|
| currentStatus			| 			|  <p>Vehicle's currentStatus.</p>							|
| lon			| 			|  <p>Vehicle's lon.</p>							|
| lat			| 			|  <p>Vehicle's lat.</p>							|
| description			| 			|  <p>Vehicle's description.</p>							|
| occupiedByUserId			| 			|  <p>Vehicle's occupiedByUserId.</p>							|
| photoUrl			| 			|  <p>Vehicle's photoUrl.</p>							|
| parkedAddress			| 			|  <p>Vehicle's parkedAddress.</p>							|
| parkedDescription			| 			|  <p>Vehicle's parkedDescription.</p>							|
| currentLockCode			| 			|  <p>Vehicle's currentLockCode.</p>							|
| chargedPercentageEstimate			| 			|  <p>Vehicle's chargedPercentageEstimate.</p>							|
| make			| 			|  <p>Vehicle's make.</p>							|
| year			| 			|  <p>Vehicle's year.</p>							|
| model			| 			|  <p>Vehicle's model.</p>							|

## Delete vehicle



	DELETE /vehicles/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve vehicle



	GET /vehicles/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve vehicles



	GET /vehicles


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update vehicle



	PUT /vehicles/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| qrcodeIdentifier			| 			|  <p>Vehicle's qrcodeIdentifier.</p>							|
| name			| 			|  <p>Vehicle's name.</p>							|
| type			| 			|  <p>Vehicle's type.</p>							|
| currentStatus			| 			|  <p>Vehicle's currentStatus.</p>							|
| lon			| 			|  <p>Vehicle's lon.</p>							|
| lat			| 			|  <p>Vehicle's lat.</p>							|
| description			| 			|  <p>Vehicle's description.</p>							|
| occupiedByUserId			| 			|  <p>Vehicle's occupiedByUserId.</p>							|
| photoUrl			| 			|  <p>Vehicle's photoUrl.</p>							|
| parkedAddress			| 			|  <p>Vehicle's parkedAddress.</p>							|
| parkedDescription			| 			|  <p>Vehicle's parkedDescription.</p>							|
| currentLockCode			| 			|  <p>Vehicle's currentLockCode.</p>							|
| chargedPercentageEstimate			| 			|  <p>Vehicle's chargedPercentageEstimate.</p>							|
| make			| 			|  <p>Vehicle's make.</p>							|
| year			| 			|  <p>Vehicle's year.</p>							|
| model			| 			|  <p>Vehicle's model.</p>							|


