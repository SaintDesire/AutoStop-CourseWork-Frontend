"use client"
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface UserData {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  setIsAuthenticated: (auth: boolean) => void;
  setUser: (user: UserData | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  setIsAuthenticated: () => {},
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/auth/session", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data: UserData = await response.json();
          setIsAuthenticated(true);
          setUser(data);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching session:", err);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    fetchSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
