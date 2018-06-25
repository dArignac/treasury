# Privacy Policy
This document covers which of your private data is stored with this project, why and where.
It also outlines which external services we use that might use your private data.

Date of last update: **2018-06-25**

## General information
* this project relies on [Google Firebase](https://firebase.google.com/) and uses the following Firebase services:
    * Cloud Firestore for Firebase
    * Cloud Functions for Firebase
    * Firebase Authentication
    * Firebase Hosting
* for further information refer to the privacy and security documentation of Google Firebase: https://firebase.google.com/support/privacy/

## Which data do we use and why
* we only store your user data after you logged in for the first time
* we store your user id coming from *Firebase Authentication* in *Cloud Firestore for Firebase* for the following purposes
    * identification of a user
    * storing personalized user settings, see *User settings*
    * storing counters, see *User counters*
* the user id is a string that identifies yourself at the chosen authentication provider
* a authentication provider can be one or more of the available providers in *Firebase Authentication]* and depend on the instanceof **treasury** you are using (as **treasury** is a self hosted project and not generally available)
* the default authentication provider is Google Sign-In
    
### User settings
* we store the following settings of you
    * region, for the displayed language of movie/series titles and every movie/series relevant data we gather from [The Movie DB](https://themoviedb.org)
    * catalog visibility, if your catalog of movies/series shall be shown to everyone or only you
    * nickname, a nickname assigned by yourself for the URL and identification of your public catalog

### User counters
* we store the number of movies you add to **treasury**

### Movies
* we store all movies that you add to **treasury** and assign them to your user id
* we do not share your movie count and details with other users, each user has his own separated movie collection

## Used external services
### Google Fonts
We use fonts ("Google Fonts") provided by Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
Data privacy statement: https://www.google.com/policies/privacy/
Opt-Out: https://adssettings.google.com/authenticated

## Opt out
To opt-out from **treasury** ask the person who is hosting **treasury** for you to remove all of your data from the Cloud Firestore.
Additionally remove the cache from your browser for the domain **treasury** is running on.
