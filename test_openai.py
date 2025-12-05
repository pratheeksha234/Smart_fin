import openai
import os
from dotenv import load_dotenv

# Load the .env file where you store your OpenAI API key
load_dotenv()

# Get your OpenAI API key from environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")

def test_chat():
    try:
        # Making an API call to OpenAI's ChatCompletion endpoint
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # You can change to "gpt-4" if you have access
            messages=[
                {"role": "system", "content": "You are a helpful finance assistant."},
                {"role": "user", "content": "How can I save more money each month?"}
            ]
        )

        # Extracting and printing the response message
        print("AI Response:", response['choices'][0]['message']['content'])
    except Exception as e:
        # If there's an error, print it
        print("❌ Error:", e)

# Run the test function
test_chat()
