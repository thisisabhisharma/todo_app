post = jsonplaceholder.typicode.com/todos?_limit=10; param = uid
post = jsonplaceholder.typicode.com/todo/delete; param = uid, todoID
post = jsonplaceholder.typicode.com/todo/create; param = uid, text
post = jsonplaceholder.typicode.com/todo/update; param = uid, todoID, completed

post = jsonplaceholder.typicode.com/todos/login; param = google_auth_token, response= jwt

//headers = uid = jwt
get = jsonplaceholder.typicode.com/todos?_limit=10; 
get = jsonplaceholder.typicode.com/todo/delete/2;
post = jsonplaceholder.typicode.com/todo/create; param = text
get = jsonplaceholder.typicode.com/todo/update/2;