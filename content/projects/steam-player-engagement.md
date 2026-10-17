+++
weight = 2
draft = false
title = 'Not All Steam Negative Reviews Are Equal'
projectType = 'Data Science Team Project'
context = 'Player Engagement · Complaint Analysis'
technologies = 'Python · LightGBM · NLP · LLM-Assisted Labeling · Multilingual Classification · Model Calibration'
hook = 'Which Negative Reviews Signal Disengagement Risk?'
visualStyle = 'steam'
image = 'images/projects/steam-player-engagement/review-bombing.png'
imageAlt = 'Collage of Steam Not Recommended reviews with high recorded playtimes and red thumbs-down icons'
imageWidth = 1200
cta_text = 'Explore the Project'
project_url = '/projects/steam-player-engagement/'
[build]
render = 'never'
list = 'always'
+++

Using millions of negative Steam reviews, we combined structured player behavior with NLP-derived complaint factors to predict observed post-review engagement and translate the results into four actionable player segments. LightGBM with structured and NLP features achieved 0.824 ROC-AUC on the 2023 test set; the top predicted-engagement decile reached 88.7% observed engagement, a 2.38× lift.
