/**
 * Data-validation utilities for the Ikon pass dataset.
 *
 * Call validateResorts() and validateBlackoutSchedules() at build time or
 * in tests to catch malformed entries before they reach the UI.
 */

import type { Resort, BlackoutSchedule, ResortAccess, AccessType } from "./types";

// ---------------------------------------------------------------------------
// ResortAccess
// ---------------------------------------------------------------------------

const VALID_ACCESS_TYPES: AccessType[] = ["unlimited", "limited-days", "excluded", "bonus"];

export interface ValidationError {
  id: string;
  field: string;
  message: string;
}

function validateAccess(
  resortId: string,
  tier: "base" | "full",
  access: ResortAccess
): ValidationError[] {
  const errs: ValidationError[] = [];
  const prefix = `${resortId}.${tier}`;

  if (!VALID_ACCESS_TYPES.includes(access.type)) {
    errs.push({ id: resortId, field: `${prefix}.type`, message: `Unknown access type: "${access.type}"` });
  }

  if (access.type === "unlimited" && access.days !== null) {
    errs.push({ id: resortId, field: `${prefix}.days`, message: 'days must be null when type is "unlimited"' });
  }

  if ((access.type === "limited-days" || access.type === "bonus") && (access.days === null || access.days < 1)) {
    errs.push({ id: resortId, field: `${prefix}.days`, message: `days must be a positive integer for type "${access.type}"` });
  }

  if (access.type === "excluded" && access.hasBlackouts) {
    errs.push({ id: resortId, field: `${prefix}.hasBlackouts`, message: 'hasBlackouts must be false when type is "excluded"' });
  }

  return errs;
}

// ---------------------------------------------------------------------------
// Resort
// ---------------------------------------------------------------------------

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const REQUIRED_FIELDS: (keyof Resort)[] = ["id", "name", "state", "country", "base", "full", "tags"];

function validateResort(resort: Resort): ValidationError[] {
  const errs: ValidationError[] = [];
  const { id } = resort;

  for (const field of REQUIRED_FIELDS) {
    if (resort[field] === undefined || resort[field] === null || resort[field] === "") {
      errs.push({ id, field: String(field), message: "Required field is missing or empty" });
    }
  }

  if (typeof resort.id !== "string" || !/^[a-z0-9-]+$/.test(resort.id)) {
    errs.push({ id, field: "id", message: "id must be kebab-case" });
  }

  if (!Array.isArray(resort.tags)) {
    errs.push({ id, field: "tags", message: "tags must be an array" });
  }

  // Bonus tier is only valid on the full pass
  if (resort.base.type === "bonus") {
    errs.push({ id, field: "base.type", message: '"bonus" is a full-pass-only tier; base must use "excluded" for non-eligible resorts' });
  }

  errs.push(...validateAccess(id, "base", resort.base));
  errs.push(...validateAccess(id, "full", resort.full));

  return errs;
}

/** Validate the entire resort list and throw if any errors are found. */
export function validateResorts(resorts: Resort[]): void {
  const ids = new Set<string>();
  const allErrors: ValidationError[] = [];

  for (const resort of resorts) {
    if (ids.has(resort.id)) {
      allErrors.push({ id: resort.id, field: "id", message: "Duplicate resort id" });
    }
    ids.add(resort.id);
    allErrors.push(...validateResort(resort));
  }

  if (allErrors.length > 0) {
    const lines = allErrors.map((e) => `  [${e.id}] ${e.field}: ${e.message}`).join("\n");
    throw new Error(`Resort data validation failed:\n${lines}`);
  }
}

// ---------------------------------------------------------------------------
// BlackoutSchedule
// ---------------------------------------------------------------------------

function validateWindow(scheduleId: string, idx: number, w: BlackoutSchedule["windows"][number]): ValidationError[] {
  const errs: ValidationError[] = [];
  const prefix = `blackout[${scheduleId}].windows[${idx}]`;

  if (!ISO_DATE.test(w.start)) {
    errs.push({ id: scheduleId, field: `${prefix}.start`, message: `"${w.start}" is not a valid YYYY-MM-DD date` });
  }
  if (!ISO_DATE.test(w.end)) {
    errs.push({ id: scheduleId, field: `${prefix}.end`, message: `"${w.end}" is not a valid YYYY-MM-DD date` });
  }
  if (ISO_DATE.test(w.start) && ISO_DATE.test(w.end) && w.start > w.end) {
    errs.push({ id: scheduleId, field: `${prefix}`, message: `start (${w.start}) is after end (${w.end})` });
  }
  if (!w.label || w.label.trim() === "") {
    errs.push({ id: scheduleId, field: `${prefix}.label`, message: "label is required" });
  }

  return errs;
}

/** Validate blackout schedules and throw if any errors are found. */
export function validateBlackoutSchedules(schedules: BlackoutSchedule[]): void {
  const allErrors: ValidationError[] = [];

  for (const s of schedules) {
    const scheduleId = `${s.season}/${s.passTier}`;
    if (!s.season || !s.passTier) {
      allErrors.push({ id: scheduleId, field: "season/passTier", message: "season and passTier are required" });
    }
    s.windows.forEach((w, i) => {
      allErrors.push(...validateWindow(scheduleId, i, w));
    });
  }

  if (allErrors.length > 0) {
    const lines = allErrors.map((e) => `  [${e.id}] ${e.field}: ${e.message}`).join("\n");
    throw new Error(`Blackout schedule validation failed:\n${lines}`);
  }
}

/** Run all validations. Call this once at app startup or in tests. */
export function validateAll(resorts: Resort[], schedules: BlackoutSchedule[]): void {
  validateResorts(resorts);
  validateBlackoutSchedules(schedules);
}
