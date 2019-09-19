# MongoDB user creation
Node.js app to enable the creation of mongo users on mongo db deployed in same namespace.

Requires valid keycloak token in Authorization header.
Route:
/user

Method: 
POST

Sample body:
{
    "username" : "newUser5",
    "password" : "pass",
	"dbName" : "serviceDbExample"
}

Headers:
Authorization: "Bearer <<token>>"
Content-Type: application/json



