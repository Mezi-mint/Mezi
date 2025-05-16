const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const data = JSON.parse(event.body);

        // Thay URL này bằng Google Apps Script URL của bạn
        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-j10lknh3IfJc2Bs5SUGe0B-VgiNAReMxRAtGNLHGwTGwzf9OfwdR__LbtZM2KB6bvQ/exec";

        // Gửi dữ liệu đến Google Apps Script
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            return { statusCode: response.status, body: 'Failed to send data to Google Script' };
        }

        return { statusCode: 200, body: 'Data submitted successfully' };

    } catch (error) {
        return { statusCode: 500, body: 'Server error: ' + error.message };
    }
};