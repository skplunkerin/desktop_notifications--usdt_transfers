# Desktop Notifications - USDT Transfers

Live Desktop Notifications for USDT transfers. This project is from a Moralis
Web3 tutorial [found here](https://youtu.be/QtstmvVeI18).

## Setup project:

1. Clone project

2. Run the project:

   ```sh
   npm i
   npm start
   ```

3. Run `ngrok`: _(so external service can reach your local project)_

   ```sh
   ngrok http 3000
   ```

   > You should see something like the following; the `Forwarding` url you will
   > want to use is the `https://` version:
   >
   > ```log
   > ngrok by @inconshreveable
   >
   > Session Status                online
   > Account                       Hamster Phomstentein (Plan: Cheesy)
   > [...]
   > Web Interface                 http://127.0.0.1:4040
   > Forwarding                    http://78be-136-175-97-43.ngrok.io -> localhost:3000
   > Forwarding                    https://78be-136-175-97-43.ngrok.io -> localhost:3000
   > ```

4. Test your project is running:

   You can curl _(see below)_ or use a service like Postman to confirm the
   endpoints are functioning. I recommend doing this before you set up an
   external service (like Moralis) to point to your project.

   - **Localhost test:**

     ```sh
     curl --location --request POST 'localhost:3000/webhook' \
     --header 'Content-Type: application/json' \
     --data-raw '{
         "time": "hamster time"
     }'
     ```

   - **Ngrok test:**

     Get your `https` forwarding url from your `ngrok` session, and replace
     `{ngrok_url}` below:

     ```sh
     curl --location --request POST '{ngrok_url}/webhook' \
     --header 'Content-Type: application/json' \
     --data-raw '{
         "time": "hamster time"
     }'
     ```

5. Setup Moralis:

   1. Go to your [Moralis Dashboard](https://admin.moralis.io/)

      _You can create a Moralis account here: https://admin.moralis.io/register_

   2. Go to [Streams](https://admin.moralis.io/streams):

      - Navigate to `"New Stream"` -> `"Create From Scratch"`

   3. Fill in the following **Stream Details**:

      ```yml
      # This will be the USDT transfers (that are over $50,000);
      ## To find this manually:
      ##   - Go to Etherscan (https://etherscan.io)
      ##   - type "usdt" in search input
      ##   - click on the result "Tether USD (USDT)"
      ##   - copy the `Profile Summary` -> `Contract` address
      ##     (0xdAC17F958D2ee523a2206206994597C13D831ec7)
      Address: "0xdAC17F958D2ee523a2206206994597C13D831ec7"

      Listen to all addresses: false

      Description: "USDT Transfers Over 50K"

      # This is the `https` Ngrok url you got from previous steps.
      ## IMPORTANT: Don't forget to append the `/webhook` to the end!
      Webhook URL: "https://{your-ngrok-subdomain}.ngrok.io/webhook"

      Select Networks:
        - "Ethereum Mainnet"

      Address Activity:
        - "Contract interactions (logs)"

      Event Emittance: true

      # (Application Binary Interface)
      # You will need this in order to select options under the next step for
      # "Select Topic0"
      ## Find this on the USDT Etherscan page:
      ##  - Scroll down and select the `Contract` tab
      ##  - Scroll down to the `Contract ABI` section
      ##  - Click the "Copy ABI to clipboard" icon
      ABI: [excluded for brevity]
      Select Topic0:
        - "Transfer(address,address,uint256)"

      # This is where you can filter the results before they hit your project.
      ## For additional filters: https://github.com/MoralisWeb3/streams-beta#filter-streams
      ##
      ## NOTE: REMOVE the trailing comma's or Moralis will error (my code
      ## formatter keeps adding them back in).
      Advanced Options (optional):
        [
          {
            "topic0": "Transfer(address,address,uint256)",
            "filter": { "gt": ["value", 50000000000] },
          },
        ]
      ```

   4. When done:

      - Create Stream:

        Click `Create Stream` to finish creating the stream

        - you should see items streaming in when activity happens

      - Pause Stream:

        When done testing, `Pause Stream` by hovering over the 3 dots (...) icon

      - Activate Stream:

        To start stream, `Activate Stream` by hovering over the 3 dots (...)
        icon

6. Watch the notifications come in
