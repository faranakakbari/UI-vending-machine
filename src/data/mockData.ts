export type DriverStatus = "online" | "driving" | "visiting" | "delayed" | "offline" | "problem";
export type VisitStatus = "completed" | "visiting" | "planned" | "delayed" | "missed";

export interface Driver {
  id: string;
  name: string;
  code: string;
  phone: string;
  vehicle: string;
  plate: string;
  zone: string;
  status: DriverStatus;
  lat: number;
  lng: number;
  speed: number;
  address: string;
  totalVisits: number;
  completedVisits: number;
  distanceKm: number;
  startTime: string;
  drivingTime: string;
  routeAdherence: number;
  delayedVisits: number;
  lastUpdate: string;
  avatar: string;
}

export interface Customer {
  id: string;
  name: string;
  code: string;
  address: string;
  contact: string;
  phone: string;
  zone: string;
  lat: number;
  lng: number;
  geofenceRadius: number;
  assignedDriver: string;
  lastVisit: string;
  nextVisit: string;
  totalVisits: number;
  avgDuration: number;
}

export interface Visit {
  id: string;
  driverId: string;
  customerId: string;
  customerName: string;
  customerAddress: string;
  scheduledTime: string;
  arrivalTime: string | null;
  departureTime: string | null;
  duration: number | null;
  status: VisitStatus;
  distanceFromRoute: number | null;
  notes: string;
  lat: number;
  lng: number;
  order: number;
}

export interface Alert {
  id: string;
  type: "delayed" | "deviation" | "long_stop" | "geofence" | "offline";
  severity: "critical" | "warning" | "info";
  driverName: string;
  driverId: string;
  customerName?: string;
  time: string;
  description: string;
  read: boolean;
}

export const drivers: Driver[] = [
  {
    id: "drv-001",
    name: "احمد رضایی",
    code: "DRV-001",
    phone: "0912 123 4567",
    vehicle: "وانت نیسان",
    plate: "12 ب 345 67",
    zone: "منطقه ۱",
    status: "visiting",
    lat: 35.715,
    lng: 51.405,
    speed: 0,
    address: "خیابان ولیعصر",
    totalVisits: 8,
    completedVisits: 6,
    distanceKm: 32,
    startTime: "۰۸:۳۰",
    drivingTime: "۲ ساعت و ۱۰ دقیقه",
    routeAdherence: 94,
    delayedVisits: 1,
    lastUpdate: "۸ ثانیه قبل",
    avatar: "ا",
  },
  {
    id: "drv-002",
    name: "محمد کریمی",
    code: "DRV-002",
    phone: "0912 234 5678",
    vehicle: "وانت تویوتا",
    plate: "45 د 678 12",
    zone: "منطقه ۲",
    status: "driving",
    lat: 35.695,
    lng: 51.385,
    speed: 48,
    address: "خیابان انقلاب",
    totalVisits: 7,
    completedVisits: 7,
    distanceKm: 38,
    startTime: "۰۸:۰۰",
    drivingTime: "۳ ساعت",
    routeAdherence: 97,
    delayedVisits: 0,
    lastUpdate: "۱۲ ثانیه قبل",
    avatar: "م",
  },
  {
    id: "drv-003",
    name: "سعید مرادی",
    code: "DRV-003",
    phone: "0912 345 6789",
    vehicle: "وانت نیسان",
    plate: "78 ج 901 34",
    zone: "منطقه ۳",
    status: "visiting",
    lat: 35.725,
    lng: 51.425,
    speed: 0,
    address: "خیابان آزادی",
    totalVisits: 6,
    completedVisits: 5,
    distanceKm: 51,
    startTime: "۰۷:۴۵",
    drivingTime: "۲ ساعت و ۴۵ دقیقه",
    routeAdherence: 88,
    delayedVisits: 0,
    lastUpdate: "۵ ثانیه قبل",
    avatar: "س",
  },
  {
    id: "drv-004",
    name: "حسین احمدی",
    code: "DRV-004",
    phone: "0912 456 7890",
    vehicle: "وانت پیکان",
    plate: "23 الف 456 78",
    zone: "منطقه ۴",
    status: "delayed",
    lat: 35.705,
    lng: 51.445,
    speed: 22,
    address: "خیابان رسالت",
    totalVisits: 8,
    completedVisits: 3,
    distanceKm: 18,
    startTime: "۰۹:۰۰",
    drivingTime: "۱ ساعت و ۳۰ دقیقه",
    routeAdherence: 76,
    delayedVisits: 3,
    lastUpdate: "۲۰ ثانیه قبل",
    avatar: "ح",
  },
  {
    id: "drv-005",
    name: "مهدی یوسفی",
    code: "DRV-005",
    phone: "0912 567 8901",
    vehicle: "وانت نیسان",
    plate: "56 ب 789 01",
    zone: "منطقه ۵",
    status: "offline",
    lat: 35.68,
    lng: 51.36,
    speed: 0,
    address: "خیابان بهار",
    totalVisits: 5,
    completedVisits: 5,
    distanceKm: 27,
    startTime: "۰۸:۱۵",
    drivingTime: "۱ ساعت و ۵۵ دقیقه",
    routeAdherence: 92,
    delayedVisits: 0,
    lastUpdate: "۲ ساعت قبل",
    avatar: "م",
  },
  {
    id: "drv-006",
    name: "رضا شریفی",
    code: "DRV-006",
    phone: "0912 678 9012",
    vehicle: "وانت تویوتا",
    plate: "89 ج 012 45",
    zone: "منطقه ۱",
    status: "offline",
    lat: 35.74,
    lng: 51.39,
    speed: 0,
    address: "خیابان جمهوری",
    totalVisits: 6,
    completedVisits: 4,
    distanceKm: 22,
    startTime: "۰۸:۴۵",
    drivingTime: "۱ ساعت و ۲۰ دقیقه",
    routeAdherence: 90,
    delayedVisits: 1,
    lastUpdate: "۳ ساعت قبل",
    avatar: "ر",
  },
];

