import asyncio
from websockets import serve

connected = set()

async def handler(websocket):
    connected.add(websocket)
    print("Connected!")
    try:
        async for message in websocket:
            print(message)
            for conn in connected:
                    await conn.send(message)  
    except:
        print("Disconnected")

async def main():
    async with serve(handler, "192.168.0.103", 1337):
        await asyncio.Future()

asyncio.run(main())