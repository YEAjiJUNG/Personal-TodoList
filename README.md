# Personal TodoList

## Project info

This project is a web application that allows you to create an account(register), login, and manage context in your personal account.

It uses **MongoDB** for storing data and **Nodejs** for client & backend server. **React** is used with redux in this project. In case of Database **MongoDB Atlas**, online MongoDB service, is used.

## Prerequisite

- MongoDB
- Express
- React
- Nodejs

## Step Details

_1. Register_

when you signup and the request is made, the server uses the express library to receive the request and store the user information in the database.
When storing information, the password is encrypted and stored with the Bcrypt library.

_2. Login_

When a login request is made at the client side, the server receives the request, and if there is an email identical to the email fo the user information sent by the client in the database,
checks whether the password is same, and then generates a token through the jsonwebtoken library.
Put the generated token tin the user of db and store the generated token in the user information in the cookie on the client side.
It keeps checking if the two tokens are the same.

_3. TodoList_

If you have created a new account, an empty list will appear. If you log in with the account that saved the list, the list is displayed.
Click the edit button to go to the insert page.

_4. TodoEdit_

On this page, you can add, delete, and modify lists. After editing, click the save button or the upper left account button to return to the list page.

## Preview

> login page
> <img width="959" alt="login" src="https://user-images.githubusercontent.com/66558804/105577338-42bf4c00-5dbc-11eb-981f-a8a0d8c7bd8c.PNG">

> todolist page
> <img width="959" alt="todolist" src="https://user-images.githubusercontent.com/66558804/105577349-5965a300-5dbc-11eb-9db6-0d4bea7943e9.PNG">
