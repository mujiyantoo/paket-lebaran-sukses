import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Paket Lebaran</h1>
          <p className="text-slate-400 mt-2">Sukses Mandiri</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Daftar Akun</h2>
          <form onSubmit={(e) => { e.preventDefault(); alert('Demo mode'); }}>
            <div className="mb-4">
              <label className="block text-slate-300 text-sm font-medium mb-2">Nama Lengkap</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white/10 transition-all"
              />
            </div>
            <div className="mb-4">
              <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white/10 transition-all"
              />
            </div>
            <div className="mb-6">
              <label className="block text-slate-300 text-sm font-medium mb-2">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white/10 transition-all"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
            >
              Daftar Sekarang
            </button>
          </form>
          <p className="text-center text-slate-400 mt-6 text-sm">
            Sudah punya akun? <Link to="/login" className="text-amber-400 hover:text-amber-300 font-medium">Masuk</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;