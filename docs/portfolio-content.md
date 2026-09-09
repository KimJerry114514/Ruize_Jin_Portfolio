# 1. Identity

This document is the factual source of truth for future portfolio implementation. When sources differ, the resume governs education, employment, dates, project facts, technologies, metrics, and quantitative achievements. The GitHub profile README informs professional narrative and interests. User-provided positioning and project classifications are recorded where noted.

- **Name:** Ruize Jin
- **Professional headline:** Data Scientist | AI Engineer
- **Supporting narrative:** Actuarial Science → Data Science & AI Engineering
- **Location:** Durham, NC, USA
- **Public professional email:** [ruize.jin@duke.edu](mailto:ruize.jin@duke.edu)
- **LinkedIn:** [linkedin.com/in/ruize-jin-082205377](https://www.linkedin.com/in/ruize-jin-082205377/)
- **GitHub:** [github.com/KimJerry114514](https://github.com/KimJerry114514)
- **Website:** [ruizejin.com](https://ruizejin.com)

Private contact details from the resume and GitHub README are intentionally excluded.

# 2. Hero

## Proposed homepage copy

**Ruize Jin**

**Data Scientist | AI Engineer**

**Actuarial Science → Data Science & AI Engineering**

I combine quantitative modeling, data science, and applied AI with practical experience across insurance, healthcare, and enterprise analytics to turn complex data into clearer business decisions.

## Proposed CTA links

- **View Featured Projects:** future homepage anchor `#featured-projects`
- **LinkedIn:** <https://www.linkedin.com/in/ruize-jin-082205377/>
- **GitHub:** <https://github.com/KimJerry114514>
- **Email:** <mailto:ruize.jin@duke.edu>
- **Resume:** `/Ruize%20Jin%20Resume.pdf`

# 3. About

## Proposed homepage copy

I am a Master of Quantitative Management: Business Analytics student in Duke University's Risk Track, with an actuarial science background from the Central University of Finance and Economics. My experience spans insurance, healthcare, and enterprise analytics, where I have worked with data pipelines, predictive modeling, reporting, machine learning, and applied AI. I am interested in Data Scientist and AI Engineer roles focused on decision support and practical business problems, connecting quantitative thinking with implementation.

## Narrative foundations

- Graduate study in Business Analytics at Duke University.
- Undergraduate training in actuarial science.
- A deliberate transition toward broader Data Science and AI Engineering roles.
- Hands-on work in insurance, healthcare, and enterprise/business settings.
- Professional interests in predictive modeling, decision support, machine learning, analytics, and applied AI.
- A focus on connecting quantitative reasoning with practical business needs.

# 4. Education

## Duke University

- **Degree:** Master of Quantitative Management: Business Analytics
- **Track:** Risk Track
- **Expected graduation:** May 2027
- **Location:** Durham, NC, USA
- **Selected relevant coursework:** Data Infrastructure; Data Science for Business; Decision Analytics & Modeling; Data Visualization

## Central University of Finance and Economics

- **Degree:** Bachelor of Science
- **Major:** Actuarial Science
- **GPA:** 3.7/4.0
- **Graduation:** June 2026
- **Location:** Beijing, China
- **Selected recognition:** Munich Re Cup Actuarial Mathematics Competition, Global Top 100
- **Additional verified involvement:** Student Ambassador, Institute and Faculty of Actuaries (IFoA); Vice President, CUFE News Agency; Deputy Editor, University Newspaper

# 5. Professional Experience

## SCOR SE

- **Role:** Marketing Actuary Intern
- **Location:** Beijing, China
- **Dates:** November 2025 - April 2026
- **Verified accomplishments:**
  - Built a SQL ETL pipeline and analyzed claims and policy data in Python for 20 Life & Health clients, reducing analysis time by 50% and informing client segmentation and marketing strategy.
  - Built Power BI dashboards for Life & Health portfolio reporting and experience analysis, with automated quarterly refreshes for recurring performance monitoring and reporting.
  - Deployed a Qwen-powered AI agent to collect insurers' solvency reports and extract and validate key data, reducing report-processing time by 70% and supporting market solvency analysis.
- **Explicitly supported technologies:** SQL, ETL, Python, Power BI, Qwen, LLM agents

## Siemens

- **Role:** Data Analytics Intern
- **Location:** Beijing, China
- **Dates:** July 2025 - November 2025
- **Verified accomplishments:**
  - Deployed Selenium crawlers and AWS pipelines to automate macroeconomic data collection; optimized PySpark workflows, improving resource utilization by 30% and reducing processing time by 45%.
  - Cleaned and migrated COPA data with pandas and delivered CPD reports to business teams, supporting performance analysis and decision-making.
  - Developed scripts to scrape, structure, and ingest million-scale business documents into a RAG knowledge base supporting Siemens' in-house LLM and grounded, domain-specific responses.
- **Explicitly supported technologies:** Selenium, AWS, PySpark, pandas, web scraping, RAG, LLM knowledge bases

## Peking University International Hospital

- **Role:** Medical Data Operation Intern
- **Location:** Beijing, China
- **Dates:** June 2024 - July 2024
- **Verified accomplishments:**
  - Worked with reimbursement and finance teams to validate quarterly inpatient data and resolve discrepancies across more than 2,000 records, reducing errors by 32%.
  - Presented DRG/DIP reimbursement analyses to visiting faculty and the dean, explaining stakeholder trade-offs and financial implications for hospitals, patients, and insurers.
- **Explicitly supported domain methods:** inpatient-data validation; DRG/DIP reimbursement analysis

# 6. Featured Projects

These are concise source records for Portfolio v0.1. They are not full case studies.

## Project A: Interpretable Multi-Task Insurance Pricing

- **Classification:** Research-oriented machine learning project
- **Classification source:** User-provided portfolio direction; the resume supplies the technical facts but does not state publication or formal research status.
- **Dates:** September 2025 - April 2026
- **Project context:** Interpretable insurance pure-premium modeling through joint claim-frequency and claim-severity prediction.
- **Verified dataset:** freMTPL dataset. The resume does not specify the exact freMTPL component, sample size, or preprocessing scope.
- **Verified modeling approach:** An interpretable PyTorch multi-task neural additive model (MTL-NAM) using shared feature subnetworks to jointly predict claim frequency and severity.
- **Verified benchmarks:** Generalized linear model (GLM), gradient boosting machine (GBM), and single-task neural additive model (NAM).
- **Verified evaluation methodology:** Six-fold cross-validation.
- **Verified metrics:** The resume reports the lowest negative log-likelihood (NLL), root mean squared error (RMSE), and mean absolute error (MAE) among the listed benchmarks, with severity MAE 4.4% below GBM.
- **Technologies:** Python, R, PyTorch, multi-task learning, neural additive models
- **Strongest homepage proof point:** Severity MAE 4.4% below GBM in six-fold cross-validation while jointly modeling claim frequency and severity.
- **Claims that should not be made yet:**
  - Production deployment or production readiness
  - Commercial adoption or insurer use
  - Business impact, pricing lift, or underwriting impact
  - Real-time inference or enterprise-scale operation
  - Published-paper, peer-reviewed, or state-of-the-art status

## Project B: NYC Taxi Demand & Mobility Modeling

- **Classification:** Course-originated end-to-end data science project
- **Classification source:** User-provided portfolio direction; the resume does not identify the course.
- **Dates:** March 2025 - July 2025
- **Project context:** Forecasting NYC taxi demand and classifying traffic patterns, with related fare and trip-duration modeling.
- **Verified dataset scale:** Separate NYC TLC Yellow Taxi datasets containing 3.5 million January records and 11.2 million January-March records.
- **Verified geographic scale:** 263 zones.
- **Verified feature engineering:** Tabular and spatiotemporal features across the 263 zones.
- **Verified models:** Multilayer perceptron (MLP), attention-LSTM, convolutional neural network (CNN), and XGBoost.
- **Verified metrics:** $4.45 total-amount RMSE and 2.53-minute trip-duration RMSE.
- **Verified analytical use:** Fare estimation, trip-time modeling, and demand planning.
- **AWS and deployment facts explicitly supported by the resume:** The resume states that the models were productionized on AWS and that monthly data ingestion, inference, and monitoring were automated. No further infrastructure, serving, usage, or reliability details are documented.
- **Technologies:** Python, AWS, MLP, attention-LSTM, CNN, XGBoost, tabular feature engineering, spatiotemporal feature engineering
- **Strongest homepage proof points:** 11.2 million January-March trips across 263 zones; comparison of four model families; $4.45 total-amount RMSE and 2.53-minute trip-duration RMSE.
- **Claims that should not be made yet:**
  - Commercial product or commercial adoption
  - Real-time citywide demand platform
  - Enterprise deployment, production ownership, or service-level guarantees
  - Scale beyond the documented datasets and monthly workflow
  - Causal claims about changes to taxi operations or public mobility outcomes

# 7. Technical Capabilities

The future website should present these as selected capabilities, without skill percentages, self-ratings, or a logo wall.

## Machine Learning & Statistics

- Machine learning and deep learning
- Predictive modeling and decision support
- Time-series forecasting
- Multi-task learning
- Natural language processing
- A/B testing
- GLM, GBM, neural additive models, MLP, attention-LSTM, CNN, and XGBoost
- PyTorch and scikit-learn

## Data & Engineering

- Python, NumPy, pandas, PySpark, and SQL
- ETL and data pipelines
- AWS workflows
- Selenium and web scraping
- Automated data ingestion, inference, and monitoring within the documented taxi project

## Applied AI

- LLM agents
- Retrieval-augmented generation (RAG) knowledge bases
- Qwen-powered information extraction and validation
- Structuring and ingesting business documents for grounded, domain-specific LLM responses

## Analytics & Visualization

- R
- Power BI
- Tableau
- Advanced Excel
- Data visualization, dashboarding, reporting, and experience analysis
- Decision analytics and business-facing analysis

## Profile-supported tools requiring stronger portfolio evidence

The GitHub profile README lists FastAPI, Docker, and Git. They are supported by the profile, but the resume does not connect them to specific work or project evidence. Keep them secondary until supporting examples are confirmed.

# 8. Personal Touch

## Optional concise copy

Outside work, I am an amateur chef, food enthusiast, and bird lover.

This material is resume-supported and should remain secondary to the professional narrative.

# 9. Content Integrity Notes

## Facts fully verified by the resume

- Duke degree, Risk Track, expected graduation, location, and listed coursework.
- CUFE degree, major, GPA, graduation, location, competition recognition, and listed campus involvement.
- Employer names, job titles, locations, dates, responsibilities, technologies named in the experience bullets, and all experience metrics.
- Both project date ranges, datasets as described, model families, evaluation language, metrics, and technologies.
- Resume-listed technical capabilities and personal interests.
- Durham, NC as the location shown in the resume header.

## Facts and positioning supported by the GitHub profile README

- The Actuarial Science → Data Science & AI Engineering transition.
- Interest in Data Scientist, AI Engineer, and analytics roles.
- Interest in predictive modeling, decision support, analytics, machine learning, and applied AI.
- Experience across insurance, healthcare, and business settings.
- FastAPI, Docker, and Git as profile-listed tools only.

## User-provided facts and editorial direction

- Professional headline: Data Scientist | AI Engineer.
- Public website URL and professional links.
- Classification of the insurance project as research-oriented.
- Classification of the NYC taxi project as course-originated.
- Requirement to use the Duke email as the public professional email.

## Wording lightly rewritten for portfolio use

- The Hero value proposition and About copy synthesize the GitHub narrative with resume-supported domain experience.
- Experience bullets have been shortened and normalized for readability while preserving the original facts and numerical metrics.
- The two working project display titles are clearer portfolio labels than the resume titles.
- “Life & Health” is written out on first use where the resume uses “L&H.”
- The personal-interest line converts resume fragments into one restrained sentence.

## Facts that remain ambiguous or require confirmation

- Whether Durham, NC should remain the public location when the website is published.
- The exact AWS certification name, date, credential status, and whether it should appear publicly. The resume currently says “AWS Certificated AI Practitioner.”
- The depth and recency of FastAPI, Docker, and Git experience, which appear in the GitHub README but are not evidenced in resume bullets.
- The exact freMTPL dataset component, record count, feature set, preprocessing, and train/test construction.
- The meaning and aggregation of the insurance project's “lowest NLL, RMSE, and MAE” statement across tasks and folds.
- Whether the insurance project is part of a thesis, paper, team project, or independent study; authorship and publication status are not documented.
- The specific course, team structure, individual contribution, and repository for the NYC taxi project.
- The AWS architecture and scope behind “productionized,” including services used, endpoint or batch design, monitoring method, users, duration, and whether the workflow remains active.
- Whether the 11.2 million January-March taxi records include the separately cited 3.5 million January records; the resume describes them as separate datasets.
- Repositories or public links for either featured project.

## Claims intentionally excluded because evidence is insufficient

- Personal Gmail address and resume phone number.
- Commercial adoption, paying users, or client deployment for either project.
- Production-grade, enterprise-scale, state-of-the-art, or industry-leading claims.
- Business-impact metrics beyond those explicitly stated in the resume.
- Real-time inference, high availability, serving scale, cloud architecture, or deployment ownership.
- Published research, peer review, awards, or research novelty beyond the documented competition recognition.
- The GitHub README's leftover template comments and badge-oriented presentation.
- “GenAI-powered GenZ,” which is resume-supported wording but does not fit the intended professional tone.

## Project details to revisit for full case studies

- Problem framing, stakeholder context, individual contribution, collaborators, and project constraints.
- Data definitions, preprocessing, feature lists, leakage controls, and data-quality decisions.
- Baseline configuration, hyperparameters, validation design, uncertainty, and complete metric tables.
- Model interpretability outputs and how they were evaluated or used.
- Architecture diagrams, AWS services, automation details, monitoring evidence, and deployment lifecycle.
- Repositories, reproducible instructions, screenshots, charts, and permission to publish project artifacts.
- Limitations, failure modes, ethical considerations, and lessons learned.
