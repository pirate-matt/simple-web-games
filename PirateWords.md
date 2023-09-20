# PirateWords

_Can you guess the captain's favorite word before you walk the plank?_

## Ideation

* Variable length of plank based on size of word.
* Easy, Medium, Spicy modes.
* What about phrases?
* How about creating levels?
* Include some fun fact about word/phrase upon completion?
* How about categories of guesses?
* Bias word selection towards un-guessed words
* Is there a free API I can used to update the words every month, day, week, etc.?
  * What about using GitHub actions to automate this build?

## Rules

## TODO:s

### Rewrite with useReducer, useContext

* [x] get game functioning without player name
  * [x] remove playername & stats from testing flow
  * [x] Refactor to useReducer
    * [x] Reducer created and tested
    * [x] Implement reducer
    * [x] refactor PirateWordsGame to require word, and wrap with RandomPirateWordGame that handles no provided word
    * [x] refactored game over (win/loss) screens out of the game component
* [•] v0.1 Pass at styling & context
  * [x] Design favicon
    * ? Design game specific favicons?
  * [ ] General styling
  * [ ] Write first version of game description/introduction
  * [ ] Design plank walking
* [ ] add player name with useContext
  * [ ] Set playername on homepage (optional)
  * [ ] If playername not set on homepage, set before game start (skippable)
* [ ] add stats
* [ ] Theme CSS & add deploy/dev controls for btarnow and I to have slightly unique deploys
  * ? Add snapshot tests?

## Next Steps
