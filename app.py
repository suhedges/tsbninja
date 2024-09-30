from flask import Flask, jsonify, request
app = Flask(__name__)

part_data = {
    "123ABC": ["456DEF", "789GHI", "987XYZ"],
    "LMN456": ["OPQ123", "RST789"],
    "456DEF": ["123ABC", "789GHI"]
}

tapered_data = [
    {"partNumber": "T123", "bore": "25 mm", "outside": "50 mm", "width": "15 mm"},
    {"partNumber": "T456", "bore": "30 mm", "outside": "60 mm", "width": "20 mm"}
]

@app.route('/search_part', methods=['GET'])
def search_part():
    query = request.args.get('query', '').upper()
    result = part_data.get(query, [])
    return jsonify(result)

@app.route('/search_bearings', methods=['POST'])
def search_bearings():
    data = request.json
    bore = data.get('bore', '')
    outside = data.get('outside', '')
    width = data.get('width', '')

    filtered_results = [b for b in tapered_data if
                        (bore in b['bore'] or not bore) and
                        (outside in b['outside'] or not outside) and
                        (width in b['width'] or not width)]
    
    return jsonify(filtered_results)

if __name__ == '__main__':
    app.run(debug=True)
