import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, changeLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'he', name: 'עברית' },
    { code: 'ru', name: 'Русский' },
    { code: 'ar', name: 'العربية' }
  ];

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <select
      value={language}
      onChange={handleLanguageChange}
      style={{ width: 120, padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher; 