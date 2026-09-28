+++
date = '2025-09-01T00:00:00-04:00'
weight = 3
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

Actuaries would face a trade-off when making insurance pricing: traditional models(GLMs) are transparent without capturing complex nonlinear risk patterns, while flexible machine-learning models can be harder to interpret stakeholders. I explored whether insurers could capture nonlinear risk patterns without giving up model transparency by building a multi-task neural additive model that jointly learns claim frequency and severity while preserving feature-level explanations, using a French motor insurance dataset.
