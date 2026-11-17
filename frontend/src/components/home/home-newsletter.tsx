"use client";

import { useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import type { SiteCopy } from "@/lib/site-content-types";

export function HomeNewsletter({ copy }: { copy: SiteCopy["home"] }) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section
      className="home-newsletter"
      aria-labelledby="home-newsletter-title"
    >
      <div className="home-shell home-newsletter-layout">
        <div className="home-newsletter-heading">
          <Mail size={26} strokeWidth={1.2} aria-hidden="true" />
          <div>
            <p className="home-eyebrow">{copy.newsletterEyebrow}</p>
            <h2 id="home-newsletter-title">{copy.newsletterTitle}</h2>
            <p>{copy.newsletterDescription}</p>
          </div>
        </div>
        <div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
            className="home-newsletter-form"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              {copy.newsletterPlaceholder}
            </label>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder={copy.newsletterPlaceholder}
              required
              onChange={() => setSubmitted(false)}
            />
            <button type="submit">
              {copy.newsletterCta}
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </form>
          <p
            className="home-newsletter-note"
            role={submitted ? "status" : undefined}
          >
            {copy.newsletterNote}
          </p>
        </div>
      </div>
    </section>
  );
}
