from flask import Flask, request, jsonify, Response

app = Flask(__name__)


@app.route('/', methods=['GET'])
def hello():
    return 'This is the backend'

@app.route('/requests', methods=['GET', 'POST'])
def process_request():
    if request.method == 'POST':
        if request.is_json:
            return _process_request_post(request.get_json()), 200
        return 'Invalid post', 400

    return 'You made a GET request', 200
    # return process_request_get(request.args.get('param'))

def _process_request_post(json):
    return json
