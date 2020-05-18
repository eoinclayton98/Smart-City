import requests
import pandas as pd
import os

"""
This was used to convert a csv file of URLs into images

"""

dataset = pd.read_csv('6051.csv') # open csv file

# gets path to save the images to
script_dir = os.path.dirname(os.path.abspath(__file__)) 
dest_dir = os.path.join(script_dir, '6051') 

try:
    os.makedirs(dest_dir) # creates a new folder if it doesn't already exist
except OSError:
    pass # already exists



i = 0

for index, row in dataset.iterrows(): # iterate through rows in the csv file
	
	i = i + 1

	url = row['url'] # get the url

	filename = 'image'+ str(i) + ".png" # convert to png

	path = os.path.join(dest_dir, filename)

	r = requests.get(url, allow_redirects=True)
	open(path, 'wb').write(r.content)

