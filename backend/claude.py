import anthropic
import os
from dotenv import load_dotenv
import json
import re
from prompts import tools
from utils import extract_tool_data_as_json
load_dotenv()

def claude_api(msg):
    """
    Takes in the prompt message, calls Claude and returns Claude's response in JSON

    """
    client = anthropic.Anthropic(
        api_key=os.environ["CLAUDE_API_KEY"],
    )
    message = client.messages.create(
        model="claude-3-7-sonnet-20250219",
        max_tokens=7024,
        tools=tools,
        messages=[
            {"role": "user", "content": msg}
        ]
    )
    return extract_tool_data_as_json(message)
    