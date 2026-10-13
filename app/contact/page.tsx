"use client";

import React, { useState } from "react";
import "./ContactPage.css";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

type SubmitStatus = "idle" | "submitting" | "success";

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const validate = (f: FormState): FormErrors => {
    const e: FormErrors = {};
    if (!f.name.trim()) e.name = "Name required!";
    if (!f.email.trim()) e.email = "Email required!";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter valid email!";
    if (!f.phone.trim()) e.phone = "Phone number required!";
    if (!f.message.trim()) e.message = "Message required!";
    return e;
  };

  const handleChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const updated = { ...form, [field]: e.target.value };
      setForm(updated);
      if (touched[field]) setErrors(validate(updated));
    };

  const handleBlur = (field: keyof FormState) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = () => {
    const allTouched = { name: true, email: true, phone: true, message: true };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Static demo: no backend — simulate a successful submission.
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      setTouched({});
    }, 600);
  };

  return (
    <>
      <div className="contact-page" style={{ backgroundImage: "url(/assets/contact.jpg)" }}>
        <div className="contact-card">
          <div className="contact-card-body">
            <h1 className="contact-title">Contact Us</h1>

            {status === "success" ? (
              <div className="contact-success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h4>Message sent!</h4>
                <p>Thank you for reaching out. We&apos;ll get back to you shortly.</p>
                <button className="contact-btn" onClick={() => setStatus("idle")}>
                  Send another
                </button>
              </div>
            ) : (
              <div className="contact-form">
                {/* Name */}
                <div className="contact-field">
                  <label className="contact-label" htmlFor="c-name">
                    Name <span className="required">*</span>
                  </label>
                  <div className="contact-input-wrap">
                    <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <input
                      id="c-name"
                      type="text"
                      className={`contact-input${errors.name && touched.name ? " invalid" : ""}`}
                      placeholder="Eg. David"
                      value={form.name}
                      onChange={handleChange("name")}
                      onBlur={handleBlur("name")}
                    />
                  </div>
                  {errors.name && touched.name && (
                    <span className="contact-error">{errors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div className="contact-field">
                  <label className="contact-label" htmlFor="c-email">
                    Email <span className="required">*</span>
                  </label>
                  <div className="contact-input-wrap">
                    <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    <input
                      id="c-email"
                      type="email"
                      className={`contact-input${errors.email && touched.email ? " invalid" : ""}`}
                      placeholder="Eg. someone@example.com"
                      value={form.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <span className="contact-error">{errors.email}</span>
                  )}
                </div>

                {/* Phone */}
                <div className="contact-field">
                  <label className="contact-label" htmlFor="c-phone">
                    Phone <span className="required">*</span>
                  </label>
                  <div className="contact-input-wrap">
                    <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <input
                      id="c-phone"
                      type="tel"
                      className={`contact-input${errors.phone && touched.phone ? " invalid" : ""}`}
                      placeholder="Eg. 09-123-456-789"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                    />
                  </div>
                  {errors.phone && touched.phone && (
                    <span className="contact-error">{errors.phone}</span>
                  )}
                </div>

                {/* Message */}
                <div className="contact-field">
                  <label className="contact-label" htmlFor="c-message">
                    Message <span className="required">*</span>
                  </label>
                  <div className="contact-input-wrap">
                    <svg
                      className="field-icon textarea-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <textarea
                      id="c-message"
                      className={`contact-input contact-textarea${errors.message && touched.message ? " invalid" : ""}`}
                      placeholder="Your message…"
                      rows={4}
                      value={form.message}
                      onChange={handleChange("message")}
                      onBlur={handleBlur("message")}
                    />
                  </div>
                  {errors.message && touched.message && (
                    <span className="contact-error">{errors.message}</span>
                  )}
                </div>

                <div className="contact-submit-row">
                  <button
                    className="contact-btn"
                    onClick={handleSubmit}
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Sending…" : "Submit"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
