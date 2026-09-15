+++
date = '2025-03-01T00:00:00-05:00'
weight = 2
draft = false
title = 'NYC Taxi Mobility Intelligence'
projectType = 'Data Product'
context = 'Urban Mobility · Applied Machine Learning'
technologies = 'Python · XGBoost · FastAPI · GeoPandas · Docker · Google Cloud Run'
hook = 'How predictable is New York City in motion?'
teaserTitle = 'NYC Taxi Mobility Intelligence'
visualStyle = 'mobility'
image = 'images/projects/nyc-taxi-mobility.jpeg'
imageAlt = 'New York City yellow taxi representing the mobility intelligence project'
imageWidth = 700
cta_text = 'Explore the Project'
project_url = '/projects/nyc-taxi-mobility-intelligence/'
[build]
render = 'never'
list = 'always'
+++

Predict NYC Yellow Taxi trip duration and pre-tip cost before the ride begins — using only pickup, destination, and departure time. Unlike models that rely on information only known after a trip is completed, this system uses only pre-trip features available at prediction time. The final XGBoost models were trained on 10.9M trips and deployed as an interactive prediction tool.
