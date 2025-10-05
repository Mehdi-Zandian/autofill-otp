"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  useEffect(() => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          console.log(otp?.code);
          setOtp(otp?.code);
          ac.abort();
        })
        .catch((err) => {
          ac.abort();
          console.error(err);
        });
    }
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-white text-xl font-semibold">OTP Verification</h2>

          <input
            type="text"
            value={otp}
            onChange={handleChange}
            autoComplete="one-time-code"
            className="border-2 border-gray-300 rounded-md p-2"
          />
          <p className="text-white/80 text-sm text-center">
            The OTP will be automatically filled when received via SMS
          </p>
        </div>
      </main>
    </div>
  );
}
