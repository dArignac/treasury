# Treasury

Hi, treasury is my little project for managing my physical movie collection. I started it back in 2017, back in the days when I was actively buying movies and series as DVDs/BluRays. Nowadays I don't do this any more, but it is still fun to play around with the application.

The app initially was implemented using Angular, as Angular was a daily topic at my work. However, things changed, I changed my job and now we use React at work. So I reimplemented it in React.

I probably will extend the functionality of the current state, but there is no guarantee.
I'd like to add series and also to be able to rate TMDB items from here.

You basically can set this up for yourself, you only need a [Firebase](https://firebase.google.com/) account and a [The Movie Database](https://www.themoviedb.org/) account. See the chapter "Setting up the project".

## Setting up the project

- Clone the project
- React App
  - go to the `treasury` folder
    - copy the `.env` file to `.env.local` and fill the values
      - Firebase settings can be found in the Firebase project settings (you need to create a project beforehand of course)
      - TMDB API key can be found here: https://www.themoviedb.org/settings/api
      - do the same for the production file `.env.production.local`
    - install dependencies with `npm i`
- Firebase functions
  - go to `functions` folder
  - install dependencies with `npm i`
- Firebase setup
  - install Firebase tooling globally `npm i --global firebase-tools`
  - log into Firebase `firebase login`
  - run `firebase --use add` to select the Firebase project

## Deploy to Firebase

- go to `treasury` folder & build the app `npm run build`
- from root run `firebase deploy`

## Development insights

- [Prettier setup](https://medium.com/technical-credit/using-prettier-with-vs-code-and-create-react-app-67c2449b9d08)
