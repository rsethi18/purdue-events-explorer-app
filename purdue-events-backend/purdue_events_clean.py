# import json
# import re

# def clean_text(text):
#     # Replace unicode escape sequences with the corresponding character
#     return re.sub(r'\\u[0-9a-fA-F]{4}', lambda x: chr(int(x.group(0)[2:], 16)), text)

# def clean_event(event):
#     # Only keep events that have date_time and location
#     if 'date_time' in event and 'location' in event:
#         # Clean up unicode characters
#         event['title'] = clean_text(event['title'])
#         event['location'] = clean_text(event['location'])
#         event['date_time'] = clean_text(event['date_time'])
#         if 'tags' in event:
#             event['tags'] = [clean_text(tag) for tag in event['tags']]
#         return event
#     return None

# def clean_events(input_file_path, output_file_path):
#     with open(input_file_path, 'r') as f:
#         events = json.load(f)

#     cleaned_events = []
#     for event in events:
#         cleaned_event = clean_event(event)
#         if cleaned_event:
#             cleaned_events.append(cleaned_event)

#     with open(output_file_path, 'w') as f:
#         json.dump(cleaned_events, f, indent=2)

#     print(f"Cleaned {len(cleaned_events)} events and saved to {output_file_path}")

# if __name__ == "__main__":
#     clean_events('purdue_events.json', 'cleaned_purdue_events.json')

import json
import re
import os

def clean_text(text):
    # Replace unicode escape sequences with the corresponding character
    return re.sub(r'\\u[0-9a-fA-F]{4}', lambda x: chr(int(x.group(0)[2:], 16)), text)

def clean_event(event):
    # Only keep events that have date_time and location
    if 'date_time' in event and 'location' in event:
        # Clean up unicode characters
        event['title'] = clean_text(event['title'])
        event['location'] = clean_text(event['location'])
        event['date_time'] = clean_text(event['date_time'])
        if 'tags' in event:
            event['tags'] = [clean_text(tag) for tag in event['tags']]
        return event
    return None

def clean_events(input_file_path, output_file_path):
    with open(input_file_path, 'r') as f:
        events = json.load(f)

    cleaned_events = []
    for event in events:
        cleaned_event = clean_event(event)
        if cleaned_event:
            cleaned_events.append(cleaned_event)

    with open(output_file_path, 'w') as f:
        json.dump(cleaned_events, f, indent=2)

    print(f"Cleaned {len(cleaned_events)} events and saved to {output_file_path}")

if __name__ == "__main__":
    # Get the directory of the current script
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Define the data directory
    data_dir = os.path.join(current_dir, 'data')

    # Ensure the data directory exists
    os.makedirs(data_dir, exist_ok=True)

    # Define the input and output file paths
    input_file = os.path.join(data_dir, 'purdue_events.json')
    output_file = os.path.join(data_dir, 'cleaned_purdue_events.json')

    clean_events(input_file, output_file)
