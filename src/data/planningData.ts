export type VisitStatus = "completed" | "active" | "planned" | "delayed" | "problem" | "cancelled";

export interface PlanVisit {
  id: string;
  customerId: string;
  customerName: string;
  terminalId: string;
  address: string;
  zone: string;
  startTime: string;   // "HH:MM"
  endTime: string;     // "HH:MM"
  duration: number;    // minutes
  travelToNext: number | null; // minutes
  order: number;
  locked: boolean;
  priority: "high" | "normal" | "low";
  notes: string;
  status: VisitStatus;
  frequency: string;
  workingHours: string;
}

export interface PlanDriver {
  id: string;
  name: string;
  avatar: string;
  code: string;
  phone: string;
  vehicle: string;
  plate: string;
  zone: string;
  status: "online" | "offline" | "driving" | "visiting" | "delayed";
  workCapacityMin: number;
  workStart: string;
  visits: PlanVisit[];
}

export interface PlanCustomer {
  id: string;
  name: string;
  code: string;
  terminalId: string;
  phone: string;
  address: string;
  zone: string;
  frequency: string;
  workingHours: string;
  timeWindow: string | null;
  serviceDurationMin: number;
  serviceDurationMax: number;
  priority: "high" | "normal" | "low";
  active: boolean;
  lat: number;
  lng: number;
}

export interface ChangeRecord {
  id: string;
  time: string;
  user: string;
  action: string;
  type: "add" | "transfer" | "remove" | "auto" | "lock" | "edit" | "reorder";
}

