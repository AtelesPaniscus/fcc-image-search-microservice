# Image Search Abstraction Layer Microservice

This is project #4 of the freeCodeCamp Backend Development Certification Syllabus.

## Objective

Build a full stack JavaScript app that allows you to search for images like this: https://cryptic-ridge-9197.herokuapp.com/api/imagesearch/lolcats%20funny?offset=10 and browse recent search queries like this: https://cryptic-ridge-9197.herokuapp.com/api/latest/imagesearch/. Then deploy it to Glitch.

Note that for each project, you should create a new GitHub repository and a new Glitch project.
If you can't remember how to do this, revisit <https://freecodecamp.org/challenges/get-set-for-our-api-development-projects>.

## User Stories

Here are the specific user stories you should implement for this project:

  * I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
  * I can paginate through the responses by adding a ?offset=2 parameter to the URL.
  * I can get a list of the most recently submitted search strings.

## On Completion

Once you've finished implementing these user stories, click the "I've completed this challenge" button and enter the URLs for both your GitHub repository and your live app running on Glitch.

You can get feedback on your project by sharing it with your friends on Facebook.

## Licence

MIT Licence. [Click here for more information.](LICENCE.md)

## CAVEAT

This microservice was developed using a local Mongo database.
When it came to migrate to a database on `mlab`, the server application could not authenticate.

The most plausible explanation I found was than 'glitch' uses MongoDB 2.x.x and `mlab` MongoDB 3.x.x.
It seems `glitch` has a gotcha that prevented upgrade to MongoDB 3.x.x.

So this solution uses the local Mongo database.
The script named `fudge` is run to kill and start the local Mongo server, 
reload the database's primate collection and then start the server application.
