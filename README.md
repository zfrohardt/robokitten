RoboKitten - we prob need a better name eventually

TODO: (in no particular order)

General:

[] come up with a KITTIES or KITTENS acronym
[] add Captain functionality
[] finish all abilities
[] add a way to add more robots/kittens/abilities without having to do loads of recoding
[] balance game
[] add user functionality and keep track of:
    - KITTIEs defeated
    - total damage dealt
    - robots/kittens unlocked (this leads to next TODO)
    - victories by user?
[] Robots/kittens are not displayed until user "unlocks" them
[] come up with a better name?
[] organize the code and add comments
[] add indicator for chosen attack

Component Specific:

App:
    [] line 32 - do we need abilities in state?
    [] kitten ability map does not use abilitySort function, but robot does

Stats:
    [] needs more styling
    [] maybe an accordian for event log?

Troops: 
    [] lines 42-43 - looks like the variable names are mismatched - the error is consistant so no resulting errors
    [] add captains to troops?

Robot/KittensDisplayCard:
    [] should we use icons instead of Damage/Health/Defense?
    [] Kitten card says 'model number'
    [] Do we need separate components for robotDisplayCard & KittenDisplayCard or should we name it something more general?
        only current differences: img scr, name passed as prop

Game:
    [] lines 40-50 & lines 74-75 - is there a better way?

GameSetup:
    [] in add RobotToState - do we need to pass in chosenRobots and setChosenRobots as params?

Captain:
    [] always says 'Model Number' for robot or kittie

KillKittens:
    [] can we do without forceUpdate?

RobotBattleCard:
    [] line 32 has true hardcoded
    [] line 52-54 we never use this
    [] prop name says 'Robot # ${modelNumber}' for robots or kitties
