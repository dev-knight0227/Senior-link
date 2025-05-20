// context/LangContext.jsx
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import en from '../../messages/en.json';
import pl from '../../messages/pl.json';

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');
  const [messages, setMessages] = useState(en);

  useEffect(() => {
    const stored = localStorage.getItem('locale') || 'en';
    setLocale(stored);
    setMessages(stored === 'pl' ? pl : en);
  }, []);

  const switchLocale = (newLocale) => {
    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);
    setMessages(newLocale === 'pl' ? pl : en);
  };

  return (
    <LangContext.Provider value={{ locale, messages, switchLocale }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
