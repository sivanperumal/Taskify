# React + TypeScript + Vite

# Pages

Signup page

- new user -> userList

Signin page

- creds -> userList any user matched with creds
- allow the user to access the app

Home page

- create list or group (store into list or group)
- create list under group (store into list)
- create task under list (store into task)
- while onloading, data will retrive from localstorage
- delete group (when deleting the group, remove all the list and task)
- delete list (when deleting the list, remove all the task)
- delete task

# Features

1. Authentication
2. Unit test using jest

# Extensions

- React router
- Redux tool kit
- MUI or react bootstrap
- Jest test case

# API Details

{
username: string
email: string
pasword: string
}[]

group
{
id: number
name: string
}[]

list
{
id
name
groupid: number | null
}[]

task
{
id: number
groupid: number|null
listid: number|null
name: string
}[]
