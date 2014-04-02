// Create angular module
var app = angular.module('flask-websockets', []);

app.factory('ChatService', function() {
    var loc = window.location, ws_uri;
    // Dynamically generate the URI where the browser sees the server
    if (loc.protocol === "https:") {
        new_uri = "wss:";
    } else {
        new_uri = "ws:";
    }
    // NOTE: loc.host includes the port number
    new_uri += "//" + loc.host;
    new_uri += loc.pathname + "/chat";
    var service = {};
    service.connect = function() {
        if(service.ws) {
            return;
        }
        var ws = new WebSocket("ws://localhost:8000/chat");
        ws.onopen = function() {
            service.callback("Succeeded in opening a connection");
        };
        ws.onerror = function() {
            service.callback("Failed to open a connection");
        }
        ws.onmessage = function(message) {
            service.callback(message.data);
        };
        service.ws = ws;
    }
    service.send = function(message) {
        service.ws.send(message);
    }
    service.subscribe = function(callback) {
        service.callback = callback;
    }
    return service;
    });

function ChatController($scope, ChatService) {
    $scope.messages = []
    ChatService.connect();
    ChatService.subscribe(function(message) {
        $scope.messages.push({ text: message });
        $scope.$apply();
    });
    $scope.send = function() {
        ChatService.send($scope.text);
        $scope.text = "";
    }
    $scope.keypress = function(e) {
        if (e.keyCode == 13) {
            $scope.send();
        }
    }
}
