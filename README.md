# Eddie

Run the frontend, backend, and setup nginx (or another reverse proxy) to avoid CORS.
If you do not want to use nginx, there are other methods to deal with CORS.

## Running the Frontend

### Pre-reqs

You need to have nodejs and npm installed - to install, do the following:

```
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
$ sudo apt install nodejs
```

The first line sets up respository sources to install the newest nodejs

The second line installs nodejs and npm.

The app was built on node 12.18.4 and npm 6.14.6

### Starting the server

To start the server, run `npm start` in the `frontend` directory

---

## Running the Backend

### Pre-reqs

Python and Flask are the only prerequisites needed.

Install flask on python >=3.5. Recommended to do this in a venv. An example might look like the following

```
$ python3 -m venv ~/.virtualenvs/eddiebackend/
$ source ~/.virtualenvs/eddiebackend/bin/activate
$ pip install --upgrade pip setuptools wheel
$ pip install Flask
```

### Starting the Server

To run the flask server, do the following in the backend directory

```
$ export FLASK_APP=main.py
$ flask run
```

---

## Setting up nginx


### Installing nginx

Run `sudo apt install nginx` to install nginx

- To start nginx, run `sudo nginx`
- To stop nginx, run `sudo nginx -s quit`
- To reload nginx, run `sudo nginx -s reload`

### nginx setup

Create a file called `eddie_server` in `/etc/nginx/sites-available/` with the following contents

```
server {
    listen 80;
    server_name localhost;
    location / {
        proxy_pass http://localhost:3000/;
    }
    location /backend/ {
        proxy_pass http://localhost:5000/;
    }
}
```

Remove the softlink `/etc/nginx/sites-available/default` and add one to `eddie_server`

Reload nginx or start it if it isn't running
