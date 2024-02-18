# Getting Started with an npm Project

## To start an npm project, follow these steps:

### 1. Clone the Repository

Clone the repository to your local machine using the following command:

```
git clone https://github.com/DarrachBarneveld/cupidai.git

```

### 2. Install Dependencies

Navigate to the project directory and install the project dependencies using npm:

```
cd <project_directory>
npm install

```

This command will install all the dependencies listed in the package.json file.

### 3. Start the Server

After installing the dependencies, start the server by running the following command:

```
npm start
```

This command will start the server and typically outputs the URL where the server is running. By default, it's usually localhost:1234.

### 4. Visit the Server URL

Open your web browser and navigate to the URL where the server is running, typically localhost:1234 unless specified otherwise.

You should now see the application running in your browser!

# CUPID AI API README

## How to start

1. Make sure that [python](https://code.visualstudio.com/docs/python/python-tutorial#_install-a-python-interpreter) is installed in your system.
2. Install dependencies: \
   `pip install -r ./requirements.txt`
3. Create an env.py file with the following content:

   ```python
   import os

   os.environ["OPENAI_API_KEY"] = "your key here"
   os.environ['PLACES_API_KEY'] = "your key here"
   ```

4. Run the following command to start the server:\
   `python3 manage.py runserver`

## Available endpoints:

- ### AskGPT endpoint

  - **Method**: POST

  - **URL**: `/api/ask-gpt`

  - **Body**:
    ```json
    { "message": "your message here" }
    ```
  - **Response**:
   Responds with a stream of text. Can be read using *fetch* as in the following [article](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams#consuming_a_fetch_as_a_stream).

      Example of implementation can be seen below:

      ```javascript
      async function readData(url) {
         const response = await fetch(url);
         const reader = response.body.getReader();
         while (true) {
            const { done, value } = await reader.read();
            if (done) {
               // Do something with last chunk of data then exit reader
               return;
            }
            // Otherwise do something here to process current chunk
         }
      }
      ```

- ### Google Places endpoint

  - **Method**: POST

  - **URL**: `/api/places`

  - **Body**:
   ```json
   {
      "lat": 51.5072,
      "lng": 0.1276,
      "text": "music"
   }
    ```
  - **Response**:
   ```json
   {
      "places": [
         {
            "internationalPhoneNumber": "+44 7427 709209",
            "formattedAddress": "Unit 705, Exeter House, 41 Academy Way, Dagenham RM8 2FP, UK",
            "rating": 5,
            "googleMapsUri": "https://maps.google.com/?cid=9812856155803149089",
            "displayName": {
                "text": "M music for life",
                "languageCode": "en"
            },
         }
      ]
   }
   ```



## API DEPLOYMENT
1. Add `gunicorn` to requirements.txt
2. Create a Procfile with the following content:
   ```
   web: gunicorn backend.wsgi
   ```
3. Create **Heroku** application and link to **GitHub** repository
4. Add custom [Build Pack](https://github.com/timanovsky/subdir-heroku-buildpack.git) to deploy from subdirectory. To add a custom Build Pack go to the Heroku settings to the Buildpacks section.
5. Setup environment variables:
   - `PROJECT_PATH` : `backend` - *the subdirectory where the api is located*
   - `DISABLE_COLLECTSTATIC` : `1`
   - `OPENAI_API_KEY` : *your secret key*
   - `PLACES_API_KEY` : *your secret key*

6. Deploy from branch