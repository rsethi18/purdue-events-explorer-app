# import json

# def clean_event_data(events):
#     cleaned_events = []
#     for event in events:
#         cleaned_event = {}
#         cleaned_event['url'] = event['url'].strip()
#         cleaned_event['title'] = event['title'].strip()

#         # Clean date_time field and separate into date_time, location, and organizer
#         date_time = event['date_time'].strip()
#         parts = date_time.split('\n')
        
#         if len(parts) >= 1:
#             cleaned_event['date_time'] = parts[0].strip()
#         if len(parts) >= 2:
#             cleaned_event['location'] = parts[1].strip()
#         if len(parts) >= 3:
#             cleaned_event['organizer'] = parts[2].strip()
        
#         cleaned_events.append(cleaned_event)
    
#     return cleaned_events

# if __name__ == "__main__":
#     # Read the boilerlink_events.json file
#     with open('boilerlink_events.json', 'r') as f:
#         scraped_events = json.load(f)
    
#     # Clean the event data
#     cleaned_events = clean_event_data(scraped_events)
    
#     # Save the cleaned data to a new JSON file
#     with open('boilerlink_clean.json', 'w') as f:
#         json.dump(cleaned_events, f, indent=4)
    
#     print(f"Cleaned {len(cleaned_events)} events and saved to boilerlink_clean.json")

import json
import os

def clean_event_data(events):
    cleaned_events = []
    for event in events:
        cleaned_event = {}
        cleaned_event['url'] = event['url'].strip()
        cleaned_event['title'] = event['title'].strip()

        # Clean date_time field and separate into date_time, location, and organizer
        date_time = event['date_time'].strip()
        parts = date_time.split('\n')
        
        if len(parts) >= 1:
            cleaned_event['date_time'] = parts[0].strip()
        if len(parts) >= 2:
            cleaned_event['location'] = parts[1].strip()
        if len(parts) >= 3:
            cleaned_event['organizer'] = parts[2].strip()
        
        cleaned_events.append(cleaned_event)
    
    return cleaned_events

if __name__ == "__main__":
    # Get the directory of the current script
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Define the data directory
    data_dir = os.path.join(current_dir, 'data')

    # Ensure the data directory exists
    os.makedirs(data_dir, exist_ok=True)

    # Define the input and output file paths
    input_file = os.path.join(data_dir, 'boilerlink_events.json')
    output_file = os.path.join(data_dir, 'boilerlink_clean.json')

    # Read the boilerlink_events.json file
    with open(input_file, 'r') as f:
        scraped_events = json.load(f)
    
    # Clean the event data
    cleaned_events = clean_event_data(scraped_events)
    
    # Save the cleaned data to a new JSON file
    with open(output_file, 'w') as f:
        json.dump(cleaned_events, f, indent=4)
    
    print(f"Cleaned {len(cleaned_events)} events and saved to {output_file}")
