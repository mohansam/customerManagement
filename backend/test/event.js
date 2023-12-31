const event = {
    version: '2.0',
    routeKey: '$default',
    rawPath: '/api/v1/customer/getCustomerByName',
    rawQueryString: 'customerName=John',
    headers: {
        'sec-fetch-mode': 'navigate',
        'x-amzn-tls-version': 'TLSv1.2',
        'sec-fetch-site': 'cross-site',
        'accept-language': 'en-US,en-IN;q=0.9,en;q=0.8',
        'x-forwarded-proto': 'https',
        'x-forwarded-port': '443',
        'x-forwarded-for': '152.58.214.233',
        'sec-fetch-user': '?1',
        accept: 'application/json',
        'x-amzn-tls-cipher-suite': 'ECDHE-RSA-AES128-GCM-SHA256',
        'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
        'sec-ch-ua-mobile': '?0',
        'x-amzn-trace-id': 'Root=1-64919e4f-4adb1c9237ea09165c76ebbe',
        'sec-ch-ua-platform': '"Windows"',
        host: 'c5vivyjwsori5w5eenemb7yiuy0jzzek.lambda-url.ap-south-1.on.aws',
        'upgrade-insecure-requests': '1',
        'cache-control': 'max-age=0',
        'accept-encoding': 'gzip, deflate, br',
        'sec-fetch-dest': 'document',
        'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
    },
    requestContext: {
        accountId: 'anonymous',
        apiId: 'c5vivyjwsori5w5eenemb7yiuy0jzzek',
        domainName: 'c5vivyjwsori5w5eenemb7yiuy0jzzek.lambda-url.ap-south-1.on.aws',
        domainPrefix: 'c5vivyjwsori5w5eenemb7yiuy0jzzek',
        http: {
            method: 'GET',
            path: '/api/v1/customer/createNewCustomer',
            protocol: 'HTTP/1.1',
            sourceIp: '152.58.214.233',
            userAgent:
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
        },
        requestId: '47554516-5ab9-4af6-aa9b-82009bfff4ce',
        routeKey: '$default',
        stage: '$default',
        time: '20/Jun/2023:12:40:47 +0000',
        timeEpoch: 1687264847983,
    },
    // body: JSON.stringify({
    //     customerId: 1,
    //     serviceDate: '2023-06-21',
    //     isServiceCompleted: true,
    // }),
    isBase64Encoded: false,
};

module.exports = { event };
