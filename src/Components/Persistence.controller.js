let PersistenceController;

(function() {
    let instance;
    PersistenceController = function() {
        if (instance) {
            return instance;
        }
        instance = this;
        // Properties
        this.DB_URI = process.env.DB_URI;
    };
})();

PersistenceController.prototype.getExampleData = async function() {
    let data = fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json());
    return data;
}

PersistenceController.prototype.getRequest = async function(endpoint, key, query) {
    let data = fetch(this.DB_URI + endpoint, {
        method: 'GET',
        headers: {
            'api_key': key,
            'Content-Type': 'application/json'
        },
        params: query
    })
    .then(response => response.json())
    .catch(err => {
        console.log("ERROR!" + err);
    }) 

    return data;
    
};

PersistenceController.prototype.postRequest = async function(endpoint, key, params) {
    try {
        return fetch(this.DB_URI + endpoint, {
            method: 'POST',
            headers: {
                'api_key': key,
                'Content-Type': 'application/json'
            },
            data: params
        })
        .then(response => response.json())
        .then(json => {
            return json;
        })
    } catch (error) {
        return error;
    }
};

PersistenceController.prototype.putRequest = async function(endpoint, key, params) {
    try {
        return fetch(this.DB_URI + endpoint, {
            method: 'PUT',
            headers: {
                'api_key': key,
                'Content-Type': 'application/json'
            },
            data: params
        })
        .then(response => response.json())
        .then(json => {
            return json;
        })
    } catch (error) {
        return error;
    }
};

export default PersistenceController;