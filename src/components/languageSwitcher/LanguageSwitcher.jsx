'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (e) => {
    const selectedLocale = e.target.value;

    // Replace locale prefix in pathname
    const segments = pathname.split('/');
    if (segments[1] === 'en' || segments[1] === 'pl') {
      segments[1] = selectedLocale;
    } else {
      segments.splice(1, 0, selectedLocale);
    }

    const newPath = segments.join('/');
    router.push(newPath);
  };

  const currentLocale = pathname.split('/')[1];

  return (
    <select onChange={changeLanguage} value={currentLocale}>
      <option value="en">English</option>
      <option value="pl">Polish</option>
    </select>
  );
};

export default LanguageSwitcher;
