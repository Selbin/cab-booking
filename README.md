# cab-booking

## Setup

1. Clone the repository
2. Cd to server directory of the project
3. Run **npm install**  
        This will install the packages needed for the project to run.
4. Run **npm start**  
   This will start the server
5. cd to client directory
6. Repeat steps 3 and 4
   This will run the frontend

*Note*: Front-end will show location of cabs that are available and for map I used google map api in developer mode.  
## Work flow

### Book a cab
  To book a cab call  http://localhost:8000/fuber/book/:lat/:lon/:userId/:color  
  1. lat and lon are latitude and longitude of user  
  2. userId is the unique id of user
  3. color is an optional param which can be given pink to book pink colored car or else it should be given noprefs  
      #### Example
         call http://localhost:8000/fuber/book/10.505284/76.240293/1/noprefs  

         Response:  

           {
            "success": true,
            "data": {
                "cabInfo": {
                    "cab_id": 4,
                    "lat": "10.507012",
                    "lon": "76.240067",
                    "color": "pink",
                    "car_no": "323",
                    "available": true
                },
                "distance": 0.19378120787734163,
                "tripId": 2
            },
            "message": "Booking successful"
           }  
          
          This wil book the nearest cab to the location you have given.  

### Ending a trip
   To end a trip call  http://localhost:8000/fuber/endTrip/:tripId/:endLat/:endLon
  1. tripId is the trip id that you get from the response of booking
  2. endLat and endLong is the destination latitude and longitude  

      #### Example
         call http://localhost:8000/fuber/endTrip/2/10.500750/76.239696  

         Response:  
            
            {
              "success": true,
              "data": {
                  "trip_id": 2,
                  "cab_id": 4,
                  "user_id": 1,
                  "lat": "10.505284",
                  "lon": "76.240293",
                  "start_time": "2020-09-08T13:59:33.201Z",
                  "end_time": "2020-09-08T14:56:43.833Z",
                  "end_lat": "10.500750",
                  "end_lon": "76.239696",
                  "cost": "7"
              },
              "message": "Trip completed"
            }  
          
          This wil end the trip providing you with the trip details


  