# import requests
# from bs4 import BeautifulSoup
# import json

# def scrape_purdue_events():
#     url = "https://events.purdue.edu/"
#     response = requests.get(url)
#     soup = BeautifulSoup(response.content, 'html.parser')
    
#     events = []
    
#     for event_card in soup.find_all('div', class_='em-card'):
#         event = {}
#         # Extract title
#         title = event_card.find('h3', class_='em-card_title')
#         if title and title.a:
#             event['title'] = title.a.text.strip()
#             event['url'] = title.a['href']
        
#         # Extract date and time
#         date_time = event_card.find('p', class_='em-card_event-text')
#         if date_time:
#             event['date_time'] = date_time.text.strip()
        
#         # Extract location
#         location = event_card.find_all('p', class_='em-card_event-text')
#         if len(location) > 1:
#             event['location'] = location[1].text.strip()
        
#         # Extract tags
#         tags = event_card.find('div', class_='em-list_tags')
#         if tags:
#             event['tags'] = [tag.text.strip() for tag in tags.find_all('span', class_='em-card_tag')]
        
#         if event:  # Only add event if we found any information
#             events.append(event)
    
#     return events

# if __name__ == "__main__":
#     scraped_events = scrape_purdue_events()
    
#     # Save to JSON file
#     with open('purdue_events.json', 'w') as f:
#         json.dump(scraped_events, f, indent=2)
    
#     print(f"Scraped {len(scraped_events)} events and saved to purdue_events.json")

import requests
from bs4 import BeautifulSoup
import json
import os

def scrape_purdue_events():
    url = "https://events.purdue.edu/"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    events = []

    for event_card in soup.find_all('div', class_='em-card'):
        event = {}
        # Extract title
        title = event_card.find('h3', class_='em-card_title')
        if title and title.a:
            event['title'] = title.a.text.strip()
            event['url'] = title.a['href']

        # Extract date and time
        date_time = event_card.find('p', class_='em-card_event-text')
        if date_time:
            event['date_time'] = date_time.text.strip()

        # Extract location
        location = event_card.find_all('p', class_='em-card_event-text')
        if len(location) > 1:
            event['location'] = location[1].text.strip()

        # Extract tags
        tags = event_card.find('div', class_='em-list_tags')
        if tags:
            event['tags'] = [tag.text.strip() for tag in tags.find_all('span', class_='em-card_tag')]

        if event:  # Only add event if we found any information
            events.append(event)

    return events

if __name__ == "__main__":
    scraped_events = scrape_purdue_events()

    # Get the directory of the current script
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Define the data directory
    data_dir = os.path.join(current_dir, 'data')

    # Ensure the data directory exists
    os.makedirs(data_dir, exist_ok=True)

    # Define the output file path
    output_file = os.path.join(data_dir, 'purdue_events.json')

    # Save to JSON file
    with open(output_file, 'w') as f:
        json.dump(scraped_events, f, indent=2)

    print(f"Scraped {len(scraped_events)} events and saved to {output_file}")