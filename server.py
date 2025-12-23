from wsgiref.simple_server import make_server
import os
import urllib.parse
import mimetypes
import mysql.connector
from dotenv import load_dotenv


# --- CONFIGURACIÓN ---
BASE_DIR = os.path.join(os.path.dirname(__file__))

load_dotenv()
DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "1234")  # fallback

# --- FUNCIONES BASE ---
def guardar_mensaje(nombre, email, mood, mensaje):
    """Guardar mensaje en MySQL"""
    conn = mysql.connector.connect(
        host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME
    )
    cursor = conn.cursor()
    sql = "INSERT INTO mensajes (nombre, email, mood, mensaje) VALUES (%s, %s, %s, %s)"
    cursor.execute(sql, (nombre, email, mood, mensaje))
    conn.commit()
    cursor.close()
    conn.close()

def obtener_mensajes():
    """Obtener mensajes de MySQL"""
    conn = mysql.connector.connect(
        host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME
    )
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM mensajes ORDER BY fecha DESC")
    resultados = cursor.fetchall()
    cursor.close()
    conn.close()
    return resultados

def serve_static(path):
    """Servir archivos estáticos"""
    # Redirigir "/" y "/home" a proyecto.html
    if path == "/" or path == "/home":
        path = "/index.html"

    # Si no tiene extensión, agregar ".html"
    if "." not in os.path.basename(path):
        path = path + ".html"

    ruta = os.path.join(BASE_DIR, path.lstrip("/"))

    if os.path.exists(ruta) and os.path.isfile(ruta):
        tipo_mime, _ = mimetypes.guess_type(ruta)
        if not tipo_mime:
            tipo_mime = "application/octet-stream"

        with open(ruta, "rb") as f:
            return f.read(), tipo_mime

    return None, None

# --- APP WSGI ---
def app(environ, start_response):
    path = environ.get("PATH_INFO", "/")
    method = environ.get("REQUEST_METHOD", "GET")

    print(f"[{method}] {path}")  # logging básico

    # --- FORMULARIO /enviar ---
    if path == "/enviar" and method == "POST":
        try:
            size = int(environ.get("CONTENT_LENGTH", 0))
        except ValueError:
            size = 0
        body = environ["wsgi.input"].read(size).decode()
        datos = urllib.parse.parse_qs(body)

        nombre = datos.get("nombre", [""])[0]
        email = datos.get("email", [""])[0]
        mood = datos.get("mood", [""])[0]
        mensaje = datos.get("mensaje", [""])[0]

        # Guardar en MySQL con manejo de errores
        try:
            guardar_mensaje(nombre, email, mood, mensaje)
        except Exception as e:
            start_response("500 Internal Server Error", [("Content-Type", "text/plain; charset=utf-8")])
            return [f"Error al guardar en la base de datos: {e}".encode("utf-8")]

        # Respuesta exitosa
        start_response("200 OK", [("Content-Type", "text/plain; charset=utf-8")])
        return ["¡Mensaje recibido y guardado!".encode("utf-8")]

    # --- PÁGINA PROTEGIDA /mensajes ---
    if path == "/mensajes":
        query = environ.get("QUERY_STRING", "")
        password = urllib.parse.parse_qs(query).get("password", [""])[0]

        if password != ADMIN_PASSWORD:
            start_response("401 Unauthorized", [("Content-Type", "text/plain; charset=utf-8")])
            return ["Contraseña incorrecta.".encode("utf-8")]

        mensajes = obtener_mensajes()
        start_response("200 OK", [("Content-Type", "text/html; charset=utf-8")])

        html = """
        <html>
        <head>
            <title>Mensajes recibidos</title>
            <style>
                body {font-family: Arial, sans-serif; background: #f9f9f9; text-align:center;}
                table {border-collapse: collapse; width: 90%; margin: 20px auto;}
                th, td {border: 1px solid #333; padding: 8px; text-align: center;}
                th {background-color: #f2f2f2;}
            </style>
        </head>
        <body>
            <h1>Mensajes recibidos</h1>
            <table>
                <tr><th>Nombre</th><th>Email</th><th>Mood</th><th>Mensaje</th><th>Fecha</th></tr>
        """

        for m in mensajes:
            html += f"<tr><td>{m['nombre']}</td><td>{m['email']}</td><td>{m['mood']}</td><td>{m['mensaje']}</td><td>{m['fecha']}</td></tr>"

        html += "</table></body></html>"

        return [html.encode("utf-8")]


    # --- ARCHIVOS ESTÁTICOS ---
    contenido, tipo_mime = serve_static(path)
    if contenido:
        start_response("200 OK", [("Content-Type", f"{tipo_mime}; charset=utf-8")])
        return [contenido]

    # --- 404 ---
    start_response("404 Not Found", [("Content-Type", "text/html; charset=utf-8")])
    return [b"<h1>404 - Archivo no encontrado</h1>"]

# --- INICIO DEL SERVIDOR ---
if __name__ == "__main__":
    host, port = "localhost", 8000
    print(f"Servidor WSGI corriendo en http://{host}:{port}")
    with make_server(host, port, app) as server:
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido por el usuario")


