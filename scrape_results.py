from lxml import html
import requests
import json

piped = "year|geojson"
limit = 120
i = 0
for year in range(1900, 2017):

  if i >= limit:
	break

  page = requests.get("http://127.0.0.1:8641/wells/" + str(year))
  geojson = page.json()

  line = str(year) + "|" + str(geojson)

  #print line

  print str(year)

  piped = piped + "\n" + line

  i += 1

results = open("results.txt", "w")
results.write(piped)
results.close()
