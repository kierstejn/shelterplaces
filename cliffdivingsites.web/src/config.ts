const dev = {
    serverUrl: 'http://localhost:5000',
    locationIq: {
        token: '42871ecde74384'
    },
    google: {
        apiKey: 'AIzaSyCnJaUXeaK95zS4ivA7xTmlKaiuWA9Mf_k'
    }
};

const prod = {
    serverUrl: '',
    locationIq: {
        token: '42871ecde74384'
    },
    google: {
        apiKey: 'AIzaSyCnJaUXeaK95zS4ivA7xTmlKaiuWA9Mf_k'
    }
};


const config = process.env.NODE_ENV === 'development' ? dev : prod;
export default config;