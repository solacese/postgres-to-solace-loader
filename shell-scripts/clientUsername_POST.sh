#! /bin/bash
# 
# clientUsername_POST.sh
# Creates a client username using the provided username and password in the provided message vpn
# TODO:  read in a config file?  I don't know if that'd be useful.
# - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + -

cd `dirname $0`

if [ "$#" -ne 3 ]; then
	echo "  USAGE: $0 <MSG_VPN> <CLIENT_USERNAME> <PASSWORD>"
	echo ""
	exit 0
fi
MSG_VPN=$1
CLIENT_USERNAME=$2
PASSWORD=$3

# - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + -

SEMP_ENDPOINT="http://localhost:8080/SEMP/v2/config/msgVpns/$MSG_VPN"
SEMP_USERNAME=admin
SEMP_PASSWORD=admin

BODY_TEMPLATE='{"clientUsername":"%s","password":"%s"}'
REQUEST_BODY=$(printf "$BODY_TEMPLATE" "$CLIENT_USERNAME" "$PASSWORD")

# - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + - + -

curl \
  --user $SEMP_USERNAME:$SEMP_PASSWORD \
  -H "Content-Type: application/json" \
  -d $REQUEST_BODY \
  -X POST "$SEMP_ENDPOINT/clientUsernames"