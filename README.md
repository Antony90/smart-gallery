
<h1 align="center">Smart Gallery</h1>

<p align="center">
An AI powered gallery web app to conveniently organize your photos.
</p>
<p align="center">
A React app for my <a href="https://github.com/Antony90/ml-photo-api/">Machine Learning based image REST API</a>.
</p>

---

### Machine Learning features:

- **Image classification and tagging** - Search for images in natural language descriptions.
- **Face detection and similarity** - Uploaded photos are grouped by similar faces and visualized with face bounding boxes.

### Photo Gallery features:
- **Create Smart Photo Albums** - Select photos or use automatically generated albums based on tags, faces or date uploaded.
- **Graphs and Statistics** - Image tag distribution, face data
- **Cloud storage** - Firebase storage
- **Masonry Gallery layout** - A natural tiling layout for photos
- **Filtering by metadata** - Any photo metadata

### TODO features:
- Use face bounding boxes for a "generate collage" tool
- Simple photo effects button e.g. contrast, shadow, brightness, filters  

---


### Screenshots
<table>
    <tr>
        <td>Photos</td>
        <td>ML Data Overview</td>
    </tr>
    <tr>
        <td><img src="screenshots/photos.png" width=400></td>
        <td><img src="screenshots/overview.png" width=400></td>
    </tr>
    <tr>
        <td>Face ID</td>
        <td>ML Action History</td>
    </tr>
    <tr>
        <td><img src="screenshots/faces.png" width=400></td>
        <td><img src="screenshots/actions.png" width=400></td>
    </tr>
    <tr>
        <td>Photo Preview</td>
        <td>Photo Details</td>
    </tr>
    <tr>
        <td><img src="screenshots/preview.png" width=400></td>
        <td><img src="screenshots/details.png" width=400></td>
    </tr>

    
</table>



### Frontend tech

- ant.design - React UI library
- React ApexCharts.js, `ant-design/charts` - Beautiful graphs and charts
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


## Usage

### Installation
Requires `nodejs` and `python3` (for backend). A firebase app and mongodb database is required.

```npm install```

### Run local

Start the http server.

```npm run start```

Also start the [backend](https://github.com/image-scene-classifier). Defaults to port 8000.

### Environment variables

Copy the contents of `.env.example` to `.env` and fill with firebase credentials.
