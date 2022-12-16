New Markdown file where we can add notes to the current development task. 

I have really bad memory and I need notes to remember what I was doing 2 weeks ago

# Actions

Actions are used to automate deployment process. Currently, we have 2 actions

## Deploy to Firebase Hosting on PR
This deploys to the preview channel of our Firebase hosting. This should be triggered during a pull request so that QA and Devs can have a live preview of the changes before merging it to master.

## Deploy to Live Channel on Merge
This deploys to the live channel of our Firebase hosting. This should be triggered during pull request merge to master.

# Current Issues
We have an issue where `environment.prod.ts` does not exist in our repo. This is by design as the prod variables should not be part of our public repository. So now we have to find out how to add our prod variables during prod build time.

In Netlify, this is done with using env.process to find the environment variables that are kept in the Netlify settings. I don't know if this is possible with github yet. If only we could use Netlify to deploy our hosting to Firebase.
