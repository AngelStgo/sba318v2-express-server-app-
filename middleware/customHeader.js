const customHeader = (req, res, next) => {
    res.setHeader('X-Custom-Header', 'MyCustomHeaderValue');
    next();
};

export default customHeader;