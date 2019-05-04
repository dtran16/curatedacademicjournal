# Curated Acadmiec Journal
## Setup

1. Clone repository

    `git clone https://github.com/dtran16/curatedacademicjournal.git`

2. Navigate to the client directory and install packages

    `cd curatedacademicjournal/client`
    `npm install`

3. Open a local instance of ganache, and make sure the RPC is HTTP://127.0.0.1:9545

4. Navigate back to the project root and run the following commands

    `truffle develop`
    `test` *optional
    `migrate --reset'

5. Then in the client directory start the frontend 

    `npm run start`
    
6. After thr frontend loads, create a new custom RPC with HTTP://127.0.0.1:9545

7. Import one of your ganache wallets so you have ether, and you're done!