export const customers: Customer[] = [
  { id: "cus-1001", name: "فروشگاه رفاه", code: "CUS-1001", address: "تهران، خیابان ولیعصر، پلاک ۱۲", contact: "آقای نوری", phone: "021-8812345", zone: "منطقه ۱", lat: 35.718, lng: 51.408, geofenceRadius: 100, assignedDriver: "drv-001", lastVisit: "۲۳ اردیبهشت ۱۴۰۴", nextVisit: "۲۵ اردیبهشت ۱۴۰۴", totalVisits: 48, avgDuration: 14 },
  { id: "cus-1002", name: "هایپرمارکت سینا", code: "CUS-1002", address: "تهران، خیابان انقلاب، پلاک ۸۷", contact: "خانم رضایی", phone: "021-6643210", zone: "منطقه ۲", lat: 35.700, lng: 51.390, geofenceRadius: 100, assignedDriver: "drv-001", lastVisit: "۲۳ اردیبهشت ۱۴۰۴", nextVisit: "۲۵ اردیبهشت ۱۴۰۴", totalVisits: 52, avgDuration: 20 },
  { id: "cus-1003", name: "فروشگاه مهدوی", code: "CUS-1003", address: "تهران، خیابان آزادی، پلاک ۳۴", contact: "آقای مهدوی", phone: "021-4412378", zone: "منطقه ۳", lat: 35.715, lng: 51.402, geofenceRadius: 100, assignedDriver: "drv-001", lastVisit: "۲۰ اردیبهشت ۱۴۰۴", nextVisit: "۲۴ اردیبهشت ۱۴۰۴", totalVisits: 36, avgDuration: 15 },
  { id: "cus-1004", name: "بازار بزرگ تهران", code: "CUS-1004", address: "تهران، خیابان ۱۵ خرداد", contact: "آقای تهرانی", phone: "021-5523456", zone: "منطقه ۱", lat: 35.710, lng: 51.415, geofenceRadius: 150, assignedDriver: "drv-001", lastVisit: "۲۲ اردیبهشت ۱۴۰۴", nextVisit: "۲۴ اردیبهشت ۱۴۰۴", totalVisits: 60, avgDuration: 25 },
  { id: "cus-1005", name: "سوپرمارکت ایرانیان", code: "CUS-1005", address: "تهران، خیابان بهار، پلاک ۵۶", contact: "خانم ایرانی", phone: "021-7734567", zone: "منطقه ۵", lat: 35.725, lng: 51.420, geofenceRadius: 100, assignedDriver: "drv-001", lastVisit: "۲۱ اردیبهشت ۱۴۰۴", nextVisit: "۲۴ اردیبهشت ۱۴۰۴", totalVisits: 28, avgDuration: 18 },
  { id: "cus-1006", name: "پاساژ گلستان", code: "CUS-1006", address: "تهران، خیابان رسالت، پلاک ۱۲۳", contact: "آقای گلستانی", phone: "021-3345678", zone: "منطقه ۴", lat: 35.705, lng: 51.440, geofenceRadius: 100, assignedDriver: "drv-004", lastVisit: "۲۲ اردیبهشت ۱۴۰۴", nextVisit: "۲۴ اردیبهشت ۱۴۰۴", totalVisits: 41, avgDuration: 12 },
];

