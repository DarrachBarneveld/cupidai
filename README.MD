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
    ```json
    { "message": "gpt_message" }
    ```
