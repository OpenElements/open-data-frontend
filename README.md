# Open Elements Frontend Template

This repository contains a template for a frontend application that can be used to build new frontend applications for Open Elements.
The template is based on [React](https://reactjs.org/) and can be build by using [npm](https://www.npmjs.com/) or [Docker](https://www.docker.com/).
The application is designed to work with a [backend API](https://github.com/OpenElements/backend-template).

## Start the app locally with npm

To start the app locally, you need to have Node.js installed on your machine.
First, you need to install the dependencies by running the following command in the root directory of the project:

```bash
npm install
```

This will install all the dependencies needed to run the app.

Once that is done you can use npm to start the app.
Here the following commands are available:

```bash
npm start
```

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

```bash
npm test
```

Launches the test runner in the interactive watch mode.

```bash
npm run build
```

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

## Start the app in a Docker container

To start the app in a Docker container, we need to build the Docker image and run the container.

The Docker image is built by the following command that need to be executed in the root directory of the project:

```bash
docker build -t frontend-template .
```

This will build the Docker image with the name `frontend-template`.

To run the Docker container, execute the following command:

```bash
docker run -d -p 5051:8000 frontend-template
```

This will run the Docker container in detached mode (`-d`) and map the port 8000 of the container to the port 5051 of the host machine.
Once that is done you can access the app by navigating to `http://localhost:5051` in your browser.

## Backend integration

The app is designed to work with a backend API.
The URL of the backend API is defined in the `.env` file in the root directory of the project.
The default value is `http://localhost:5050`.
To override this value, you can create a `.env` file in the root directory of the project and define the `REACT_APP_BACKEND_URL` variable with the URL of the backend API.

```env
REACT_APP_BACKEND_URL=http://localhost:6000
```

An even higher priority has the direct definition of an environment variable with the same name.
This can be done by executing the following command:

```bash
export REACT_APP_BACKEND_URL=http://localhost:6000
```

The repository contains a simple backend API that can be used for testing purposes.
The backend can be started by executing the following command in the root directory of the project:

```bash
npm run backend
```

This will start the backend API on port 5050 and forward the requests to the backend API to the `data.json` file in the `backend` directory.

If you want to define a custom backend for the app while using docker locally you can use the following command:

```bash
docker build --build-arg BACKEND_URL=http://new.server:123 -t frontend-template .
```

## Deployment

Today Open Elements uses [koyeb](https://www.koyeb.com) to deploy the frontend and backend services.
The backend can easily be configured by defining an environment variable as described [here](https://www.koyeb.com/docs/build-and-deploy/environment-variables#accessing-environment-variables-during-dockerfile-builds).
If the backend is running in [koyeb](https://www.koyeb.com) you can easily add the URL of the backend to the environment.