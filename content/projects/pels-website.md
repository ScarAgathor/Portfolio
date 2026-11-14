---
title: "IEEE PELS at UTSA Website"
summary: "Public website for the IEEE PELS student chapter at UTSA."
date: "Mar 2025 - Aug 2026"
sortDate: "2025-03-15"
category: "Student Org"
status: "Complete"
tags: ["HTML", "SCSS", "JavaScript", "Static Website", "Supabase", "Cloudinary"]
cover: "/images/projects/pels-website/cover.png"
featured: true
links:
  - label: "Website"
    href: "https://pels-website.netlify.app"
  - label: "GitHub"
    href: "https://github.com/ScarAgathor/PELS-Website"
---

## Problem

The PELS SBC at UT San Antonio is a relatively new UTSA student org and a very new IEEE SBC.
By March of 2025, I was serving as the Secretary for PELS and I realized that the other IEEE chapters (IEEE, PES, RAS, HKN) at UTSA had their own websites.
I decided to take on the challenge of building a website for us.

## Tech

The website is built primarily in HTML, SCSS, and JavaScript:

- **HTML** The main content on the site is written in this, as well as reused modules such as the program modals. This helps avoid recreating the modal on every click.
- **SCSS** At this point, I had been using SCSS as opposed to regular CSS for a couple months. 
  I decided to continue building the site in it as it helped me feel likie I was still writing programmatically.
- **JavaScript** This is used to control all the recreated modules on the site as well as connecting to the custonm set of API calls I created to support this site. 
- **Supabase** To support this site, I created custom API calls that live in a supabase project. thos calls are editted in the custom private Admin site I made to accompany this public facing
  site.
- **Cloudinary** All the images are hosted in Cloudinary.

## Photos

![Officer Page](/images/projects/pels-website/officers-page.png)
*View of WOrkshops and Events Page.*

![Programs Page](/images/projects/pels-website/programs-page.png)
*View of Officers Page.*

## Status 

The website is still actively being maintained and worked on by me. ALthough I have shared its public URL on all public facing PELS profiles for the SBC.

## Updates
- Cleaned up and reworked the pr0grams page of the site to now sort our events and workshops by date and to collapse the cards on the page after a certain number.
- Added option to program modals to register for event
- Added a newsletter page
- Updated Join us page