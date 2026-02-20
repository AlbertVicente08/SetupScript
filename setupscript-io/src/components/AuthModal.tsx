"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { X, Mail, Lock, Loader2 } from "lucide-react";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<"login" | "signup">("signup"); // Default to signup for "Get God Mode"

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (mode === "signup") {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (signUpError) throw signUpError;
            } else {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (signInError) throw signInError;
            }
            onSuccess?.();
        } catch (err: any) {
            setError(err.message || "Authentication failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}?checkout=true`,
                },
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message || "Google authentication failed");
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/80 p-4 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="w-full max-w-md overflow-hidden rounded-2xl border border-neon-red/30 bg-[#0a0a0a] shadow-[0_0_40px_rgba(255,26,26,0.15)] relative"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-white/5 p-6">
                            <h2 className="font-orbitron text-xl font-bold text-white">
                                God Mode <span className="text-neon-red">Access</span>
                            </h2>
                            <button
                                onClick={onClose}
                                className="rounded-lg p-2 text-gray-500 hover:bg-white/5 hover:text-white transition-colors"
                                disabled={isLoading}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            {error && (
                                <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                                    {error}
                                </div>
                            )}

                            {/* Google OAuth */}
                            <button
                                onClick={handleGoogleAuth}
                                disabled={isLoading}
                                className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5 text-sm font-medium text-white transition-all hover:bg-white/10 disabled:opacity-50"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Continue with Google
                            </button>

                            <div className="my-6 flex items-center gap-4">
                                <div className="h-px flex-1 bg-white/10" />
                                <span className="text-xs text-gray-500 uppercase tracking-wider">or Email</span>
                                <div className="h-px flex-1 bg-white/10" />
                            </div>

                            {/* Email Form */}
                            <form onSubmit={handleEmailAuth} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs text-gray-400 font-medium ml-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full rounded-xl border border-white/10 bg-[#111] py-3 pl-10 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-neon-red focus:shadow-[0_0_12px_rgba(255,26,26,0.2)] disabled:opacity-50"
                                            placeholder="you@example.com"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs text-gray-400 font-medium ml-1">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full rounded-xl border border-white/10 bg-[#111] py-3 pl-10 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all focus:border-neon-red focus:shadow-[0_0_12px_rgba(255,26,26,0.2)] disabled:opacity-50"
                                            placeholder="••••••••"
                                            disabled={isLoading}
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-neon-red py-3.5 text-sm font-bold text-white shadow-neon-red transition-all hover:bg-red-600 active:scale-[0.98] disabled:opacity-50 disabled:hover:bg-neon-red disabled:active:scale-100"
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>{mode === "signup" ? "Create Account & Check Out" : "Log In & Check Out"}</>
                                    )}
                                </button>
                            </form>

                            {/* Toggle Mode */}
                            <div className="mt-6 text-center text-xs text-gray-500">
                                {mode === "signup" ? (
                                    <>
                                        Already have an account?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setMode("login")}
                                            className="font-semibold text-neon-magenta hover:underline"
                                            disabled={isLoading}
                                        >
                                            Log in
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        Don't have an account?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setMode("signup")}
                                            className="font-semibold text-neon-magenta hover:underline"
                                            disabled={isLoading}
                                        >
                                            Sign up
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        {/* Ambient Background Glow */}
                        <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-neon-magenta/10 blur-[60px]" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