function t(h: number, m: number) {
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export const allCustomers: PlanCustomer[] = [
  { id: "c-01", name: "بیمارستان انصاری", code: "CUS-3001", terminalId: "15422210", phone: "021-6612300", address: "تهران، خ. ستارخان", zone: "منطقه ۵", frequency: "روزانه", workingHours: "07:00–16:00", timeWindow: null, serviceDurationMin: 20, serviceDurationMax: 30, priority: "high", active: true, lat: 35.715, lng: 51.390 },
  { id: "c-02", name: "بیمارستان انصاری ۲", code: "CUS-3002", terminalId: "15475866", phone: "021-6612301", address: "تهران، خ. ستارخان", zone: "منطقه ۵", frequency: "روزانه", workingHours: "07:00–16:00", timeWindow: null, serviceDurationMin: 20, serviceDurationMax: 30, priority: "high", active: true, lat: 35.716, lng: 51.391 },
  { id: "c-03", name: "انصاری ۳", code: "CUS-3003", terminalId: "15446594", phone: "021-6612302", address: "تهران، خ. ستارخان", zone: "منطقه ۵", frequency: "روزانه", workingHours: "07:00–16:00", timeWindow: null, serviceDurationMin: 20, serviceDurationMax: 30, priority: "normal", active: true, lat: 35.717, lng: 51.392 },
  { id: "c-04", name: "بیمارستان آرش", code: "CUS-3004", terminalId: "15418272", phone: "021-8812300", address: "تهران، خ. ولیعصر", zone: "منطقه ۳", frequency: "یک روز در میان", workingHours: "07:00–16:00", timeWindow: null, serviceDurationMin: 20, serviceDurationMax: 30, priority: "high", active: true, lat: 35.720, lng: 51.405 },
  { id: "c-05", name: "گرم آرش", code: "CUS-3005", terminalId: "15422211", phone: "021-8812301", address: "تهران، خ. ولیعصر", zone: "منطقه ۳", frequency: "یک روز در میان", workingHours: "07:00–16:00", timeWindow: null, serviceDurationMin: 20, serviceDurationMax: 30, priority: "normal", active: true, lat: 35.720, lng: 51.406 },
  { id: "c-06", name: "درمانگاه خاتم الانبیا", code: "CUS-3006", terminalId: "15475865", phone: "021-7712300", address: "تهران، خ. بهشتی", zone: "منطقه ۳", frequency: "یک روز در میان", workingHours: "07:00–16:00", timeWindow: null, serviceDurationMin: 20, serviceDurationMax: 30, priority: "normal", active: true, lat: 35.713, lng: 51.410 },
  { id: "c-07", name: "اورژانس بیمارستان بعثت", code: "CUS-3007", terminalId: "15418273", phone: "021-5523400", address: "تهران، اتوبان آزادگان", zone: "منطقه ۱۸", frequency: "روزانه", workingHours: "07:00–16:00", timeWindow: null, serviceDurationMin: 20, serviceDurationMax: 30, priority: "high", active: true, lat: 35.700, lng: 51.360 },
  { id: "c-08", name: "لابی بیمارستان بعثت", code: "CUS-3008", terminalId: "15447317", phone: "021-5523401", address: "تهران، اتوبان آزادگان", zone: "منطقه ۱۸", frequency: "روزانه", workingHours: "07:00–16:00", timeWindow: null, serviceDurationMin: 20, serviceDurationMax: 30, priority: "normal", active: true, lat: 35.700, lng: 51.361 },
  { id: "c-09", name: "بیمارستان رجایی آزمایشگاه", code: "CUS-3009", terminalId: "15443150", phone: "021-6612310", address: "تهران، خ. وليعصر", zone: "منطقه ۶", frequency: "روزانه", workingHours: "07:00–16:00", timeWindow: null, serviceDurationMin: 20, serviceDurationMax: 30, priority: "high", active: true, lat: 35.718, lng: 51.400 },
  { id: "c-10", name: "بیمارستان رجایی طبقه اول", code: "CUS-3010", terminalId: "15418310", phone: "021-6612311", address: "تهران، خ. وليعصر", zone: "منطقه ۶", frequency: "روزانه", workingHours: "07:00–16:00", timeWindow: null, serviceDurationMin: 20, serviceDurationMax: 30, priority: "normal", active: true, lat: 35.718, lng: 51.401 },
  { id: "c-11", name: "بیمارستان اورژانس بهرامی", code: "CUS-3011", terminalId: "15443173", phone: "021-4412300", address: "تهران، خ. دماوند", zone: "منطقه ۴", frequency: "یک روز در میان", workingHours: "07:00–16:00", timeWindow: null, serviceDurationMin: 20, serviceDurationMax: 30, priority: "high", active: true, lat: 35.708, lng: 51.445 },
  { id: "c-12", name: "درمانگاه بهرامی", code: "CUS-3012", terminalId: "15418276", phone: "021-4412301", address: "تهران، خ. دماوند", zone: "منطقه ۴", frequency: "یک روز در میان", workingHours: "07:00–16:00", timeWindow: null, serviceDurationMin: 20, serviceDurationMax: 30, priority: "normal", active: true, lat: 35.708, lng: 51.446 },
  { id: "c-13", name: "اسنپ", code: "CUS-3013", terminalId: "15418278", phone: "021-9192300", address: "تهران، خ. آفریقا", zone: "منطقه ۱", frequency: "یک روز در میان", workingHours: "07:00–16:00", timeWindow: null, serviceDurationMin: 20, serviceDurationMax: 30, priority: "normal", active: true, lat: 35.730, lng: 51.405 },
  { id: "c-14", name: "درمانگاه قصر فیروزه", code: "CUS-3014", terminalId: "15418304", phone: "021-3312300", address: "تهران، خ. شریعتی", zone: "منطقه ۴", frequency: "یک روز در میان", workingHours: "07:00–16:00", timeWindow: null, serviceDurationMin: 20, serviceDurationMax: 30, priority: "low", active: true, lat: 35.712, lng: 51.440 },
];

function makeVisit(id: string, cId: string, order: number, h: number, m: number, dur: number, travel: number | null, status: VisitStatus, locked = false): PlanVisit {
  const c = allCustomers.find((x) => x.id === cId)!;
  const totalMin = h * 60 + m;
  const endMin = totalMin + dur;
  return {
    id,
    customerId: cId,
    customerName: c.name,
    terminalId: c.terminalId,
    address: c.address,
    zone: c.zone,
    startTime: t(h, m),
    endTime: t(Math.floor(endMin / 60), endMin % 60),
    duration: dur,
    travelToNext: travel,
    order,
    locked,
    priority: c.priority,
    notes: "",
    status,
    frequency: c.frequency,
    workingHours: c.workingHours,
  };
}

export const initialDrivers: PlanDriver[] = [
  {
    id: "pd-001", name: "احمد رضایی", avatar: "ا", code: "DRV-001", phone: "0912 123 4567",
    vehicle: "وانت نیسان ۱۲", plate: "12 ب 345 67", zone: "منطقه ۵", status: "visiting",
    workCapacityMin: 540, workStart: "07:00",
    visits: [
      makeVisit("v-001", "c-01", 1, 7, 30, 25, 8, "completed"),
      makeVisit("v-002", "c-02", 2, 8, 10, 25, 8, "completed"),
      makeVisit("v-003", "c-03", 3, 8, 50, 25, 12, "completed"),
      makeVisit("v-004", "c-04", 4, 9, 30, 25, 10, "active", true),
      makeVisit("v-005", "c-05", 5, 10, 15, 25, 8, "planned"),
      makeVisit("v-006", "c-06", 6, 11, 5, 25, 15, "planned"),
      makeVisit("v-007", "c-07", 7, 12, 0, 25, 10, "planned"),
      makeVisit("v-008", "c-08", 8, 12, 50, 25, null, "planned"),
    ],
  },
  {
    id: "pd-002", name: "محمد کریمی", avatar: "م", code: "DRV-002", phone: "0912 234 5678",
    vehicle: "وانت تویوتا ۲۱", plate: "45 د 678 12", zone: "منطقه ۶", status: "driving",
    workCapacityMin: 540, workStart: "07:00",
    visits: [
      makeVisit("v-009",  "c-09", 1, 7, 20, 25, 5, "completed"),
      makeVisit("v-010",  "c-10", 2, 7, 55, 25, 10, "completed"),
      makeVisit("v-011",  "c-11", 3, 8, 40, 25, 8, "planned"),
      makeVisit("v-012",  "c-12", 4, 9, 20, 25, 12, "planned"),
      makeVisit("v-013",  "c-13", 5, 10, 10, 25, 8, "planned"),
      makeVisit("v-014",  "c-14", 6, 11, 0, 25, null, "planned"),
    ],
  },
  {
    id: "pd-003", name: "سعید مرادی", avatar: "س", code: "DRV-003", phone: "0912 345 6789",
    vehicle: "وانت نیسان ۲۱", plate: "78 ج 901 34", zone: "منطقه ۱۸", status: "online",
    workCapacityMin: 480, workStart: "07:30",
    visits: [
      makeVisit("v-015",  "c-07", 1, 7, 30, 25, 5, "planned"),
      makeVisit("v-016",  "c-08", 2, 8, 10, 25, 18, "planned"),
      makeVisit("v-017",  "c-01", 3, 9, 0, 25, 10, "planned"),
      makeVisit("v-018",  "c-02", 4, 9, 45, 25, 10, "planned"),
      makeVisit("v-019",  "c-03", 5, 10, 30, 25, 12, "planned"),
      makeVisit("v-020",  "c-04", 6, 11, 20, 25, 8, "planned"),
      makeVisit("v-021",  "c-05", 7, 12, 10, 25, 8, "planned"),
      makeVisit("v-022",  "c-06", 8, 13, 0, 25, 10, "planned"),
      makeVisit("v-023",  "c-11", 9, 14, 0, 25, 8, "planned"),
      makeVisit("v-024",  "c-12", 10, 14, 50, 25, null, "planned"),
    ],
  },
  {
    id: "pd-004", name: "حسین احمدی", avatar: "ح", code: "DRV-004", phone: "0912 456 7890",
    vehicle: "وانت پیکان ۸", plate: "23 الف 456 78", zone: "منطقه ۴", status: "delayed",
    workCapacityMin: 540, workStart: "08:00",
    visits: [
      makeVisit("v-025",  "c-11", 1, 8, 0, 25, 10, "planned"),
      makeVisit("v-026",  "c-12", 2, 8, 45, 25, 12, "planned"),
      makeVisit("v-027",  "c-14", 3, 9, 35, 25, null, "planned"),
    ],
  },
  {
    id: "pd-005", name: "مهدی یوسفی", avatar: "م", code: "DRV-005", phone: "0912 567 8901",
    vehicle: "وانت نیسان ۵", plate: "56 ب 789 01", zone: "منطقه ۱", status: "offline",
    workCapacityMin: 540, workStart: "07:00",
    visits: [],
  },
];

export const initialHistory: ChangeRecord[] = [
  { id: "h-1", time: "۰۸:۲۰", user: "سیستم", action: "برنامه روزانه به صورت خودکار تولید شد.", type: "auto" },
  { id: "h-2", time: "۰۸:۳۵", user: "علی محمدی", action: "بیمارستان آرش در برنامه احمد رضایی قفل شد.", type: "lock" },
  { id: "h-3", time: "۰۸:۴۲", user: "علی محمدی", action: "اورژانس بیمارستان بعثت به احمد رضایی اضافه شد.", type: "add" },
];

// ── Helpers ──────────────────────────────────────────────────────────────

export function calcScheduledMin(visits: PlanVisit[]): number {
  return visits.reduce((s, v) => s + v.duration + (v.travelToNext ?? 0), 0);
}

export function getCapacityPct(driver: PlanDriver): number {
  return Math.round((calcScheduledMin(driver.visits) / driver.workCapacityMin) * 100);
}

export function isFeasible(driver: PlanDriver): boolean {
  return calcScheduledMin(driver.visits) <= driver.workCapacityMin;
}

export function recalcTimes(visits: PlanVisit[], workStart: string): PlanVisit[] {
  const [sh, sm] = workStart.split(":").map(Number);
  let cursor = sh * 60 + sm;
  return visits.map((v, i) => {
    const start = cursor;
    const end = start + v.duration;
    cursor = end + (v.travelToNext ?? 0);
    return {
      ...v,
      order: i + 1,
      startTime: t(Math.floor(start / 60), start % 60),
      endTime: t(Math.floor(end / 60), end % 60),
    };
  });
}

export function minutesToHM(m: number): string {
  const h = Math.floor(m / 60);
  const min = m % 60;
  if (h === 0) return `${min}m`;
  return min === 0 ? `${h}h` : `${h}h ${min}m`;
}

export const priorityLabel: Record<string, string> = { high: "بالا", normal: "عادی", low: "پایین" };
export const frequencyLabel: Record<string, string> = { "روزانه": "روزانه", "یک روز در میان": "یک روز در میان", "weekly": "هفتگی" };
