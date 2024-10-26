import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { RFIDScan } from '../types';

export function useRFIDScans(limitCount = 50) {
  const [scans, setScans] = useState<RFIDScan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'rfid_scans'),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const newScans = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            tagId: data.tagId,
            timestamp: data.timestamp?.toDate() ?? new Date(),
            userName: data.userName ?? 'Unknown',
          };
        });
        setScans(newScans);
        setError(null);
        setLoading(false);
      },
      (err) => {
        console.error('Firestore error:', err);
        setError('Failed to load RFID scans. Please try again later.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [limitCount]);

  return { scans, error, loading };
}