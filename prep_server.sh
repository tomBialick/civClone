#!/bin/bash

SECRET=$(cat /dev/urandom | LC_ALL=C tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1) #Consider hashing
mkdir auth
echo "{
  \"secret\": \""${SECRET}"\"
}" > ./auth/sessionSecret.json

# Prompt user for DB creds?
echo "Please enter Database Username: "
read USERNAME
echo "Please enter Database Host: "
read HOST
echo "Please enter Database Name: "
read DB
echo "Please enter Database Password: "
read PASSWORD
echo "Please enter Database Port Number: "
read PORT

echo "{
  \"postgresql\": {
    \"user\": \""${USERNAME}"\",
    \"host\": \""${HOST}"\",
    \"db\": \""${DB}"\",
    \"password\": \""${PASSWORD}"\",
    \"port\": "${PORT}"
  }
}" > ./auth/db_params.json

mkdir resources

exit 0
