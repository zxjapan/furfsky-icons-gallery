#!/usr/bin/env python3
import http.server
import socketserver
import os
import json
from urllib.parse import urlparse, parse_qs

PORT = 8000

class ImageServer(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Handle API request for file list
        if self.path == '/api/files':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            # Get all files from v3 folder
            v3_path = 'skyblockicons/v3'
            if os.path.exists(v3_path):
                files = [f for f in os.listdir(v3_path) if f.lower().endswith(('.png', '.gif', '.jpg', '.jpeg'))]
                response = json.dumps({'files': files})
                self.wfile.write(response.encode())
            else:
                response = json.dumps({'files': []})
                self.wfile.write(response.encode())
            return
        
        # Serve static files normally
        super().do_GET()

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), ImageServer) as httpd:
        print(f"Server running at http://localhost:{PORT}")
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.") 