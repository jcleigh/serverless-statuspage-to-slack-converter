# Serverless Statuspage to Slack webhook converter

This repository will allow you to use serverless [Netlify Functions](https://www.netlify.com/products/functions/)
to convert [Statuspage](https://www.statuspage.io/) alerts to [Slack Incoming Webhooks](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks) posts. 

Note: This project has no dependencies. Running `npm install` or `yarn install` is not required.

### How to use:
1. Fork this repository.
1. Create a Netlify account if you do not already have one.
1. Create a new Netlify site.
1. Link your Netlify account to your repo.
1. Subscribe to a Statuspage webhook using the following URL:
```
https://<your-site-name>.netlify.com/.netlify/functions/convert?target=
```
where `<your-site-name>` is replaced by your Netlify site name 
and the value of `target` is the unique end to the Slack incoming webhook URL 
(everything after `https://hooks.slack.com/services/`)

### Credits:
[Original conversion code](https://github.com/NReilingh/statuspage-slack) by NReilingh
