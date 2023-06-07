# PirateWords

_Can you guess the captain's favorite word before you walk the plank?_

## Ideation

* Variable length of plank based on size of word.
* Easy, Medium, Spicy modes.
* What about phrases?
* How about creating levels?
* Include some fun fact about word/phrase upon completion?
* How about categories of guesses?
* Is there a free API I can used to update the words every month, day, week, etc.?
  * What about using GitHub actions to automate this build?

## Rules

## TODO:s

* [x] v0.0 can play with hard coded word and win or lose
* [ ] v0.1 can play with randomized word and win or lose
* [ ] v0.2 can enter player name and view local scores by name
* [ ] v0.3 add pirate themed "story telling" elements to UX
* [ ] v0.4 add difficulty into game (categories?, word selection, guesses left, etc.)
* [ ] v1.0 ???
* Future Ideas
  * Handle compound words
  * bias random word selection looking at completed and missed words
  * find word api to randomize words every deploy

* [x] enter player name
  * [x] user can press enter to set player name
  * [ ] user retains player name when playing another game
* [ ] progress section
  * [x] exists
  * [ ] uses graphics in addition to numbers
* [x] user can guess all letters
* [x] user can guess correct letter
* [x] user can guess incorrect letter
* [x] hardcode starting word
  * [ ] Randomize word from a hard coded list
* [x] win check
* [x] lose check
* [ ] player stats
  * [x] set stats for a game+player
  * [x] retrieve stats for a game+player
  * [x] update stats for a game+player
  * [x] reset/clear stats for a game+player
  * [x] reset/clear stats for a player
  * [x] calculate stats for PirateWords
    * [x] Win percentage
    * [ ] graph for wins at each num guesses left
    * [ ] graph for correct & incorrect guesses by letter
      * [x] POC
      * [ ] refactor POC to read left to right with screen reader
  * [ ] export local player stats
  * [ ] import local player stats
* [ ] improve style
* [ ] handle localStorage being full

## Next Steps