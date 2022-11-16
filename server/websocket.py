import asyncio
import websockets
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

smtpServer = "smtp.web.de"
smtpPort   = 587

password = "TP4TcFnCBZ6yqzg"

sender   = "lf10-ae.smart.home@web.de"
reciever = "education.man.school@gmail.com"

async def handler(websocket):
    async for message in websocket:

        data = message.split(";")

        email            = MIMEMultipart()
        email['Subject'] = data[0]
        email['From']    = sender
        email['To']      = reciever

        part = MIMEText(data[1], 'plain')
        email.attach(part)

        smtpObj = smtplib.SMTP(smtpServer, smtpPort)
        smtpObj.set_debuglevel(1)
        smtpObj.starttls()
        smtpObj.login(sender, password)
        smtpObj.sendmail(sender, reciever, email.as_string())
        smtpObj.quit()

        print("mail raus")

async def main():
    async with websockets.serve(handler, "localhost", 1337):
        await asyncio.Future()

asyncio.run(main())
