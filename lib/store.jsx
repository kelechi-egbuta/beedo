"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { STORAGE_KEY } from "./constants";
import { buildSeedLeads } from "./seedData";
import { genId } from "./utils";

const CrmContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, leads: action.leads, hydrated: true };
    case "ADD_LEAD": {
      const now = new Date().toISOString();
      const lead = {
        id: genId(),
        stage: "new",
        source: "Other",
        value: 0,
        notes: "",
        createdAt: now,
        updatedAt: now,
        ...action.lead,
      };
      return { ...state, leads: [lead, ...state.leads] };
    }
    case "UPDATE_LEAD": {
      const now = new Date().toISOString();
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.id ? { ...l, ...action.patch, updatedAt: now } : l
        ),
      };
    }
    case "MOVE_STAGE": {
      const now = new Date().toISOString();
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.id ? { ...l, stage: action.stage, updatedAt: now } : l
        ),
      };
    }
    case "DELETE_LEAD":
      return { ...state, leads: state.leads.filter((l) => l.id !== action.id) };
    default:
      return state;
  }
}

export function CrmProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { leads: [], hydrated: false });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const leads = raw ? JSON.parse(raw) : buildSeedLeads();
      dispatch({ type: "HYDRATE", leads });
    } catch (err) {
      dispatch({ type: "HYDRATE", leads: buildSeedLeads() });
    }
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.leads));
    } catch (err) {
      // storage full or unavailable — fail silently, data stays in memory
    }
  }, [state.leads, state.hydrated]);

  return (
    <CrmContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CrmContext.Provider>
  );
}

export function useCrm() {
  const ctx = useContext(CrmContext);
  if (!ctx) throw new Error("useCrm must be used within CrmProvider");
  return ctx;
}
