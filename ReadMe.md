# Reckon API Test

Node.js Backend API Integration for Reckon


## Installing dependencies

Using npm:

```bash
$ npm install
```

## Runnig Test Cases

```bash
$ npm test
```

## Running the application

```bash
$ npm start
```

## Using the API


1. GET http:localhost:9999/

Service endpoint will fetch If the number is wholly divisibele , log the output as a result to the browser. If multiple outputs are satisfied, print outputs that are satisfied.

```bash
GET http:localhost:9999/
```
Service Response:

1:
2:
3: Boss
4:
5: Hogg
6: Boss
7:
8:
9: Boss
10: Hogg
11:
12: Boss
13: Boss
14:
15: BossHogg
[....etc....]


1. GET http:localhost:9999/textToSearch

Service endpoint will find all the occurrences of a particular set of characters in a string and post the results back to another api.

```bash
GET http:localhost:9999/textToSearch
```
Service Response:

{"status":200,"message":"The result has been submited","data":{"candidate":"Chetan Singh","text":"Peter told me (actually he slurrred) that peter the pickle piper piped a pitted pickle before he petered out. Phew!","results":[{"subtext":"Peter","result":"1,43,98"},{"subtext":"peter","result":"1,43,98"},{"subtext":"Pick","result":"53,81"},{"subtext":"Pi","result":"53,60,66,74,81"},{"subtext":"Z","result":"<No Output>"}]}}