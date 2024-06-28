``` mermaid
    flowchart LR
        subgraph PublicInternet
            User
        end
        subgraph LoadBalancingZone
            Loadbalancer
        end
        subgraph WebserverZone
            Webserver
            Webserver_2
        end
        User --> Loadbalancer
        Loadbalancer --> Webserver
        Loadbalancer --> Webserver_2

        Webserver --> DB_1
        Webserver -.-> DB_2
        Webserver_2 --> DB_1
        Webserver_2 -.-> DB_2
```