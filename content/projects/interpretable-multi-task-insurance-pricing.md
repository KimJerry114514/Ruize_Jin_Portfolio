+++
date = '2025-09-01T00:00:00-04:00'
weight = 1
draft = false
title = 'Interpretable Multi-Task Insurance Pricing'
projectType = 'Research Project'
context = 'Insurance · Interpretable ML'
dates = 'September 2025 - April 2026'
proof = 'Severity MAE 4.4% lower than GBM'
technologies = 'Python · R · PyTorch · Multi-Task Learning · Neural Additive Models'
hook = 'Can an insurance pricing model improve predictive accuracy without becoming a black box?'
teaserTitle = 'Interpretable Insurance Pricing'
teaserProof = '4.4% lower severity MAE vs. GBM'
primaryProof = ['4.4% lower severity MAE vs. GBM']
visualStyle = 'research'
image = 'images/projects/mtl-nam-architecture.png'
imageAlt = 'Architecture diagram for the multi-task neural additive insurance pricing model'
imageWidth = 460
project_url = '/projects/insurance-pricing/'
[build]
render = 'never'
list = 'always'
+++

Built an interpretable PyTorch multi-task neural additive model using shared feature subnetworks to jointly predict claim frequency and severity on freMTPL data. Evaluated the model with six-fold cross-validation against GLM, GBM, and single-task NAM benchmarks.
