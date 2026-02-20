"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";

export default function AuthIndicator() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    if (!session) return null;

    return (
        <div className="flex items-center gap-3 rounded-lg border border-red-900/30 bg-[#111111] px-3 py-1.5 text-sm transition-all hover:border-neon-red/50">
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-neon-red shadow-[0_0_8px_rgba(255,26,26,0.8)]" />
                <span className="text-gray-300 truncate max-w-[120px] text-xs" title={session.user.email}>
                    {session.user.email}
                </span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-neon-red transition-colors flex items-center gap-1"
                title="Logout"
            >
                <LogOut className="h-3.5 w-3.5" />
            </button>
        </div>
    );
}
