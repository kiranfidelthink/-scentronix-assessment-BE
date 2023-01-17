"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var app = (0, express_1.default)();
var port = 3000;
function fetchServers() {
    var serverArray = [
        {
            "url": "https://does-not-work.perfume.new",
            "priority": 1
        },
        {
            "url": "https://gitlab.com",
            "priority": 4
        },
        {
            "url": "http://app.scnt.me",
            "priority": 3
        },
        {
            "url": "https://offline.scentronix.com",
            "priority": 2
        }
    ];
    var requests = serverArray.map(function (item) { return (0, node_fetch_1.default)(item.url); });
    console.log(requests, "requestss");
    // Promise.all waits until all jobs are resolved
    Promise.all(requests)
        .then(function (responses) {
        responses.forEach(function (response) { return console.log(response.status); });
        return responses;
    });
}
app.listen(port, function () {
    console.log("Express is listening at http://localhost:".concat(port));
    fetchServers();
});
