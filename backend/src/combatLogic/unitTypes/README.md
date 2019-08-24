To add a new type of unit follow these steps:

1) import unitType.js default export UNIT_TYPE class
2) create a class for your new unit type and have UNIT_TYPE be the parent class
3) The constructor should take 1 argument, the level being requested
4) in the constructor create a temporary object and store in it the hp damage, and range for each level (1-3)
    a) follow the formatting on the example class in warrior.js of hp1, hp2, hp3 and dmg1, dmg2, dmg3
    b) add the attack range of the unit as range
5) don't forget to call the parent's constructor using super passing in the level as the first argument 
    and the temporary object as the second