import { openDB, IDBPDatabase } from 'idb';
import { MOCK_POLICY_DB } from '../constants';
import { PolicyData } from '../types';
import { useQuery } from '@tanstack/react-query';

const DB_NAME = 'cljhba-policy-db';
const STORE_NAME = 'policies';
const DB_VERSION = 1;
let dbPromise: Promise<IDBPDatabase> | null = null;

const getDb = () => {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          Object.values(MOCK_POLICY_DB).forEach((policy) => {
            store.put({ ...policy, id: policy.id.toUpperCase() });
          });
        }
      }
    });
  }
  return dbPromise;
};

export const upsertPolicies = async (policies: PolicyData[]) => {
  const db = await getDb();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  for (const policy of policies) {
    tx.store.put({ ...policy, id: policy.id.toUpperCase() });
  }
  await tx.done;
};

export const queryPolicyDatabase = async (policyId: string): Promise<PolicyData | null> => {
  const db = await getDb();
  const formattedId = policyId.toUpperCase().trim();
  const policy = await db.get(STORE_NAME, formattedId);
  return policy || null;
};

export const usePolicyQuery = (policyId: string) => {
  return useQuery({
    queryKey: ['policy', policyId?.trim().toUpperCase()],
    queryFn: () => queryPolicyDatabase(policyId),
    enabled: !!policyId,
    retry: 2,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};
