"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, AtSign, Eye, EyeOff, Facebook, Lock } from 'lucide-react';
import Logo from "../../components/header/logo/Logo";
import { useRouter } from "next/navigation";

import {auth, googleProvider, facebookProvider} from '../../firebase/auth';
import { createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, "users", user.email), {
        enabled: true,
        isAdministrator: false,
        setList: false,
        role: "",
        status: "pending",
        username: user.displayName,
        userid: user.email,
      });
      router.push("/");
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if the user already exists in Firestore
      const userDocRef = doc(db, "users", user.email);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          enabled: true,
          isAdministrator: false,
          setList: false,
          role: "",
          status: "pending",
          username: user.displayName,
          userid: user.email,
        });
      }
      router.push("/");
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignUp = async () => {
    setError('');
    try {
      setIsLoading(true);
      await signInWithPopup(auth, facebookProvider);
      // Redirect or show success message
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="relative h-32 bg-gradient-to-r from-[#0077C8] to-[#0099FF] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/10"></div>
            <h1 className="text-3xl font-bold text-white relative z-10">Create Account</h1>
          </div>
          
          {/* Form */}
          <div className="p-6 sm:p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-lg">
                {error}
              </div>
            )}
            
            {/* Social Sign Up */}
            <div className="flex flex-col gap-3 mb-6">
              <button
                onClick={handleGoogleSignUp}
                disabled={isLoading}
                className="flex items-center justify-center gap-3 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
              >
                <Image 
                  src="/icons/google.png" 
                  alt="Google" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6"
                />
                <span className="font-medium text-gray-700 dark:text-gray-200">Continue with Google</span>
              </button>
              
              {/* <button
                onClick={handleFacebookSignUp}
                disabled={isLoading}
                className="flex items-center justify-center gap-3 w-full p-3 bg-[#1877F2] rounded-xl hover:bg-[#1865D3] transition-colors duration-200"
              >
                <Facebook size={24} className="text-white" />
                <span className="font-medium text-white">Continue with Facebook</span>
              </button> */}
            </div>
            
            {/* Divider */}
            <div className="flex items-center gap-3 my-8">
              <div className="h-px bg-gray-300 dark:bg-gray-600 flex-1"></div>
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">OR</span>
              <div className="h-px bg-gray-300 dark:bg-gray-600 flex-1"></div>
            </div>
            
            {/* Email Form */}
            <form onSubmit={handleEmailSignUp} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <AtSign size={18} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#0077C8] dark:focus:ring-[#3b9ede] focus:border-transparent outline-none transition-all duration-200"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock size={18} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#0077C8] dark:focus:ring-[#3b9ede] focus:border-transparent outline-none transition-all duration-200"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Must be at least 8 characters
                </p>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#0077C8] to-[#0099FF] hover:from-[#0066b0] hover:to-[#0088e0] text-white font-medium rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
            
            {/* Terms */}
            <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
            
            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link href="/signin" className="font-medium text-[#0077C8] dark:text-[#3b9ede] hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        {/* Brand */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center justify-center">
            <Logo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;