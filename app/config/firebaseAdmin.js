import admin from 'firebase-admin'

const privateKey = process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            type: process.env.FIREBASE_TYPE,
            project_id: process.env.FIREBASE_PROJECT_ID,
            private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
            private_key: privateKey,
            client_email: process.env.FIREBASE_CLIENT_EMAIL,
            client_id: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID,
            auth_uri: process.env.NEXT_PUBLIC_FIREBASE_AUTH_URI,
            token_uri: process.env.NEXT_PUBLIC_FIREBASE_TOKEN_URI,
            auth_provider_x509_cert_url: process.env.NEXT_PUBLIC_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
            client_x509_cert_url: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_X509_CERT_URL,
            universe_domain: process.env.NEXT_PUBLIC_FIREBASE_UNIVERSE_DOMAIN,
        }),
    })
}

export default admin