export const visits: Visit[] = [
  { id: "vis-001", driverId: "drv-001", customerId: "cus-1001", customerName: "فروشگاه رفاه", customerAddress: "تهران، خیابان ولیعصر", scheduledTime: "09:00", arrivalTime: "09:02", departureTime: "09:17", duration: 15, status: "completed", distanceFromRoute: 0, notes: "ویزیت موفق", lat: 35.718, lng: 51.408, order: 1 },
  { id: "vis-002", driverId: "drv-001", customerId: "cus-1002", customerName: "هایپرمارکت سینا", customerAddress: "تهران، خیابان انقلاب", scheduledTime: "10:30", arrivalTime: "10:31", departureTime: "10:51", duration: 20, status: "completed", distanceFromRoute: 50, notes: "سفارش بزرگ دریافت شد", lat: 35.700, lng: 51.390, order: 2 },
  { id: "vis-003", driverId: "drv-001", customerId: "cus-1003", customerName: "فروشگاه مهدوی", customerAddress: "تهران، خیابان آزادی", scheduledTime: "12:00", arrivalTime: "12:04", departureTime: null, duration: 12, status: "visiting", distanceFromRoute: 80, notes: "", lat: 35.715, lng: 51.402, order: 3 },
  { id: "vis-004", driverId: "drv-001", customerId: "cus-1004", customerName: "بازار بزرگ تهران", customerAddress: "تهران، خیابان ۱۵ خرداد", scheduledTime: "14:30", arrivalTime: null, departureTime: null, duration: null, status: "planned", distanceFromRoute: null, notes: "", lat: 35.710, lng: 51.415, order: 4 },
  { id: "vis-005", driverId: "drv-001", customerId: "cus-1005", customerName: "سوپرمارکت ایرانیان", customerAddress: "تهران، خیابان بهار", scheduledTime: "16:00", arrivalTime: null, departureTime: null, duration: null, status: "planned", distanceFromRoute: null, notes: "", lat: 35.725, lng: 51.420, order: 5 },
  { id: "vis-006", driverId: "drv-004", customerId: "cus-1006", customerName: "پاساژ گلستان", customerAddress: "تهران، خیابان رسالت", scheduledTime: "11:30", arrivalTime: null, departureTime: null, duration: null, status: "delayed", distanceFromRoute: null, notes: "۱۵ دقیقه تأخیر", lat: 35.705, lng: 51.440, order: 1 },
];

export const alerts: Alert[] = [
  { id: "al-001", type: "delayed", severity: "critical", driverName: "احمد رضایی", driverId: "drv-001", customerName: "فروشگاه مهدوی", time: "۱۲:۱۵", description: "۱۵ دقیقه تأخیر در مسیر برنامه‌ریزی‌شده", read: false },
  { id: "al-002", type: "deviation", severity: "warning", driverName: "محمد کریمی", driverId: "drv-002", time: "۱۱:۴۵", description: "۱.۲ کیلومتر خارج از مسیر برنامه‌ریزی‌شده", read: false },
  { id: "al-003", type: "long_stop", severity: "warning", driverName: "سعید مرادی", driverId: "drv-003", time: "۱۰:۳۰", description: "۲۸ دقیقه بدون حرکت در خیابان آزادی", read: false },
  { id: "al-004", type: "geofence", severity: "info", driverName: "حسین احمدی", driverId: "drv-004", customerName: "پاساژ گلستان", time: "۱۲:۰۸", description: "وارد محدوده مشتری شد", read: true },
  { id: "al-005", type: "deviation", severity: "critical", driverName: "حسین احمدی", driverId: "drv-004", time: "۱۱:۵۵", description: "۳۲۰ متر از مسیر برنامه‌ریزی‌شده خارج شده است", read: false },
];

export const performanceData = {
  drivers: [
    { name: "احمد رضایی", code: "DRV-001", totalVisits: 8, completed: 6, onTime: 83, distanceKm: 42, routeAdherence: 94, rating: 4.2 },
    { name: "محمد کریمی", code: "DRV-002", totalVisits: 7, completed: 7, onTime: 100, distanceKm: 38, routeAdherence: 97, rating: 4.9 },
    { name: "سعید مرادی", code: "DRV-003", totalVisits: 6, completed: 5, onTime: 80, distanceKm: 51, routeAdherence: 88, rating: 4.0 },
    { name: "حسین احمدی", code: "DRV-004", totalVisits: 8, completed: 3, onTime: 50, distanceKm: 18, routeAdherence: 76, rating: 3.1 },
    { name: "مهدی یوسفی", code: "DRV-005", totalVisits: 5, completed: 5, onTime: 100, distanceKm: 27, routeAdherence: 92, rating: 4.7 },
    { name: "رضا شریفی", code: "DRV-006", totalVisits: 6, completed: 4, onTime: 75, distanceKm: 22, routeAdherence: 90, rating: 4.1 },
  ],
};

export const kpiData = {
  totalDrivers: 24,
  onlineDrivers: 21,
  offlineDrivers: 3,
  totalVisits: 126,
  completedVisits: 85,
  completionRate: 67,
  activeVisits: 14,
  delayedVisits: 7,
  totalDistance: 428,
  deviations: 3,
};
