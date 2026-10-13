"use client";

import React, { useState, useCallback } from "react";
import { STATIC_STUDENT_LEVELS } from "@/lib/data";
import "./StudentRegisterPage.css";

/* ── Form types ───────────────────────────────────────────────────────────── */
interface FormState {
  name: string;
  phone: string;
  nrc: string;
  level: string;
  majors: string[];
  address: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  nrc?: string;
  level?: string;
  majors?: string;
  address?: string;
}

type SubmitStatus = "idle" | "submitting" | "success";

const initialForm: FormState = {
  name: "",
  phone: "",
  nrc: "",
  level: "",
  majors: [],
  address: "",
};

/* ── Validators ───────────────────────────────────────────────────────────── */
const validate = (f: FormState): FormErrors => {
  const e: FormErrors = {};

  if (!f.name.trim()) {
    e.name = "Please fill your name";
  } else if (!/^[a-zA-Z]{1,}((?: [a-zA-Z]+){1,})*$/.test(f.name.trim())) {
    e.name = "Please fill valid name";
  }

  if (!f.phone.trim()) {
    e.phone = "Please provide your phone";
  } else if (!/^(09|\+?950?9|\+?95950?9)\d{7,9}$/.test(f.phone.trim())) {
    e.phone = "Please provide valid phone";
  }

  if (!f.nrc.trim()) e.nrc = "Please fill NRC";
  if (!f.level) e.level = "Please select level";
  if (f.majors.length === 0) e.majors = "Please select at least one major";
  if (!f.address.trim()) e.address = "Please fill your address";

  return e;
};

