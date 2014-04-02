from flask import Flask, render_template, send_from_directory
from flask_sockets import Sockets

# Create our Flask app
app = Flask(__name__)
# Set debugging to true since we're not in production
app.debug = True
# Create a new Flask-Sockets context from out Flask app
sockets = Sockets(app)


@sockets.route('/chat')
def chat_route(ws):
    """ This handles Websocket requests from the browser to the /chat URI """
    # While the server is running
    while True:
        # Block until we recieve a message from a client
        message = ws.receive()
        # Print the message on the screen
        print "[Client] " + message
        # Send back a friendly, yet ill-conceived greeting
        ws.send("O HAI!")


@app.route("/")
def index_route():
    """ Route for the main HTML page """
    # Render the main template
    return render_template('index.html')


# Serves static resources like css, js, images, etc.
@app.route('/assets/<path:resource>')
def serveStaticResource(resource):
    # Return the static file
    return send_from_directory('static/assets', resource)
