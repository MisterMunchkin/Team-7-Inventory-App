New Markdown file where we can add notes to the current development task. 

I have really bad memory and I need notes to remember what I was doing 2 weeks ago

# Actions

Actions are used to automate deployment process. Currently, we have 2 actions

## Deploy to Firebase Hosting on PR
This deploys to the preview channel of our Firebase hosting. This should be triggered during a pull request so that QA and Devs can have a live preview of the changes before merging it to master.

## Deploy to Live Channel on Merge
This deploys to the live channel of our Firebase hosting. This should be triggered during pull request merge to master.

# Current Issues
Issue where new user subscription in app.component.ts is only triggered once.
When the subscribe in auth.service.ts is triggered and updates user, it does not get updated on the subscription in app.components.

Tried setting AuthService in providers for root but not working.
