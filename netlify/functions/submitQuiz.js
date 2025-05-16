const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    console.log("🔔 Netlify function triggered");
    console.log("Method:", event.httpMethod);
    console.log("Body:", event.body);

    if (event.httpMethod !== 'POST') {
        console.log("❌ Not a POST request");
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const data = JSON.parse(event.body);
        console.log("✅ Parsed data:", data);

        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-j10lknh3IfJc2Bs5SUGe0B-VgiNAReMxRAtGNLHGwTGwzf9OfwdR__LbtZM2KB6bvQ/exec";

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        console.log("📤 Google Script response status:", response.status);

        return { statusCode: 200, body: 'Sent to Google Script' };
    } catch (err) {
        console.error("🔥 Error occurred:", err);
        return { statusCode: 500, body: 'Internal Server Error' };
    }
};