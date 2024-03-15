const event = {
    version: '2.0',
    routeKey: '$default',
    rawPath: '/api/v1/product/createNewProduct',
    rawQueryString: '',
    headers: {
        'sec-fetch-mode': 'cors',
        referer: 'https://editor-next.swagger.io/',
        'content-length': '216',
        'x-amzn-tls-version': 'TLSv1.3',
        'sec-fetch-site': 'cross-site',
        'x-forwarded-proto': 'https',
        'accept-language': 'en-US,en-IN;q=0.9,en;q=0.8',
        origin: 'https://editor-next.swagger.io',
        'x-forwarded-port': '443',
        'x-forwarded-for': '2409:40f3:1096:88be:18e5:5493:b7db:b78f',
        accept: 'application/json',
        'x-amzn-tls-cipher-suite': 'TLS_AES_128_GCM_SHA256',
        'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'x-amzn-trace-id': 'Root=1-65f476a6-21c2089f3929a3e82ee90b8e',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        host: 'c5vivyjwsori5w5eenemb7yiuy0jzzek.lambda-url.ap-south-1.on.aws',
        'content-type': 'application/json',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'sec-fetch-dest': 'empty',
    },
    requestContext: {
        accountId: 'anonymous',
        apiId: 'c5vivyjwsori5w5eenemb7yiuy0jzzek',
        domainName: 'c5vivyjwsori5w5eenemb7yiuy0jzzek.lambda-url.ap-south-1.on.aws',
        domainPrefix: 'c5vivyjwsori5w5eenemb7yiuy0jzzek',
        http: {
            method: 'POST',
            path: '/api/v1/product/createNewProduct',
            protocol: 'HTTP/1.1',
            sourceIp: '2409:40f3:1096:88be:18e5:5493:b7db:b78f',
            userAgent:
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        },
        requestId: '8336571e-284f-450c-881f-210f3a29078a',
        routeKey: '$default',
        stage: '$default',
        time: '15/Mar/2024:16:26:14 +0000',
        timeEpoch: 1710519974912,
    },
    body: '{\n  "customerId": 1,\n  "productName": "string",\n  "dateOfInstallation": "2024-03-15T16:19:49.143Z",\n  "warranty": "string",\n  "model": "string",\n  "pump": "string",\n  "membrane": "string",\n  "powerSupply": "string"\n}',
    isBase64Encoded: false,
};

module.exports = { event };
