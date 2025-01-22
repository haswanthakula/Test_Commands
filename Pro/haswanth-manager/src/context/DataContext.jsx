import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [passwords, setPasswords] = useState(() => {
    const savedPasswords = localStorage.getItem('passwords');
    return savedPasswords ? JSON.parse(savedPasswords) : [];
  });

  const [emails, setEmails] = useState(() => {
    const savedEmails = localStorage.getItem('emails');
    return savedEmails ? JSON.parse(savedEmails) : [];
  });

  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('movies');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  const [moneyTransactions, setMoneyTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('moneyTransactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  useEffect(() => {
    localStorage.setItem('passwords', JSON.stringify(passwords));
  }, [passwords]);

  useEffect(() => {
    localStorage.setItem('emails', JSON.stringify(emails));
  }, [emails]);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem('moneyTransactions', JSON.stringify(moneyTransactions));
  }, [moneyTransactions]);

  const value = {
    passwords,
    setPasswords,
    emails,
    setEmails,
    movies,
    setMovies,
    moneyTransactions,
    setMoneyTransactions
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
