import json
import time
import os
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def scrape_boilerlink_events():
    options = uc.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')

    driver = uc.Chrome(options=options)
    
    url = "https://boilerlink.purdue.edu/events"
    driver.get(url)

    # Wait for the event containers to load
    wait = WebDriverWait(driver, 20)
    event_containers = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, 'MuiPaper-root.MuiCard-root.MuiPaper-elevation3.MuiPaper-rounded')))

    print(f"Found {len(event_containers)} event containers")

    events = []

    for index, event in enumerate(event_containers):
        try:
            event_data = {}

            # Extract event URL
            url_element = event.find_element(By.XPATH, "./ancestor::a")
            event_data['url'] = url_element.get_attribute('href')

            # Extract event title
            title_element = event.find_element(By.TAG_NAME, 'h3')
            event_data['title'] = title_element.text.strip()

            # Extract event date and time
            date_time_div = event.find_element(By.XPATH, ".//div[@style='padding: 0px 0px 2.875rem; position: relative; height: 100%;']")
            event_data['date_time'] = date_time_div.text.strip()

            # Extract event location
            location_div = event.find_element(By.XPATH, ".//div[@style='padding: 0.875rem 1rem 0px; font-weight: 500; box-sizing: border-box; position: relative; white-space: nowrap; overflow: hidden; height: 3.75rem; width: 100%;']")
            event_data['location'] = location_div.text.strip()

            events.append(event_data)
            print(f"Event {index+1} scraped successfully: {event_data}")

        except Exception as e:
            print(f"Error scraping event {index+1}: {e}")

    driver.quit()
    return events

if __name__ == "__main__":
    scraped_events = scrape_boilerlink_events()

    current_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(current_dir, 'data')
    os.makedirs(data_dir, exist_ok=True)
    output_file = os.path.join(data_dir, 'boilerlink_events.json')

    with open(output_file, 'w') as f:
        json.dump(scraped_events, f, indent=4)

    print(f"Scraped {len(scraped_events)} events and saved to {output_file}")