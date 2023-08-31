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
* [x] v0.1 can play with randomized word and win or lose
* [x] v0.2 can enter player name and view local scores by name
* [ ] v0.3 add pirate themed "story telling" elements to UX
* [ ] v0.4 add difficulty into game (categories?, word selection, guesses left, etc.)
* [ ] v1.0 ???
* Future Ideas
  * Handle compound words
  * bias random word selection looking at completed and missed words
  * find word api to randomize words every deploy

### Rewrite w/ player name context

* [ ] Set playername on homepage (optional)
* [ ] If playername not set on homepage, set before game start (skippable)
* [ ] 

### OLD TODO:s

* [x] enter player name
  * [x] user can press enter to set player name
  * [ ] user retains player name when playing another game (elevate with context)
* [ ] progress section
  * [x] exists
  * [ ] uses graphics in addition to numbers
* [x] user can guess all letters
* [x] user can guess correct letter
* [x] user can guess incorrect letter
* [x] hardcode starting word
  * [x] Randomize word from a hard coded list
    * [ ] randomize hard coded list(s) every build
* [x] win check
* [x] lose check
* [x] player stats
  * [ ] export local player stats
  * [ ] import local player stats
* [ ] polish CountForValuesChart design
  * [ ] better rendering of count & percentage labels
  * [ ] control count & percentage render w/ props
* [ ] improve style
* [ ] handle localStorage being full

## Next Steps