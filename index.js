exports.handler = async (event) => {
    const name = event.name;
    const response = {
        statusCode: 200,
        body: `Hello, ${name}!`
    };
    return response;
};
