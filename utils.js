const http = require('node: http');
const url = require('node:url')

export const parseQuery=(request, response)=>{
    response.writeHead(200, {'Content-Type': 'text/html'})
    let query = url.parse(request.url, true).query;
    //each query item will end up being something like query.param
    //this works with urls that end up being /?param=value&param=value
    return query
}

export const getUrlData = (request, response)=>{
    let urlData = url.parse(request.url, true);
    return urlData;
}
