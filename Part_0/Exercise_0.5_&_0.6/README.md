``` mermaid
    sequenceDiagram 
    participant S as Server
    participant B as Browser 

    B ->> S : GET /spa (html)
    S ->> B : 200 ok &  spa
    B ->> S : GET /spa.js & GET /main.css 
    S ->> B : main.css
    create participant JS as JavaScript

    S ->> JS : 304 & spa.js
    JS ->> B : Initiate GET /data.json
    B ->> S : GET /data.json
    S ->> B : 200 ok & data.json
    B ->> JS : data.json
    JS ->> B : Rendered notes
    create actor user
    B ->> user : Rendered website
    user ->> B : New Note
    B ->> JS : New note
    Note right of JS : Adds note to its 
    Note right of JS : copy of data.json 
    JS ->> B : POST New note
    B ->> S : POST New note
    Note left of S : Adds note to /data.json

    JS ->> B : Rendered Notes
    B ->> user : Rendered Website
    Note right of user: nice

```