import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";

export default function useCrud({ listUrl, createFn, updateFn, deleteFn }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(listUrl);
      setRows(res.data);
    } finally {
      setLoading(false);
    }
  }, [listUrl]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const create = async (payload) => { await createFn(payload); await fetchAll(); };
  const update = async (id, payload) => { await updateFn(id, payload); await fetchAll(); };
  const remove = async (id) => { await deleteFn(id); await fetchAll(); };

  return { rows, loading, fetchAll, create, update, remove };
}
