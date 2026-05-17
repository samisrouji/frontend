import React from "react";
import "./SignInPage.css";

interface SignInPageProps {
  onBack: () => void;
}

export const SignInPage: React.FC<SignInPageProps> = ({ onBack }) => {
  return (
    <main className="sign-in-page">
      <div className="sign-in-top">
        <button className="back-button" onClick={onBack} aria-label="Back to Home">
          ←
        </button>
        <div>
          <h1>Sign In</h1>
          <p className="sign-in-description">Sign in to your eMarket account to continue shopping.</p>
        </div>
      </div>

      <section className="sign-in-card">
        <label>
          Email
          <input type="email" placeholder="you@example.com" />
        </label>

        <label>
          Password
          <input type="password" placeholder="Enter your password" />
        </label>

        <button className="submit-button" type="button">
          Continue
        </button>
      </section>
    </main>
  );
};
