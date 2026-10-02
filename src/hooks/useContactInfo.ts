import { useState, useEffect } from 'react';

interface ContactInfo {
  support: string;
  dispute: string;
}

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await fetch('http://localhost:3002/api/contact-info');
        if (!res.ok) throw new Error('Failed to fetch contact info');
        const data = await res.json();
        setContactInfo(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  return { contactInfo, isLoading, error };
}
