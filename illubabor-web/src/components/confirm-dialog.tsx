'use client';

import { createContext, useCallback, useContext, useState, ReactNode } from 'react';

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
}

interface ConfirmContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextValue | undefined>(undefined);

export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

  const confirm = useCallback((opts: ConfirmOptions) => {
    setOptions(opts);
    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  }, []);

  const handleClose = (result: boolean) => {
    resolver?.(result);
    setOptions(null);
    setResolver(null);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {options && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            {options.title && (
              <h3 className="font-display text-lg font-semibold text-ink-950">{options.title}</h3>
            )}
            <p className="mt-2 text-sm text-ink-700">{options.message}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => handleClose(false)}
                className="rounded-md border border-coffee-950/20 px-4 py-2 text-sm hover:bg-coffee-950/5"
              >
                {options.cancelLabel ?? 'Cancel'}
              </button>
              <button
                onClick={() => handleClose(true)}
                className={`rounded-md px-4 py-2 text-sm font-semibold text-white ${
                  options.danger ? 'bg-red-600 hover:bg-red-500' : 'bg-clay-600 hover:bg-clay-500'
                }`}
              >
                {options.confirmLabel ?? 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirm must be used within ConfirmDialogProvider');
  return ctx.confirm;
}