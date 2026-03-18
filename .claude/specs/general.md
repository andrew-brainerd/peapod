# Peapod App General Functionality

## General Rules

1. Follow the latest React best-practices (feel free to web search as needed to make decisions around this)
2. Refactor/restructure the app when needed for increased clarity and/or separation of concerns
3. Constants should all live in the /constants directory, types in /types, and utility functions in /utilities. Always search for existing files before creating new ones for these items.

## Product Flow

1. User navigates to peapod.app (or whatever the hosted domain will be)
2. If logged in (via Spotify), the user is taken to the /pods route to view all their available pods. If not logged in, the user will click the "Login with Spotify" button and then be redirected to /pods after successul login
3. If the user doesn't have any pods or wishes to create a new one, they will click the "Create a pod" button. This button should trigger a backend API call (to peapod-server host) to create a pod. If the call fails, show an error toast message (create this component as needed) and do not redirect the user. If the call succeeds, get the podId from the response (look in peapod-server for data shape), and redirect the user to /pods/{podId}. This route should act as a landing page for the pod with buttons to invite users, and a display of the currently playing song/playlist. Some of these components might exist, or we might need to create them. Search the codebase for matching components before creating new ones.
