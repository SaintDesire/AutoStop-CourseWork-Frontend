"use client";

import { useState } from 'react';
import Link from 'next/link';
import { DASHBOARD_PAGES } from '@/config/pages-url.config';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Логика регистрации пользователя
    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md justify-center">
      <h2 className="text-3xl font-bold text-center mb-6">Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Подтвердите пароль:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-gray-600">Уже есть аккаунт? </span>
        <Link href={DASHBOARD_PAGES.LOGIN} className="text-blue-500 hover:underline">
          Войдите
        </Link>
      </div>
    </div>
  );
};

export default Register;
