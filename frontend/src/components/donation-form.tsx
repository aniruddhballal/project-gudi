"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";
import type { SiteCopy } from "@/lib/site-content-types";

const suggestedAmounts = [501, 1001, 2001, 5001];

type DonationFormProps = {
  formType: string;
  title: string;
  copy: SiteCopy["pages"]["donationDetail"];
};

export function DonationForm({ formType, title, copy }: DonationFormProps) {
  const [amount, setAmount] = useState(1001);
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="grid gap-5 rounded-[2rem] bg-white p-6 shadow-[0_22px_60px_rgba(71,36,22,0.12)] ring-1 ring-[#eadfd2] sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <input type="hidden" name="type" value={formType} />
      <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9d431f]">{copy.yourOffering}</p>
          <h3 className="display-type mt-2 text-3xl text-[#321c17]">{copy.giveTitle}</h3>
        </div>
        <div className="rounded-full bg-[#fbf2e6] p-3 text-[#9d431f]" aria-hidden="true">
          <LockKeyhole className="h-5 w-5" />
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-stone-700">{copy.chooseAmount}</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {suggestedAmounts.map((suggestedAmount) => (
            <button
              key={suggestedAmount}
              type="button"
              onClick={() => {
                setAmount(suggestedAmount);
                setSubmitted(false);
              }}
              className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${amount === suggestedAmount ? "border-[#9d431f] bg-[#9d431f] text-white shadow-sm" : "border-stone-200 bg-[#fffdf9] text-stone-700 hover:border-[#d9a36d] hover:bg-[#fbf2e6]"}`}
              aria-pressed={amount === suggestedAmount}
            >
              ₹{suggestedAmount.toLocaleString("en-IN")}
            </button>
          ))}
        </div>
        <label className="mt-3 block text-sm font-medium text-stone-700">
          {copy.customAmount}
          <div className="relative mt-2">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-stone-500">₹</span>
            <input
              name="amount"
              type="number"
              min="1"
              value={amount}
              onChange={(event) => {
                setAmount(Number(event.target.value));
                setSubmitted(false);
              }}
              className="w-full rounded-xl border border-stone-300 bg-[#fffdf9] py-3 pl-8 pr-3 text-stone-900 outline-none transition focus:border-[#9d431f] focus:ring-4 focus:ring-[#9d431f]/10"
              aria-label={copy.amountAriaLabel}
            />
          </div>
        </label>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-stone-700">
          {copy.fullName}
          <input name="name" minLength={2} required className="mt-2 w-full rounded-xl border border-stone-300 bg-[#fffdf9] px-3 py-3 outline-none transition focus:border-[#9d431f] focus:ring-4 focus:ring-[#9d431f]/10" placeholder={copy.namePlaceholder} />
        </label>
        <label className="text-sm font-medium text-stone-700">
          {copy.phone}
          <input name="phone" type="tel" inputMode="numeric" pattern="[0-9]{10}" required className="mt-2 w-full rounded-xl border border-stone-300 bg-[#fffdf9] px-3 py-3 outline-none transition focus:border-[#9d431f] focus:ring-4 focus:ring-[#9d431f]/10" placeholder={copy.phonePlaceholder} />
        </label>
      </div>

      <label className="text-sm font-medium text-stone-700">
        {copy.dedication} <span className="font-normal text-stone-400">{copy.optional}</span>
        <input name="dedication" className="mt-2 w-full rounded-xl border border-stone-300 bg-[#fffdf9] px-3 py-3 outline-none transition focus:border-[#9d431f] focus:ring-4 focus:ring-[#9d431f]/10" placeholder={copy.dedicationPlaceholder} />
      </label>

      <button type="submit" className="inline-flex items-center justify-center rounded-xl bg-[#9d431f] px-4 py-3.5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(157,67,31,0.22)] transition hover:-translate-y-0.5 hover:bg-[#7d3218]">
        {copy.continue} <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
      </button>

      {submitted ? (
        <p className="flex items-start gap-2 rounded-xl bg-[#eef7ee] px-3 py-3 text-xs leading-5 text-[#35603b]" role="status">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{copy.thanks} {title}. {copy.backendNote}</span>
        </p>
      ) : (
        <p className="text-center text-xs leading-5 text-stone-500">{copy.secureNote}</p>
      )}
    </form>
  );
}
