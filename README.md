# Smart Gallery

An AI powered gallery web app to conveniently organize your photos. This includes:

- **Image classification and tagging** - Search for images in natural language with descriptions.
- **Face detection and similarity** - Uploaded photos are grouped by similar faces

A React app for my [Machine Learning based image REST API](https://github.com/Antony90/image-scene-classifier/) backend.

### Frontend

- ant.design - React UI library
- Redux - UI state management
- firebase - database and image storage

### Backend (image classifier, face detection, face data storage)

A REST server hosting an image classification endpoint and face simlarity microservice which stores facial data to group images by unique faces.

Source code and installation [here](https://github.com/Antony90/image-scene-classifier/).

- MongoDB - face embedding data & metadata
- dlib - face recognition
- FastAPI - REST server with automatic documentation

### Demo

~~A static demo is hosted [here](https://antony90.github.io/smart-gallery)~~ To be added soon.

### Screenshots



## Usage

### Installation
Requires `nodejs` and `python3` (for backend). A firebase app and mongodb database is required.

```npm install```

### Run local

Start the http server.

```npm run start```

Start the [backend](https://github.com/image-scene-classifier). Defaults to port 8000.

### Environment variables

Copy the contents of `.env.example` to `.env` and fill with firebase credentials.
