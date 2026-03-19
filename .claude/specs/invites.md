# Peapod Pod Invites

## Implementation Process

Read each of the option below and implement them one at a time, stopping to commit each step with a simple commit message and no commit description

## Options

1. Users can inviate another user via shareable link. The link should send a user to a /invite route/page that make the necessary backend API call to add the user to the pod in the invitation, then redirect the user to the pod page (/pod/{podId})

1. Users can invite another user via phone number. This should make a backend API call to send a text message via the Twilio SDK

3. Users can invite another user via email. This should make a backend API call to send an email via the SendGrid SDK
 
