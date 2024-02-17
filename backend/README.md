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
        {"message": "your message here"}
        ```
    - **Response**:
        ```json
        {"message": "gpt_message"}
        ```