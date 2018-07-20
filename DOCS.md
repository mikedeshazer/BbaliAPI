# ridesharing



- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [User](#user)
	- [change delivery user status](#change-delivery-user-status)
	- [Create charger user](#create-charger-user)
	- [Create delivery user](#create-delivery-user)
	- [Create mechanics user](#create-mechanics-user)
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
	
- [VehicleDelivery](#vehicledelivery)
	- [Create vehicle delivery](#create-vehicle-delivery)
	- [Delete vehicle delivery](#delete-vehicle-delivery)
	- [Retrieve vehicle deliveries](#retrieve-vehicle-deliveries)
	- [Retrieve vehicle delivery](#retrieve-vehicle-delivery)
	- [Update vehicle delivery](#update-vehicle-delivery)
	
- [VehicleReport](#vehiclereport)
	- [Create vehicle report](#create-vehicle-report)
	- [Retrieve vehicle report](#retrieve-vehicle-report)
	- [Retrieve vehicle reports](#retrieve-vehicle-reports)
	
- [RateCard](#ratecard)
	- [Create rate card](#create-rate-card)
	- [Delete rate card](#delete-rate-card)
	- [Retrieve rate card](#retrieve-rate-card)
	- [Retrieve rate cards](#retrieve-rate-cards)
	- [Update rate card](#update-rate-card)
	
- [Rateride](#rateride)
	- [Create rateride](#create-rateride)
	- [Retrieve raterides](#retrieve-raterides)
	
- [Ride](#ride)
	- [Create ride](#create-ride)
	- [Delete ride](#delete-ride)
	- [Retrieve ride](#retrieve-ride)
	- [Retrieve rides](#retrieve-rides)
	- [Update ride](#update-ride)


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

# RateCard

## Create rate card



	POST /rate-cards


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| distance			| 			|  <p>Rate card's distance.</p>							|
| price			| 			|  <p>Rate card's price.</p>							|

## Delete rate card



	DELETE /rate-cards/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve rate card



	GET /rate-cards/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve rate cards



	GET /rate-cards


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update rate card



	PUT /rate-cards/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| distance			| 			|  <p>Rate card's distance.</p>							|
| price			| 			|  <p>Rate card's price.</p>							|

# Rateride

## Create rateride



	POST /raterides


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| rideId			| 			|  <p>Rateride's rideId.</p>							|
| vehicleName			| 			|  <p>Rateride's vehicleName.</p>							|
| starRating			| 			|  <p>Rateride's starRating.</p>							|
| textRating			| 			|  <p>Rateride's textRating.</p>							|
| userLat			| 			|  <p>Rateride's userLat.</p>							|
| userLon			| 			|  <p>Rateride's userLon.</p>							|

## Retrieve raterides



	GET /raterides


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

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

## change delivery user status



	POST /delivery/status


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| status			| String			|  <p>deliveryuser's status.</p>							|

## Create charger user



	POST /chargers/apply


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Create delivery user



	POST /delivery/apply


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Create mechanics user



	POST /mechanics/apply


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

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

# VehicleDelivery

## Create vehicle delivery



	POST /vehicleDeliveries


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| rideId			| 			|  <p>Vehicle delivery's rideId.</p>							|
| rideCreatedat			| 			|  <p>Vehicle delivery's rideCreatedat.</p>							|
| vehicleId			| 			|  <p>Vehicle delivery's vehicleId.</p>							|
| pickupLatitude			| 			|  <p>Vehicle delivery's pickupLatitude.</p>							|
| pickupLongitude			| 			|  <p>Vehicle delivery's pickupLongitude.</p>							|
| dropLatitude			| 			|  <p>Vehicle delivery's dropLatitude.</p>							|
| dropLongitude			| 			|  <p>Vehicle delivery's dropLongitude.</p>							|
| status			| 			|  <p>Vehicle delivery's status.</p>							|
| pickup			| 			|  <p>Vehicle delivery's pickup.</p>							|
| drop			| 			|  <p>Vehicle delivery's drop.</p>							|
| deliveryUserId			| 			|  <p>Vehicle delivery's deliveryUserId.</p>							|
| deliveryStartTime			| 			|  <p>Vehicle delivery's deliveryStartTime.</p>							|
| deliveryEndTime			| 			|  <p>Vehicle delivery's deliveryEndTime.</p>							|

## Delete vehicle delivery



	DELETE /vehicleDeliveries/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve vehicle deliveries



	GET /vehicleDeliveries


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve vehicle delivery



	GET /vehicleDeliveries/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Update vehicle delivery



	PUT /vehicleDeliveries/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| rideId			| 			|  <p>Vehicle delivery's rideId.</p>							|
| rideCreatedat			| 			|  <p>Vehicle delivery's rideCreatedat.</p>							|
| vehicleId			| 			|  <p>Vehicle delivery's vehicleId.</p>							|
| pickupLatitude			| 			|  <p>Vehicle delivery's pickupLatitude.</p>							|
| pickupLongitude			| 			|  <p>Vehicle delivery's pickupLongitude.</p>							|
| dropLatitude			| 			|  <p>Vehicle delivery's dropLatitude.</p>							|
| dropLongitude			| 			|  <p>Vehicle delivery's dropLongitude.</p>							|
| status			| 			|  <p>Vehicle delivery's status.</p>							|
| pickup			| 			|  <p>Vehicle delivery's pickup.</p>							|
| drop			| 			|  <p>Vehicle delivery's drop.</p>							|
| deliveryUserId			| 			|  <p>Vehicle delivery's deliveryUserId.</p>							|
| deliveryStartTime			| 			|  <p>Vehicle delivery's deliveryStartTime.</p>							|
| deliveryEndTime			| 			|  <p>Vehicle delivery's deliveryEndTime.</p>							|

# VehicleReport

## Create vehicle report



	POST /vehicleReports


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| vehicleId			| 			|  <p>Vehicle report's vehicleId.</p>							|
| message			| 			|  <p>Vehicle report's message.</p>							|
| type			| 			|  <p>Vehicle report's type.</p>							|
| userLatitude			| 			|  <p>Vehicle report's userLatitude.</p>							|
| userLongitude			| 			|  <p>Vehicle report's userLongitude.</p>							|

## Retrieve vehicle report



	GET /vehicleReports/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve vehicle reports



	GET /vehicleReports


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|