/* ── StudentRegisterPage (static demo: no backend) ────────────────────────── */
export default function StudentRegisterPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const majorsByLevel = React.useMemo(() => {
    const map: Record<string, string[]> = {};
    STATIC_STUDENT_LEVELS.forEach((l) => {
      map[l.name] = l.majors ?? [];
    });
    return map;
  }, []);

  const availableMajors = form.level ? majorsByLevel[form.level] || [] : [];

  const updateForm = useCallback((patch: Partial<FormState>) => {
    setForm((prev) => {
      const next = { ...prev, ...patch };
      // when level changes, reset majors
      if ("level" in patch && patch.level !== prev.level) {
        next.majors = [];
      }
      return next;
    });
  }, []);

  const handleChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      updateForm({ [field]: value } as Partial<FormState>);
      if (touched[field]) {
        setErrors(validate({ ...form, [field]: value } as FormState));
      }
    };

  const handleBlur = (field: keyof FormState) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(form));
  };

  const toggleMajor = (major: string) => {
    const nextMajors = form.majors.includes(major)
      ? form.majors.filter((m) => m !== major)
      : [...form.majors, major];
    updateForm({ majors: nextMajors });
    if (touched.majors) {
      setErrors(validate({ ...form, majors: nextMajors }));
    }
  };

  const handleSubmit = () => {
    const allTouched: Record<string, boolean> = {
      name: true,
      phone: true,
      nrc: true,
      level: true,
      majors: true,
      address: true,
    };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Static demo: no backend — simulate a successful registration.
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setForm(initialForm);
      setTouched({});
    }, 600);
  };

  return (
    <>
      <div className="register-page">
        <div className="register-card">
          <div className="register-card-body">
            <h3 className="register-title">Student Registration</h3>

            {status === "success" ? (
              <div className="register-success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h4>Registration successful!</h4>
                <p>Thank you for registering. We will contact you shortly.</p>
              </div>
            ) : (
              <div className="register-form">
                {/* Name + Phone row */}
                <div className="register-row">
                  <div className="register-field">
                    <label className="register-label" htmlFor="r-name">
                      Name <span className="required">*</span>
                    </label>
                    <div className="register-input-wrap">
                      <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <input
                        id="r-name"
                        type="text"
                        className={`register-input${errors.name && touched.name ? " invalid" : ""}`}
                        placeholder="Eg. David"
                        value={form.name}
                        onChange={handleChange("name")}
                        onBlur={handleBlur("name")}
                      />
                    </div>
                    {errors.name && touched.name && (
                      <span className="register-error">{errors.name}</span>
                    )}
                  </div>

                  <div className="register-field">
                    <label className="register-label" htmlFor="r-phone">
                      Phone <span className="required">*</span>
                    </label>
                    <div className="register-input-wrap">
                      <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <input
                        id="r-phone"
                        type="tel"
                        className={`register-input${errors.phone && touched.phone ? " invalid" : ""}`}
                        placeholder="Eg. 091234567"
                        value={form.phone}
                        onChange={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                      />
                    </div>
                    {errors.phone && touched.phone && (
                      <span className="register-error">{errors.phone}</span>
                    )}
                  </div>
                </div>

                {/* NRC */}
                <div className="register-field">
                  <label className="register-label" htmlFor="r-nrc">
                    NRC <span className="required">*</span>
                  </label>
                  <div className="register-input-wrap">
                    <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3 3 0 01-3 3m5-3a3 3 0 013 3m-5 0v1"
                      />
                    </svg>
                    <input
                      id="r-nrc"
                      type="text"
                      className={`register-input${errors.nrc && touched.nrc ? " invalid" : ""}`}
                      placeholder="e.g. 12/KaMaYa(N)123456"
                      value={form.nrc}
                      onChange={handleChange("nrc")}
                      onBlur={handleBlur("nrc")}
                    />
                  </div>
                  {errors.nrc && touched.nrc && <span className="register-error">{errors.nrc}</span>}
                </div>

                {/* Level */}
                <div className="register-field">
                  <label className="register-label" htmlFor="r-level">
                    Level <span className="required">*</span>
                  </label>
                  <div className="register-input-wrap">
                    <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z"
                      />
                    </svg>
                    <select
                      id="r-level"
                      className={`register-input register-select${errors.level && touched.level ? " invalid" : ""}`}
                      value={form.level}
                      onChange={handleChange("level")}
                      onBlur={handleBlur("level")}
                    >
                      <option value="">Select Level</option>
                      {STATIC_STUDENT_LEVELS.map((l) => (
                        <option key={l.name} value={l.name}>
                          {l.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.level && touched.level && (
                    <span className="register-error">{errors.level}</span>
                  )}
                </div>

                {/* Major checkboxes */}
                {availableMajors.length > 0 && (
                  <div className="register-field">
                    <label className="register-label">
                      Major <span className="required">*</span>
                    </label>
                    <div className="register-majors">
                      {availableMajors.map((major) => (
                        <label key={major} className="register-major-pill">
                          <input
                            type="checkbox"
                            checked={form.majors.includes(major)}
                            onChange={() => toggleMajor(major)}
                            onBlur={handleBlur("majors")}
                          />
                          <span>{major}</span>
                        </label>
                      ))}
                    </div>
                    {errors.majors && touched.majors && (
                      <span className="register-error">{errors.majors}</span>
                    )}
                  </div>
                )}

                {/* Address */}
                <div className="register-field">
                  <label className="register-label" htmlFor="r-address">
                    Address <span className="required">*</span>
                  </label>
                  <div className="register-input-wrap">
                    <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <input
                      id="r-address"
                      type="text"
                      className={`register-input${errors.address && touched.address ? " invalid" : ""}`}
                      placeholder="Eg. Kamayut, Yangon"
                      value={form.address}
                      onChange={handleChange("address")}
                      onBlur={handleBlur("address")}
                    />
                  </div>
                  {errors.address && touched.address && (
                    <span className="register-error">{errors.address}</span>
                  )}
                </div>

                <div className="register-submit-row">
                  <button
                    className="register-btn"
                    onClick={handleSubmit}
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? (
                      <>
                        <div className="btn-spinner" />
                        Registering…
                      </>
                    ) : (
                      <>
                        <svg
                          className="btn-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: 20, height: 20 }}
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        Register
                      </>
                    )}
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
