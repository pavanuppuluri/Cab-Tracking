# Cab Tracking

This repo is a simulation of real world cab tracking usecase.

Idea here is to get the cab coordinates (latutude, longitude) of a given cab 
and map the Car object on Google Map at those coordinates.

The approach I followed here is -

Say user want to track the assigned cab -
Now cab will be sending its coordinates to a Kafka Topic (partition key could be Cab Number).
Now from front end - we do make a call to backend API by sending the Cab Number as input (Say for every 5 seconds).
Backend API now returns the last coordinates of the given Cab Number.
Now in UI we display the Car object (svg image) at those coordinates.

This way user can track the current position of the given cab number.

