const https = require('https');

const statusColors = (status) => {
    const indicatorColors = {
        critical: '#e74c3c',
        major: '#e67e22',
        minor: '#f1c40f',
        maintenance: '#3498DB',
        none: '#333333'
    };

    return indicatorColors[status] || indicatorColors['none'];
};

exports.handler = (event) => {
    const body = JSON.parse(event.body);

    let statusObject = {
        color: statusColors(body.page.status_indicator),
        pretext: body.page.status_description
    };

    if (body.incident) {
        Object.assign(statusObject, {
            fallback: '[' + body.incident.status + ']: ' + body.incident.name,
            title: body.incident.name + ' [' + body.incident.status + ']',
            title_link: body.incident.shortlink,
            text: body.incident.incident_updates[0].body
        });
    } else if (body.component) {
        Object.assign(statusObject, {
            fallback: body.component.name + ': [' + body.component.status + ']',
            fields: [
                {
                    title: body.component.name,
                    value: body.component.status
                }
            ]
        });
    }

    const data = JSON.stringify({
        attachments: [statusObject]
    });

    const options = {
        hostname: 'hooks.slack.com',
        path: `/services/${event.queryStringParameters.target}`,
        port: 443,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);

        res.on('data', (d) => {
            process.stdout.write(d)
        })
    });

    req.on('error', (error) => {
        console.error(error)
    });

    req.write(data);
    req.end();
};
