flask-sockets-demo
==================

Using flask-sockets for a simple proof of concept websockets application.

This is a demonstration of using WebSockets with Flask and
Kenneth Reitz's [Flask-Sockets](https://github.com/kennethreitz/flask-sockets)
for the Python server-side code and [Angular.js](http://angularjs.org/) for the
client side code.

Messages are sent to the server and the server responds back to each one with
an 'O HAI!' message.

## Requirements

*   Flask
*   Flask-Sockets
*   gunicorn

To install the requirements simply run

<pre>
pip install -r requirements.txt
</pre>

## Running

Since Flask and the underlying Werkzeug HTTP server do not include a way to
access the WSGI websocket implementation, we cannot simply invoke
<code>app.run("host",8080)</code> as we would on a traditional Flask app.

Instead we must use [gunicorn](http://gunicorn.org/) as our HTTP server, since it has a gevent
websocket implementation built in. To execute the server on localhost:8080, we
can execute

<pre>
gunicorn -k flask_sockets.worker server:app -b localhost:8080
</pre>

Once this is running the demo can be found at
<code>http://localhost:8080/</code>

Cheers!

<img src="http://i1157.photobucket.com/albums/p593/yousirareacuntt/tumblr_lzd4b5Rq5O1r0d0y0-1.gif">
