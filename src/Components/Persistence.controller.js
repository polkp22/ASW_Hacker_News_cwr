let PersistenceController;

(function() {
    let instance;
    PersistenceController = function() {
        if (instance) {
            return instance;
        }
        instance = this;
        // Properties
        this.DB_URI = process.env.REACT_APP_DB_URI;
    };
})();

PersistenceController.prototype.getExampleData = async function() {
    let data = fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json());
    return data;
}

PersistenceController.prototype.getRequest = async function(endpoint, query) {
    let settings = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'api_key': process.env.REACT_APP_API_KEY
        },
        params: query
    };
    
    let data = await fetch(this.DB_URI + endpoint, settings)
        .then(response => response.json());
    return data;
};

PersistenceController.prototype.postRequest = async function(endpoint, params) {
    let settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api_key': process.env.REACT_APP_API_KEY
        },
        body: JSON.stringify(params)
    };
    
    let data = await fetch(this.DB_URI + endpoint, settings)
        .then(response => response.json());
    return data;
};

PersistenceController.prototype.putRequest = async function(endpoint, params) {
    console.log("params ctrl: ", params)
    let settings = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'api_key': process.env.REACT_APP_API_KEY
        },
        body: JSON.stringify(params)
    };
    
    let data = await fetch(this.DB_URI + endpoint, settings)
        .then(response => response.json());
    return data;
};

export default PersistenceController;