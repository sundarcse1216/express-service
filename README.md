# Intellect
Intellect APIs

# API Specification

* Delete All trades
  <ul>
  <li>API: trades/erase</li>
  <li>Method: DELETE</li>
  <li>Request Header: N/A</li>
  <li>Request Body: N/A</li>
  <li>Response: {"code": 200, "status":"Success", "message": "Trades deleted successfully."}</li>
  </ul>
    
* Save trades
  <ul>
  <li>API: trades</li>
  <li>Method: POST</li>
  <li>Request Header: N/A</li>
  <li>Request Body: { "type":"buy", "user":{"id":"1", "name":"sundar"}, "symbol":"^", "shares":"10", "price":"130.42" }</li>
  <li>Response: {"code": 201, "status":"Success", "message": "Trade inserted successfully."}</li>
  </ul>
  
* Get All trades
  <ul>
  <li>API: trades</li>
  <li>Method: GET</li>
  <li>Request Header: N/A</li>
  <li>Request Body: N/A</li>
  <li>Response: {"code": 201, "status":"Success", "message": ARRAY_OF_JSON}</li>
  </ul>

* Get trades By UserID
  <ul>
  <li>API: trades/users/:userID</li>
  <li>Method: GET</li>
  <li>Request Header: N/A</li>
  <li>Request Body: N/A</li>
  <li>Response: {"code": 201, "status":"Success", "message": ARRAY_OF_JSON}</li>
  </ul>
  
* Get trades By Timeframe
  <ul>
  <li>API: trades/stockd/:stocksSymbol/trades?type={type}&start={startDate}&end={endDate}</li>
  <li>Method: GET</li>
  <li>Request Header: N/A</li>
  <li>Request Body: N/A</li>
  <li>Response: {"code": 201, "status":"Success", "message": ARRAY_OF_JSON}</li>
  </ul>
  
* Get trades Price By Timeframe
  <ul>
  <li>API: trades/stockd/:stocksSymbol/price?type={type}&start={startDate}&end={endDate}</li>
  <li>Method: GET</li>
  <li>Request Header: N/A</li>
  <li>Request Body: N/A</li>
  <li>Response: {"code": 201, "status":"Success", "message": ARRAY_OF_JSON}</li>
  </ul>
  
# Instruction to Install and build
  * Goto project directory and run <b>npm install</b> to install all the dependencies.
  * Run <b>npm start</b> to start the server By default it will listern <b>localhost:3000</b>
  
# Start Database
  * Goto MongoDB directory and run <b>./bin/mongod</b> to start mongoDB.
  
# Run test
  * Goto project directory and run <b>npm testM/b> to run testcases.
  
# Author 
  * Sundararajan S
