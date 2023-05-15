# Games

Welcome to our games repository! We're using this to practice our web development, create some public examples of work, and have some fun along the way! We're starting by targeting games that mirror basic web usage (point and click), but who knows maybe we'll wander into creating canvas based apps and/or reactionary games some day.

The goal is to host these simply and freely, so we're going with a static site on [GitHub pages](https://pages.github.com/). We still want _some_ "backend" practice so we're going to use [Next.js's `getStaticProps` method](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) when it makes sense.

We'll likely create multiple variations of what is essentially the same game, so we can both have a turn creating file structures, crafting metaphors, etc.

—piratematt & btarnow

**Navigation**

* [Games List](#games-list) – see the full list of WIP/completed games & future ideas
* [Frameworks, tools, technologies selected](#frameworks-tools-technologies-selected) – a quick overview of selections
* [Developing Locally](#developing-locally) – guide to getting the site up and running locally
* [Deploying to GitHub Pages](#deploying-to-githubpages) – guide to deploying games to GitHub pages
* [Contributing](#contributing) – guide to submitting your own
* [TODO:s](#todos) – repository wide TODO list, specific game TODO:s will be kept to their own markdown files

## Games List

### To Build/Building

* [ ] Guess the Word
  * [ ] [PirateWords](./PirateWords.md) – Can you guess the captain's favorite word before you walk the plank?
  * [ ] DogWords – Can you guess the recall word before the dog runs off? Don't ask me why your friend choose to use that word when training the dog. They're _your_ friend!

**Future Ideation**

* Word Search
* Math
  * Something with bytes, bits, or maybe hexadecimal
  * Make 24 or some other number

## Frameworks, tools, technologies selected

* [Next.js](https://nextjs.org/)
* [React](https://react.dev/)
* [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
* [GitHubPages]()

**Future Targets**

* [Typescript?]() – TBD

## Developing Locally

TODO

## Deploying to GitHubPages

TODO

## Contributing

TODO: create a Contributing.md guide.


## TODO:s

* [ ] Init/Hello World
  * [x] Create a bare bones unstyled home page and pirate words page
  * [x] Add a test for pirate words page to make sure my testing frameworks/tools are up and running properly
  * [ ] Then figure out what's next
* [ ] Choose license (and contributing guide or no)
* [ ] Decide to start in TypeScript or stay with Vanilla JavaScript for now
* [ ] Create first two games
* [ ] Create home page with game navigation

**Ideas**

* Use local storage to keep track of scores, etc.: support exporting and importing data.