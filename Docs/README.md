# Maths Game (Unamed game yet.. sort of)
## The Docs

### Main objectives

* Practice mental aritmethics and problem resolution.
* Show maths are used in everything of our simple or complex life.

### More

* The basic of this game is to answer maths problems as quick it's humanly possible
* Possibility to memorize and answer quickly over 1000 mental arithmetic *questions*
* Problem resolutions are also on the plan..

### Second objective

The second objective of this game is to educate on a more personal interest.

I would like to develop this game in 3 parts :
* An egine providing the necessary data for a round 
* A very basic way to play
* Skins of different interests : cooking, electricity, management, fireman, history, etc.. that will allow players to go deeper in the knowledge by doing tests.

>Example : a skin on space exploration could use tests to launch the rocket, to reach orbit, fix critical situations, ..


This is the first game I'm creating.  I want eventually my game to become an app and, for now, I can't develop an app (Rick would be pleased to leave me alone with Glootie..) I'm working on upgrading my 6 GiGs of RAM to 16 so being able to run the development tools.  Meanwhile, I'm working on the generators and a basic web interface (no skin) to make the game works.

### Philosopy

You can't really lose at this game.  Other then quit and reset your game, it's always possible to continue further by succeeding to a test.

### Rules

*These are based on the basic game rules.  Skin will be able to set some features and options to establish their own rules*

* Each round is presented like a tests, maximum 6 questions for beginners, 12 questions for intermediates and 15 for advanced and expert level.
* To complete a round, the player must solve 5, 10 or 12 (depending on the difficulty level) operations correctly.
* A time limit can be assigned.
* In the case of no time limit assigned, 
  * Beginners : player has 3 seconds to select the answer.
  * Intermediates : player has 3 seconds to answer, time is cumulative until the end of the round
  * Advanced/Experts : player has 2.5 seconds to answer, time is cumulative until the end of the round.  

For intermediate advanced and expert, in case of a wrong answer the time left WON'T be cumulated.

### Features
* Build player/game stats
* Send results/stats to 
  * A registered mentor/teacher
  * A personal email
* Share scores on social networks
* Groups in which admins can create special tests for specific players

***

# Now..

* Collecting datas/ideas
* Designing program
* Creating a TypeScript object as prototype for the maths engine.
* Thinking of using a REST API for the engine
* The database engine is to be determinated.. but Firebase looks the one.  The database will be used to store players stats and 

***

# Join the team

Wanna join? Just ask and create a branch!!  No HQ for now, but a lot of tools to communicate.

***

# Development details

* Developing under Linux Ubuntu 16.04 LTS.

# Definitions

**Errorlevel** : numeric exit code that represent a result; state (success/failed) a warning, an error, ..

**Math table** : series of maths operations from 0 to 12. Ex. ; 0 + 0 = 0, 0 + 1 = 1 .. 0 + 12 = 12

**Reversed question** : Type of question in which the answer is given to the player and the answer is the operation. Example : Question is 10; player has to chose between a) 5 + 6, b) 11 - 2, c) 5 + 5.

***
*Version 1.2.0 -*
*July 7th 2020 -*
*Zak Soyer*
***
*Version 1.1.0 -*
*July 5th 2020 -*
*Zak Soyer*
***
*Version 1.0.0 -*
*4th of July 2020 -*
*Zak Soyer*
***