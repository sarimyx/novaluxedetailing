"use client";

import { useEffect, useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

interface AddressAutocompleteProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

interface Prediction {
  description: string;
  place_id: string;
}

export function AddressAutocomplete({
  value,
  onChange,
  placeholder = "Enter your address",
  className,
}: AddressAutocompleteProps) {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(value);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setInput(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchPredictions = useDebouncedCallback(async (searchText: string) => {
    if (!searchText.trim()) {
      setPredictions([]);
      setOpen(false);
      return;
    }

    if (abortRef.current) {
      abortRef.current.abort();
    }

    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    setLoading(true);
    try {
      const response = await fetch("/api/address-autocomplete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: searchText }),
        signal,
      });
      if (!response.ok) throw new Error("Autocomplete API failed");
      const data = await response.json();
      setPredictions(data.predictions || []);
      setOpen(true);
    } catch (error: any) {
      if (error?.name !== "AbortError") {
        console.error("Error fetching predictions:", error);
      }
    } finally {
      setLoading(false);
    }
  }, 300);

  return (
    <div
      ref={rootRef}
      className="autocomplete-root relative w-full"
      role="combobox"
      aria-controls="autocomplete-list"
      aria-expanded={open ? "true" : "false"}
      aria-haspopup="listbox"
    >
      <div className="w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            fetchPredictions(e.target.value);
          }}
          placeholder={placeholder}
          autoComplete="street-address"
          className={className || "p-2 rounded-lg bg-slate-800 md:w-3/6 w-4/6"}
          aria-autocomplete="list"
          aria-controls="autocomplete-list"
        />
      </div>
      {loading && (
        <div className="absolute right-2 top-2.5">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
      {open && predictions.length > 0 && (
        <div
          id="autocomplete-list"
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1 z-50"
        >
          <div className="relative rounded-md border bg-slate-900 shadow-md max-h-[200px] overflow-auto">
            {predictions.map((prediction) => (
              <div
                key={prediction.place_id}
                role="option"
                aria-selected="false"
                onClick={() => {
                  setInput(prediction.description);
                  onChange(prediction.description);
                  setPredictions([]);
                  setOpen(false);
                }}
                className="px-2 py-1.5 text-sm cursor-pointer hover:bg-slate-800"
              >
                {prediction.description}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
