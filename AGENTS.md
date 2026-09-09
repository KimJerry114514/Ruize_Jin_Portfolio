# Ruize Jin Personal Portfolio

## Project

This repository contains the personal professional portfolio website for Ruize Jin.

Technology stack:

- Hugo
- Adritian Hugo theme
- Git
- GitHub Pages
- Custom domain: https://ruizejin.com

The website is intended primarily for recruiting and professional networking.

## Professional Positioning

Primary positioning:

Data Scientist | AI Engineer

Supporting narrative:

Actuarial Science → Data Science & AI Engineering

Ruize's differentiating strength is the combination of:

1. Business and domain understanding
   - Insurance
   - Healthcare
   - Enterprise analytics

2. Data science and quantitative modeling
   - Statistics
   - Machine learning
   - Predictive modeling
   - Decision support

3. Applied AI and engineering
   - Python
   - SQL
   - PyTorch
   - PySpark
   - AWS
   - LLM/RAG
   - Data pipelines

The website should NOT position Ruize primarily as:
- a frontend developer
- a software engineer
- a traditional actuary
- an academic researcher

## Design Philosophy

The site should feel:

- professional
- clean
- business-oriented
- quantitative
- technically credible
- modern but restrained

Avoid:

- "tech bro" aesthetics
- excessive animations
- excessive skill logos
- terminal-style interfaces
- neon/cyberpunk design
- unnecessary JavaScript frameworks
- excessive badges
- academic-CV-first layout

Preserve the visual language of the Adritian theme unless explicitly asked otherwise.

## Homepage Information Hierarchy

Use this order:

1. Hero
2. Featured Projects
3. Professional Experience
4. About / Education
5. Selected Technical Capabilities
6. Contact

Projects and professional impact should receive more visual emphasis than a long list of technologies.

## Content Rules

`docs/portfolio-content.md` is the authoritative source for factual website content.

Never invent:

- project metrics
- technologies
- deployment details
- employer impact
- awards
- business impact
- model performance
- job titles
- dates

If information is missing, use a clearly marked placeholder or report the missing information.

Do not turn:
- a research paper into a claimed production system
- a course project into a claimed commercial product

Do not exaggerate wording such as:
- production-grade
- enterprise-scale
- state-of-the-art
- revolutionary
- industry-leading

unless explicitly supported by provided materials.

## Hugo Development Rules

Before changing files:

1. Inspect the existing implementation.
2. Identify which files control the requested section.
3. Prefer the smallest safe change.
4. Explain any architectural change that is not trivial.

Prefer:
- project-level content
- project-level assets
- Hugo layout overrides

Avoid editing theme source files directly when an override is possible.

Do not replace Hugo with React, Next.js, Vue, or another framework.

Do not introduce new dependencies without a clear reason.

## Quality Rules

After meaningful changes:

1. Run Hugo build.
2. Check for errors and warnings.
3. Verify internal links.
4. Verify images.
5. Preserve mobile responsiveness.
6. Report changed files.

For visual changes, keep the existing Adritian responsive system unless specifically instructed otherwise.

## Privacy

Do not expose personal information that is not explicitly intended for the website.

Do not display the resume phone number by default.

Primary public contact email:
ruize.jin@duke.edu

Professional links:

LinkedIn:
https://www.linkedin.com/in/ruize-jin-082205377/

GitHub:
https://github.com/KimJerry114514

Website:
https://ruizejin.com
