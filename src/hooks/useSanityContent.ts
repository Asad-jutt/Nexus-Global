import { useState, useEffect, useCallback } from 'react';
import { getSiteContent, subscribeToContentChanges } from '../sanity/client';
import { DEFAULT_CONTENT } from '../data/siteContent';
import type { ContentBundle } from '../data/siteContent';

let contentCache: ContentBundle | null = null;
let fetchPromise: Promise<ContentBundle> | null = null;

function loadContent(): Promise<ContentBundle> {
  if (contentCache) return Promise.resolve(contentCache);
  if (!fetchPromise) {
    fetchPromise = getSiteContent()
      .then((content) => {
        contentCache = content;
        return content;
      })
      .finally(() => {
        fetchPromise = null;
      });
  }
  return fetchPromise;
}

export function useSanityContent(): ContentBundle {
  const [content, setContent] = useState<ContentBundle>(() => contentCache ?? DEFAULT_CONTENT);

  useEffect(() => {
    let cancelled = false;
    loadContent().then((loaded) => {
      if (!cancelled) setContent(loaded);
    });
    const unsubscribe = subscribeToContentChanges(() => {
      contentCache = null;
      fetchPromise = null;
      loadContent().then((loaded) => {
        if (!cancelled) setContent(loaded);
      });
    });
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  const refetch = useCallback(() => {
    contentCache = null;
    fetchPromise = null;
    return loadContent().then((loaded) => {
      setContent(loaded);
      return loaded;
    });
  }, []);

  return content;
}
