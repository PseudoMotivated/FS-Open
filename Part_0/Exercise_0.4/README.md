``` mermaid
    sequenceDiagram 
    participant S as Server
    participant B as Browser 

    B ->> S : GET /notes (html)
    S ->> B : 200 ok &  notes
    B ->> S : GET /main.js & GET /main.css 
    S ->> B : main.css
    create participant JS as JavaScript

    S ->> JS : 304 & main.js
    JS ->> B : Initiate GET /data.json
    B ->> S : GET /data.json
    S ->> B : 200 ok & data.json
    B ->> JS : data.json
    JS ->> B : Rendered notes
    create actor user
    B ->> user : Rendered website!
    Note right of user: nice
    user ->> B : New Note
    B ->> S : POST New Note
    Note left of S: Puts new note in /data.json
    Note right of S : Then proceed to reload all of the above.

```