# Web Scraper & Server with Docker
Files Included
1. scrape.js — Node.js script using Puppeteer to scrape data.

2. server.py — Python Flask app that hosts the scraped data.

3. package.json — Node.js dependencies.

4. requirements.txt — Python dependencies.

5. Dockerfile — Multi-stage Docker build.


#1. scrape.js (Node.js Web Scraper)
Purpose:
This is the brain of the scraping process. It launches a headless browser (Chromium), 
navigates to the URL provided via an environment variable, grabs some info (title , H1 heading, url),
and saves it to a JSON file.

Uses Puppeteer to control the browser.

Accepts the URL from the environment variable SCRAPE_URL.

Launches Chromium in headless mode with safe flags.



#2. package.json (Node.js Configuration)
Purpose:
This file tells Node.js which packages your scraper needs and other project metadata
Name and version of your app.

Scripts (none used here, but could add "start": "node scrape.js").

Dependencies → puppeteer is the main one.

#3 server.py (Python Flask Web Server)
Purpose:
Reads the scraped JSON data and serves it via an HTTP endpoint (http://localhost:5000).
Imports Flask and reads scraped_data.json.

Defines one route: / → returns the scraped JSON.

Runs the server on port 5000, accessible via localhost (or container IP).


#4. requirements.txt ( To Download Python Dependencies)
Purpose:
Lists Python libraries that need to be installed in the final Docker image.

#5. Dockerfile (In which we pasted all files )
Purpose:
This file defines how to build the full Docker image. It’s a multi-stage build with two phases:
    Stage 1 – Scraper (Node.js + Puppeteer)
                Uses node:18-slim.
                Installs Chromium via apt (Puppeteer won’t download its own copy).
                Installs puppeteer.
                Copies and runs scrape.js.
                Outputs scraped_data.json.
Stage 2 – Web Server (Python + Flask)
              Uses python:3.10-slim.
              Copies scraped_data.json from previous stage.
              Copies Flask app files.
              Installs Flask using requirements.txt.
              Runs server.py when the container starts.




# Steps to build and run the container 
 1. Clone the Repo
    git clone https://github.com/your-username/scrape-and-serve.git
    cd scrape-and-serve

2. Build the Docker Image
   Pass the URL you want to scrape using the build argument SCRAPE_URL:
   
      docker build --build-arg SCRAPE_URL=https://example.com -t scraper-host .

4. Run the Container
       docker run -p 5000:5000 scraper-host

5. View the Result
   Open your browser and visit:
           http://localhost:5000

5.You will see a JSON output like this:
      {
  "title": "Example Domain",
  "heading": "Example Domain"
  "url": "https://example.com"
}

