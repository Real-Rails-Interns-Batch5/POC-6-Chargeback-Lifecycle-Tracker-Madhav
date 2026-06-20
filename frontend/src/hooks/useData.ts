import { useMemo, useState, useEffect } from 'react';
import api from '@/lib/api';
import type { ChargebackCase, FilterState } from '@/types/index';

export const useCases = (filters?: FilterState) => {
  const [cases, setCases] = useState<ChargebackCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const data = await api.getCases(filters);
        if (Array.isArray(data)) {
          setCases(data);
        }
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [filters?.status, filters?.merchant]);

  return { cases, loading, error };
};

export const useStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await api.getStats();
        setStats(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};

export const useDisputeOutcomes = () => {
  const [outcomes, setOutcomes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOutcomes = async () => {
      try {
        setLoading(true);
        const data = await api.getDisputeOutcomes();
        setOutcomes(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOutcomes();
  }, []);

  return { outcomes, loading, error };
};
