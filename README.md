# thermonitor
A monitoring system to graphically show some temperature changes in a period of time.

Data of temperature are saved on MySQL database. A simple REST API is created in PHP. A web app connects to the API and retrieve 
the data with HTTP request GET with JavaScript, and display it on the front end of a website using D3 library.
