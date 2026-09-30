import http.server
import socketserver
import os
import json
import mimetypes

PORT = 3009
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

# Ensure critical mime types
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('application/javascript', '.mjs')
mimetypes.add_type('application/wasm', '.wasm')
mimetypes.add_type('font/woff2', '.woff2')
mimetypes.add_type('image/ktx2', '.ktx2')
mimetypes.add_type('image/svg+xml', '.svg')
mimetypes.add_type('image/jpeg', '.jpg')
mimetypes.add_type('image/jpeg', '.jpeg')
mimetypes.add_type('image/png', '.png')
mimetypes.add_type('text/html', '.html')
mimetypes.add_type('application/json', '.json')

plant_counter = 1248

class SeedServerHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        global plant_counter
        if self.path.startswith('/api/plant'):
            plant_counter += 1
            response_data = json.dumps({'number': plant_counter, 'shared': False}).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(response_data)))
            self.end_headers()
            self.wfile.write(response_data)
            return
        
        self.send_error(404, "Endpoint Not Found")

    def do_GET(self):
        global plant_counter
        if self.path.startswith('/api/plant'):
            plant_counter += 1
            response_data = json.dumps({'number': plant_counter, 'shared': False}).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(response_data)))
            self.end_headers()
            self.wfile.write(response_data)
            return

        # Basis alias support if requested at /basis/... or /_/basis/...
        if self.path.startswith('/basis/'):
            subpath = self.path[len('/basis/'):]
            target = os.path.join(DIRECTORY, 'basis', subpath.split('?')[0])
            if os.path.exists(target) and not os.path.isdir(target):
                self.send_file(target)
                return

        return super().do_GET()

    def send_file(self, filepath):
        try:
            mime, _ = mimetypes.guess_type(filepath)
            if not mime:
                if filepath.endswith('.wasm'):
                    mime = 'application/wasm'
                elif filepath.endswith('.ktx2'):
                    mime = 'image/ktx2'
                else:
                    mime = 'application/octet-stream'

            with open(filepath, 'rb') as f:
                data = f.read()

            self.send_response(200)
            self.send_header('Content-Type', mime)
            self.send_header('Content-Length', str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        except Exception as e:
            self.send_error(500, str(e))

def run():
    socketserver.TCPServer.allow_reuse_address = True
    port = PORT
    for attempt in range(5):
        try:
            with socketserver.TCPServer(('127.0.0.1', port), SeedServerHandler) as httpd:
                print(f"Seed local server running at http://127.0.0.1:{port}/")
                httpd.serve_forever()
        except OSError as e:
            print(f"Port {port} busy, trying next...")
            port += 1

if __name__ == '__main__':
    run()
