# FutJoin
FutJoin is my end-of-degree project for The University of Malaga and introduces a web application which allows to schedule your own amateur football games, booking from a variety of football pitches across sporting centers in Malaga

The development of the app is characterised by the homogeneity of  JavaScript, given expression in the MEAN stack, which is formed by technologies  Mongo DB, Angular, Node.js and Express.

## Description

<a href="https://ibb.co/WzHg0p7"><img src="https://i.ibb.co/n1wzB84/Captura-de-pantalla-2021-04-20-a-las-9-37-20.png" alt="Captura-de-pantalla-2021-04-20-a-las-9-37-20" border="0"></a>

This project implements an HTTP FLASK API that aims to simulate the Bob character in the NuCypher network (using Lynx Testnet) eliminating data persistence and trying to simulate as good as possible a fictitious client-side implementation of NuCypher (JavaScript).

## API Routes
To increase security, the API only works with POST requests.

### Create Keys
The "CreateKeys" route generates a new NuCypher keyring via received "address" and "password" parameters. Then, it deletes the generated files to avoid data persistence (centralized data) and returns a json response with the generated keys:

```Python
class CreateKeys(Resource):
    def get(self):
        return 'Please, do POST request.'
    def post(self):
        password = request.json['password']
        address  = request.json['address']  
        ...
        json = self.readAndDeleteKeys(address,keyring)
        return json
```

### Join Policy
The "Join Policy" route allows bob to join a NuCypher Policy. Receiving the necessary parameters (including the previously generated keys), it creates a "Bob" object and joins it to the policy created with the received parameters (`label`, `alice_pubkey`). Then, it deletes the files generated with the keys to recreate Bob to avoid data persistence (centralized data) and returns a json response with a status code of 200.

```Python
class JoinPolicy(Resource):
    def get(self):
        return 'Please, do POST request.'   
    def post(self):
        keys = request.json['keys']
        password = request.json['password']
        address  = request.json['address']
        alice_pubkey = request.json['alice_pubkey']
        label = request.json['label']
        path = self.writeKeys(keys)
        ...
        bob = Bob(known_nodes=[self.URSULA], checksum_address=address,domain='lynx',keyring=keyring,provider_uri=provider_uri)  
        bob.join_policy(label.encode(), alice_verifying_key=alice_pubkey_umbral,block=True)
        self.readAndDeleteKeys(address,keyring) # delete keys
```
### Retrieve
The "Retrieve" operation allows bob to decrypt Alice's data through the NuCypher network (using the generated keys). The operation needs a large number of parameters to perform the operation. Then, it deletes the generated files to avoid data persistence (centralized data) and returns a json response with the clear data.

```Python
class Retrieve(Resource):
    def get(self):
        return 'Please, do POST request.'   
    def post(self):
        keys = request.json['keys']
        password = request.json['password']
        address = request.json['address']
        
        enrico_key = request.json['enrico_key']
        policy_key  = request.json['policy_key']
      
        label = request.json['label']
        alice_pubkey = request.json['alice_pubkey']
        
        ciphertext = request.json['ciphertext']  
        
        ...
        
        retrieved_plaintexts = bob.retrieve(
            message_kit,
            label=label.encode(),
            enrico=data_source,
            alice_verifying_key=alice_pubkey_umbral
        )
        
        print("Retrieved.") 
        result = retrieved_plaintexts[0].decode("utf-8")
        self.readAndDeleteKeys(address,keyring) #delete keys
        return result   
```

## Documentation
NuCypher project documentation available at: https://docs.nucypher.com/en/latest/

## Setup
First, replace `<YOUR PROVIDER URI>` with a valid node web3 node provider string, for example:
  - `ipc:///home/<username>/.ethereum/geth.ipc` - IPC Socket-based JSON-RPC server
  - `https://<host>` - HTTP(S)-based JSON-RPC server
  - `wss://<host>:8080` - Websocket(Secure)-based JSON-RPC server 

```Python
provider_uri = <YOUR PROVIDER URI>
```

Then, install the project dependencies.
```
$ pip install -r requirements.txt
```

Finally, run the script in localhost executing the next command:
```
$ python occupancyapi.py
```

# Enrico as Service
NuCypher Enrico character implementation as external HTTP Service.

## API Routes
To increase security, the API only works with POST requests.

### Encrypt Message
The "Encrypt Message" function creates a new Enrico object from a policy key and encrypting the received clear data. Then, it returns the the public key of the created Enrico object and the ciphertext.

```Python
class EncryptMessage(Resource):
    def get(self):
        return 'Please, do POST request.'
    def post(self):
        policy_key = request.json['policy_pubkey']
        data = request.json['data']
        enrico = Enrico(policy_encrypting_key=UmbralPublicKey.from_bytes(bytes.fromhex(policy_key)))
        message_kit, _signature = enrico.encrypt_message(data.encode())
        result = {}
        result["ciphertext"] = message_kit.to_bytes().hex()
        result["enrico"] = bytes(enrico.stamp).hex()
        return json.dumps(result)
```



# Recomendation
I reccomend follow <a href="https://www.digitalocean.com/community/tutorials/how-to-serve-flask-applications-with-uswgi-and-nginx-on-ubuntu-18-04">this</a> Digital Ocean tutorial to be able to publish it and use the HTTPS protocol. It has been tested and the result has been extremely satisfactory.
