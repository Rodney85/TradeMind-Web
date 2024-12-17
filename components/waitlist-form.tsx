"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";

// Basic email regex for validation
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Common typos in email domains
const COMMON_TYPOS: { [key: string]: string } = {
  'gmial': 'gmail',
  'gmal': 'gmail',
  'hotmal': 'hotmail',
  'yaho': 'yahoo',
};

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const validateEmail = (email: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    
    if (!trimmedEmail) {
      setError("Email is required");
      setSuggestion("");
      return false;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError("Please enter a valid email address");
      setSuggestion("");
      return false;
    }

    // Check for common typos
    const [localPart, domain] = trimmedEmail.split('@');
    const domainPart = domain.split('.')[0];
    
    if (COMMON_TYPOS[domainPart]) {
      const suggestedEmail = `${localPart}@${domain.replace(domainPart, COMMON_TYPOS[domainPart])}`;
      setError("Did you mean to type this email?");
      setSuggestion(suggestedEmail);
      return false;
    }

    setError("");
    setSuggestion("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Handle already subscribed case differently
        if (data.error === 'already_subscribed') {
          toast.info("You're already on the list! 📝", {
            description: "We'll be in touch soon.",
          });
          setEmail("");
          return;
        }
        
        throw new Error(data.message || 'Failed to subscribe');
      }

      // Only show success if we got a subscription ID back
      if (data.data?.subscriptionId) {
        toast.success("Welcome aboard! 🚀", {
          description: "You're on the waitlist. We'll be in touch soon.",
        });
        setEmail("");
      } else {
        throw new Error('Subscription confirmation failed');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to subscribe");
      toast.error("Subscription Failed", {
        description: "Please try again or contact support if the issue persists.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.form 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmit} 
        className="space-y-2"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="w-full">
            <Input
              type="email"
              name="waitlist-email"
              id="waitlist-email"
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value) {
                  validateEmail(e.target.value);
                } else {
                  setError("");
                  setSuggestion("");
                }
              }}
              required
              className={`h-12 w-full text-base bg-white/5 border text-white placeholder:text-white/30 focus:ring-2 transition-all duration-200 ${
                error ? 'border-red-500/50 focus:ring-red-400/20' : 'border-white/10 focus:ring-blue-400/20'
              }`}
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading || !!error} 
            className="h-12 px-8 w-full sm:w-auto whitespace-nowrap text-base bg-gradient-to-r from-blue-400/80 to-purple-400/80 hover:from-blue-400 hover:to-purple-400 text-white/90 hover:text-white transition-all duration-200 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Joining..." : "Join Waitlist"}
          </Button>
        </div>

        {(error || suggestion) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-400"
          >
            {error}
            {suggestion && (
              <button
                type="button"
                onClick={() => {
                  setEmail(suggestion);
                  setError("");
                  setSuggestion("");
                }}
                className="ml-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                Use {suggestion}?
              </button>
            )}
          </motion.div>
        )}
      </motion.form>
    </div>
  );
}