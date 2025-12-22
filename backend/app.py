import os
from dotenv import load_dotenv
import mysql.connector
from datetime import datetime
from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse

load_dotenv()

DB_HOST = os.getenv('DB_HOST')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_NAME = os.getenv('DB_NAME')

def conectar_db():
    return mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )

class Handler(BaseHTTPRequestHandler):

    def do_POST(self):
        if self.path == "/enviar":
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = urllib.parse.parse_qs(post_data.decode('utf-8'))

            nombre = data.get("nombre", [""])[0]
            email = data.get("email", [""])[0]
            mood = data.get("mood", [""])[0]
            mensaje = data.get("mensaje", [""])[0]

            try:
                conn = conectar_db()
                cursor = conn.cursor()
                cursor.execute(
                    "INSERT INTO mensajes (nombre,email,mood,mensaje,fecha) VALUES (%s,%s,%s,%s,%s)",
                    (nombre, email, mood, mensaje, datetime.now())
                )
                conn.commit()
                cursor.close()
                conn.close()

                self.send_response(200)
                self.send_header('Content-type','text/html')
                self.end_headers()
                self.wfile.write(b"Mensaje recibido, gracias por conectarte")
            except Exception as e:
                print("Error:", e)
                self.send_response(500)
                self.send_header('Content-type','text/html')
                self.end_headers()
                self.wfile.write(b"Ocurrio un error al enviar el mensaje.")

def run():
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, Handler)
    print("Servidor iniciado en http://localhost:8000")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
