const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize admin with full privileges
admin.initializeApp();

exports.addRFIDScan = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const { tagId, userName } = req.body;
    
    if (!tagId) {
      res.status(400).json({ error: 'tagId is required' });
      return;
    }

    const scan = {
      tagId,
      userName: userName || 'Unknown',
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    };

    await admin.firestore().collection('rfid_scans').add(scan);
    
    res.status(200).json({ 
      message: 'Scan recorded successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error recording scan:', error);
    res.status(500).json({ 
      error: 'Failed to record scan',
      message: error.message 
    });
  }
});