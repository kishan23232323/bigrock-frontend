import { useState, useRef, useEffect } from 'react';
import { convertFiatUsdt } from '../services/Conversion/conversionapi';

export default function useConvert() {
  const [loading, setLoading] = useState(false);
  const [converted, setConverted] = useState(null);
  const [rate, setRate] = useState(null);
  const [error, setError] = useState(null);

  const debounceRef = useRef(null);
  const lastParamsRef = useRef(null);

  const convert = (amount, from, to, mode, delay = 500) => {
    
    lastParamsRef.current = { amount, from, to, mode };

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await convertFiatUsdt({ amount, from, to, mode });
        setConverted(resp.convertedAmount ?? resp.converted ?? null);
        setRate(resp.rate ?? null);
      } catch (err) {
        setError(err);
        setConverted(null);
        setRate(null);
      } finally {
        setLoading(false);
      }
    }, delay);
  };

  const triggerNow = async (amount, from, to, mode) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setLoading(true);
    setError(null);
    try {
      const resp = await convertFiatUsdt({ amount, from, to, mode });
      setConverted(resp.convertedAmount ?? resp.converted ?? null);
      setRate(resp.rate ?? null);
    } catch (err) {
      setError(err);
      setConverted(null);
      setRate(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return { converted, rate, loading, error, convert, triggerNow };
}