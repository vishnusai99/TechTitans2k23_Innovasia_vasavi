from flask import Flask, render_template, request,jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
import requests
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans
from flask_bcrypt import Bcrypt
import jwt

app = Flask(__name__)
CORS(app)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/tourism_and_culture'
# Configure Bcrypt for password hashing
bcrypt = Bcrypt(app)
mongo = PyMongo(app)

# Replace with your secret key for JWT
app.config['SECRET_KEY'] = 'vasavi_hackethon'

@app.route('/register-user', methods=['POST'])
def register_user():
    # Get user collection
    user_collection = mongo.db.userCollection

    # Get user from client
    new_user = request.json.get('user')

    # Verify if user already exists
    user_of_db = user_collection.find_one({'username': new_user['username']})

    # If user already exists
    if user_of_db:
        return jsonify({'message': 'User already existed'}), 200

    # If user does not exist
    else:
        # Add CDN link of cloudinary image to user obj
        new_user['image'] = request.files['photo'].filename
        # Hash the password of new_user
        hashed_password = bcrypt.generate_password_hash(new_user['password']).decode('utf-8')
        # Replace plain password with hashed password
        new_user['password'] = hashed_password
        # Insert user
        user_collection.insert_one(new_user)
        # Send response
        return jsonify({'message': 'User created'}), 201


@app.route('/login-user', methods=['POST'])
def login_user():
    # Get user collection
    user_collection = mongo.db.userCollection

    # Get user from client
    user_credentials = request.json

    # Verify username of user_credentials
    user_of_db = user_collection.find_one({'username': user_credentials['username']})

    # If username is invalid
    if user_of_db is None:
        return jsonify({'message': 'Invalid username'}), 200

    # If username is valid
    else:
        # Compare passwords
        is_equal = bcrypt.check_password_hash(user_of_db['password'], user_credentials['password'])

        # If passwords not matched
        if not is_equal:
            return jsonify({'message': 'Invalid password'}), 200

        # Passwords are matched
        else:
            # Create JWT token
            signed_jwt_token = jwt.encode({'username': user_of_db['username']}, app.config['SECRET_KEY'], algorithm='HS256')
            # Send token in response
            return jsonify({'message': 'success', 'token': signed_jwt_token.decode('utf-8'), 'user': user_of_db}), 200


# Define routes
@app.route('/', methods=['GET'])
def get_data():
    print('hejkko')
    return 'helllo'

@app.route('/', methods=['POST'])
def add_data():
    # Insert data into MongoDB
    try:
        new_data = request.get_json()
        type = new_data['type']
        sw = new_data['sw']
        ne = new_data['ne']
        days = int(new_data['days'] or 3)
        print(days)
        arr = ['restaurants','attractions']
        arr1 = []
        for ele in arr:    
            url = f'https://travel-advisor.p.rapidapi.com/{ele}/list-in-boundary'

            params = {
                'bl_latitude': sw['lat'],
                'tr_latitude': ne['lat'],
                'bl_longitude': sw['lng'],
                'tr_longitude': ne['lng'],
            }

            headers = {
                'X-RapidAPI-Key': '1c636dce53mshe496b0655dabd9cp1165d9jsnfefbde651a3e',  # Replace with your actual RapidAPI key
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
            }

            response = requests.get(url, params=params, headers=headers)

            data = response.json()
            print(data['data'],"the data ---------------------------------")
            arr1.append(data)
        
        df_array = []
        
        for i in range(len(arr)):
        # print([ for x in data['data']]) 
            df = pd.DataFrame([{"address":x.get('address'),"latitude": float(x.get('latitude') or 0),
                "longitude": float(x.get('longitude') or 0),"distance": float(x.get('distance')  or 0),
                "rating": float(x.get('rating') or 0),"name":x.get('name'),"price":x.get('price'),"rating-original":float(x.get('rating') or 0),"image":x.get('photo', {}).get('images', {}).get('original', {}).get('url', '')} for x in arr1[i]['data']])
            # df = df.dropna()
        # Calculate weighted score for geospatial clustering
            scaler = MinMaxScaler()
            df[['distance', 'rating']] = scaler.fit_transform(df[['distance', 'rating']])
            df['weighted_score'] = 0.6 * df['distance'] + 0.4 * df['rating']

            # Perform KMeans clustering based on latitude, longitude, and weighted score
            X = df[['latitude', 'longitude', 'weighted_score']]
            kmeans = KMeans(n_clusters=days, random_state=42)  # Adjust the number of clusters as needed
            df['cluster'] = kmeans.fit_predict(X)
            
            df_array.append(df)
        # Assuming df is your DataFrame containing the restaurant data
        # Calculate distance (using Haversine formula)
        # df['distance'] = haversine_distance(df['latitude'], df['longitude'], user_location['latitude'], user_location['longitude'])

        # # Normalize distance and rating
        # scaler = MinMaxScaler()
        # df[['distance', 'rating']] = scaler.fit_transform(df[['distance', 'rating']])

        # # Define user preferences and weights
        # user_preferences = {'distance': 0.6, 'rating': 0.4}

        # # Calculate weighted score for sorting
        # df['weighted_score'] = user_preferences['distance'] * df['distance'] + user_preferences['rating'] * df['rating']

        # # Sort based on weighted score
        # sorted_df = df.sort_values(by='weighted_score')
        # df_final.to_csv('final_file1.csv',index=False)
        all_dataframes = {
            'restrounts': df_array[0].to_dict(orient='records'),
            # 'hotels': df_array[0].to_dict(orient='records'),
            'attractions': df_array[1].to_dict(orient='records')
        }
        return jsonify(all_dataframes)
    
    except Exception as e:
        print(e)
        

    # Display the sorted DataFrame
    
    # Assuming the response is in JSON format


if __name__ == '__main__':
    app.run(debug=True)

