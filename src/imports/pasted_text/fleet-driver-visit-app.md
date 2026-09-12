Create a complete, production-ready RTL Persian Fleet & Driver Visit Management Web Application for a distribution company.

This is NOT a generic dashboard template.

The application is used by a Visit Manager / Fleet Manager who manages multiple drivers and needs to monitor their daily visits, real-time GPS locations, planned routes, actual routes, visited customers, current visits, upcoming visits, delays, route deviations and driver performance.

The final result must look like a real enterprise logistics product that could be handed to a development team.

==================================================

CORE PRODUCT OBJECTIVE
==================================================

The manager must be able to answer these questions within 5 seconds:

How many drivers are currently online?
Where is each driver right now?
Which drivers are currently driving?
Which drivers are currently visiting customers?
Which customers have already been visited?
Which customers are still pending?
Which visits are delayed?
Which drivers have deviated from their planned route?
What is the next customer for each driver?
How many visits has each driver completed?
Which drivers need immediate attention?
How is each driver performing today?

The main screen must therefore prioritize:

DRIVERS + LIVE MAP + VISIT STATUS + ALERTS + PERFORMANCE

IMPORTANT:

Entire application must be in Persian / Farsi.
Entire interface must use RTL layout.
All navigation, tables, labels, filters and cards must be aligned correctly for RTL.
Use realistic Persian names and customer names.
Use Persian UI terminology.
Use Persian numerals where appropriate.
Use a Persian-friendly font such as Vazirmatn.
Do not use lorem ipsum.
Do not mix English UI labels into the main interface except for technical values such as GPS, ETA, km/h or Driver ID when appropriate.

Example manager:

علی محمدی
مدیر ویزیت

Example drivers:

احمد رضایی
محمد کریمی
سعید مرادی
حسین احمدی
مهدی یوسفی
رضا شریفی

Create a premium enterprise SaaS interface.

Visual characteristics:

Clean
Professional
Modern
Data-driven
Operational
High information density but highly readable
Minimal decorative elements
Excellent whitespace
Strong visual hierarchy
Rounded cards
Subtle borders
Soft shadows
Modern icons
Clear status colors

Primary style:

Light background
White cards
Dark navy sidebar
Blue primary actions
Green success/online
Orange warning/delay
Red critical
Gray inactive/offline

Avoid:

Excessive gradients
Excessive illustrations
Gaming-style UI
Excessive colors
Huge decorative elements
Unnecessary charts
Overly rounded childish components

Use approximately 10–14px border radius.

Primary frame:

1440 × 900 px

Create the application for desktop first.

Use a consistent grid and spacing system.

Suggested structure:

SIDEBAR | MAIN CONTENT

Sidebar:
approximately 230px

Main content:
remaining width

Main content should use a structured 12-column grid.

Create a dark navy RTL sidebar.

At top:

Company logo
Company name

User profile:

علی محمدی
مدیر ویزیت

Navigation:

🏠 داشبورد

🚚 رانندگان

👥 مشتریان

📍 ویزیت‌ها

🗺️ مسیرها

📊 عملکرد

⚠️ هشدارها

📈 گزارش‌ها

⚙️ تنظیمات

At bottom:

🚪 خروج

The active item should have a clearly visible selected state.

Use consistent icons.

Add notification badge to Alerts if there are active alerts.

Page title:

«پایش ویزیت رانندگان»

Subtitle:

«نمای لحظه‌ای وضعیت، موقعیت و عملکرد رانندگان»

Top-right:

Notification icon
Manager avatar
Manager name

Place a filter toolbar below the header.

Filters:

تاریخ:
«امروز، ۲۴ اردیبهشت ۱۴۰۴»

منطقه:
«همه مناطق»

راننده:
«همه رانندگان»

وضعیت:
«همه وضعیت‌ها»

مسیر:
«همه مسیرها»

Search:

«جستجوی راننده، مشتری یا کد مسیر...»

Buttons:

«اعمال فیلتر»

«پاک کردن»

Filters must look like real interactive controls.

Create 6–7 KPI cards.

Card 1:

کل رانندگان

24

21 آنلاین
3 آفلاین

Card 2:

ویزیت‌های امروز

126

Card 3:

ویزیت تکمیل‌شده

85

67% از برنامه

Card 4:

در حال ویزیت

14

Card 5:

ویزیت عقب‌افتاده

7

Card 6:

مسافت طی‌شده

428 کیلومتر

Card 7:

انحراف از مسیر

3 مورد

Each card must include:

Icon
Label
Large number
Secondary information
Status/trend where relevant

Create a 3-column layout:

LEFT:
Driver List

CENTER:
Large Interactive Live Map

RIGHT:
Selected Driver Detail

The map must occupy the largest visual area.

Panel title:

«رانندگان»

Search field:

«جستجوی راننده...»

Tabs:

همه ۲۴
آنلاین ۲۱
آفلاین ۳
دارای هشدار ۴

Each driver item must contain:

Avatar
Driver name
Online/offline indicator
Current status
Completed visits / total visits
Progress bar
Vehicle icon

Example:

احمد رضایی
🟢 آنلاین
در حال ویزیت
۶ / ۸ ویزیت

محمد کریمی
🟢 آنلاین
در مسیر
۴ / ۷ ویزیت

سعید مرادی
🟢 آنلاین
در حال ویزیت
۵ / ۶ ویزیت

حسین احمدی
🟠 آنلاین
تأخیر در مسیر
۳ / ۸ ویزیت

مهدی یوسفی
⚪ آفلاین
آخرین فعالیت: ۲ ساعت قبل

رضا شریفی
⚪ آفلاین
آخرین فعالیت: ۳ ساعت قبل

Selected driver:

احمد رضایی

must have a prominent selected state.

Bottom button:

«مشاهده همه رانندگان»

Create reusable status badges.

Statuses:

🟢 آنلاین
🔵 در مسیر
🟠 در حال ویزیت
🟡 تأخیر
🔴 مشکل
⚪ آفلاین
⚪ برنامه‌ریزی‌شده
🟢 انجام‌شده

Make statuses visually consistent across the entire application.

Create a large realistic city map.

The map is the central component of the application.

Show:

Multiple driver markers
Customer markers
Planned routes
Actual routes
Current driver location
Visited customers
Upcoming customers
Delayed customers
Route deviation

Selected driver:

احمد رضایی

must have a larger highlighted vehicle marker.

Show several other drivers around the city.

Customer markers should visually indicate:

🟢 Visited
🟠 Pending
🔵 Current visit
⚪ Planned
🔴 Delayed

Add:






Center map

Current location

Layers

Fullscreen

Add toggle:

«نمایش همه رانندگان»

«فقط راننده انتخاب‌شده»

Add live status:

🟢 LIVE

«آخرین بروزرسانی: ۸ ثانیه قبل»

Show two different route styles:

Planned Route:
blue/light dashed line

Actual Route:
solid dark blue line

Make the difference clearly visible.

If a driver deviates:

Show an orange/red deviation segment.

Display alert:

⚠️ انحراف از مسیر

«احمد رضایی ۳۲۰ متر از مسیر برنامه‌ریزی‌شده خارج شده است.»

When the manager clicks a driver marker, open a floating popup.

Example:

احمد رضایی

🟢 آنلاین

در حال ویزیت

موقعیت فعلی:
خیابان ولیعصر

سرعت:
۴۲ km/h

مشتری فعلی:
فروشگاه مهدوی

مشتری بعدی:
بازار بزرگ تهران

ETA:
۱۴:۱۸

پیشرفت:
۶ / ۸ ویزیت

Buttons:

«مشاهده راننده»

«مشاهده مسیر»

Create a persistent right-side driver detail panel.

Header:

احمد رضایی

🟢 آنلاین

در حال ویزیت

Quick actions:

📍 مسیر
📞 تماس
💬 پیام

Driver information:

کد راننده:
DRV-001

شماره موبایل:
0912 123 4567

خودرو:
وانت نیسان

پلاک:
12 ب 345 67

منطقه:
منطقه ۱

Today's statistics:

شروع کار:
۰۸:۳۰

ویزیت:
۶ / ۸

مسافت:
۳۲ کیلومتر

زمان رانندگی:
۲ ساعت و ۱۰ دقیقه

ویزیت عقب‌افتاده:
۱

Route adherence:
۹۴٪

Show progress:

«پیشرفت امروز»

75%

Create a highlighted card:

«ویزیت فعلی»

Customer:

فروشگاه مهدوی

Status:

🟠 در حال ویزیت

زمان ورود:
۱۲:۰۴

مدت ویزیت:
۱۲ دقیقه

زمان استاندارد:
۱۵ دقیقه

فاصله:
۸۰ متر

Button:

«مشاهده جزئیات ویزیت»

Create:

«مشتری بعدی»

بازار بزرگ تهران

زمان برنامه:
۱۴:۳۰

فاصله:
۳.۲ کیلومتر

زمان تقریبی رسیدن:
۱۴:۱۸

Status:

⚪ برنامه‌ریزی‌شده

Button:

«نمایش روی نقشه»

Below the main map create a large section:

Title:

«برنامه ویزیت امروز — احمد رضایی»

Timeline:

۰۸:۳۰
🟢 شروع مسیر

۰۹:۰۰
✅ فروشگاه رفاه
ورود: ۰۹:۰۲
خروج: ۰۹:۱۷
مدت: ۱۵ دقیقه

۱۰:۳۰
✅ هایپرمارکت سینا
ورود: ۱۰:۳۱
خروج: ۱۰:۵۱
مدت: ۲۰ دقیقه

۱۲:۰۰
🟠 فروشگاه مهدوی
در حال ویزیت
ورود: ۱۲:۰۴

۱۴:۳۰
⚪ بازار بزرگ تهران
برنامه‌ریزی‌شده

۱۶:۰۰
⚪ سوپرمارکت ایرانیان
برنامه‌ریزی‌شده

Use a visually strong vertical timeline.

Create a detailed table.

Columns:

ردیف

مشتری

آدرس

زمان برنامه

وضعیت

ورود

خروج

مدت ویزیت

فاصله از مسیر

عملیات

Example rows:

1
فروشگاه رفاه
تهران، خیابان ولیعصر
09:00
انجام شد
09:02
09:17
15 دقیقه
0 متر

2
هایپرمارکت سینا
تهران، خیابان انقلاب
10:30
انجام شد
10:31
10:51
20 دقیقه
50 متر

3
فروشگاه مهدوی
تهران، خیابان آزادی
12:00
در حال ویزیت
12:04
—
12 دقیقه
80 متر

4
بازار بزرگ تهران
تهران، خیابان 15 خرداد
14:30
برنامه‌ریزی‌شده
—
—
—
—

5
سوپرمارکت ایرانیان
تهران، خیابان بهار
16:00
برنامه‌ریزی‌شده
—
—
—
—

Use badges for status.

Customers should have a geofence radius.

Default:

100 meters

When driver enters:

«راننده وارد محدوده مشتری شد»

When visit starts:

«ویزیت آغاز شد»

When driver exits:

«ویزیت تکمیل شد»

Represent geofence visually on map using a subtle circular area around the customer.

Create a dedicated alerts panel.

Title:

«هشدارها»

Example:

🔴 ویزیت عقب‌افتاده

احمد رضایی
فروشگاه X
۱۵ دقیقه تأخیر

🟠 انحراف از مسیر

محمد کریمی
۱.۲ کیلومتر خارج از مسیر

🟡 توقف طولانی

سعید مرادی
۲۸ دقیقه بدون حرکت

🔵 ورود به مشتری

حسین احمدی
وارد محدوده مشتری شد

Each alert must include:

Severity
Driver
Customer if applicable
Time
Description
Action

Create a separate page:

«عملکرد رانندگان»

Top filters:

تاریخ
منطقه
راننده

KPI cards:

میانگین زمان ویزیت

نرخ انجام به‌موقع

پایبندی به مسیر

ویزیت تکمیل‌شده

ویزیت از دست‌رفته

مسافت طی‌شده

Create charts:

تعداد ویزیت‌های تکمیل‌شده
نرخ انجام به‌موقع
میانگین زمان ویزیت
مسافت طی‌شده
Route Adherence

Create driver comparison table:

راننده | ویزیت | تکمیل | به‌موقع | مسافت | پایبندی به مسیر

احمد رضایی | ۸ | ۶ | ۸۳٪ | ۴۲ km | ۹۴٪

محمد کریمی | ۷ | ۷ | ۱۰۰٪ | ۳۸ km | ۹۷٪

سعید مرادی | ۶ | ۵ | ۸۰٪ | ۵۱ km | ۸۸٪

Use visual ranking indicators.

Create dedicated page:

«جزئیات راننده»

Header:

Avatar
احمد رضایی
🟢 آنلاین
DRV-001

Buttons:

تماس
پیام
نمایش مسیر

Sections:

اطلاعات راننده

خودرو

وضعیت فعلی

آمار امروز

نقشه زنده

مسیر برنامه‌ریزی‌شده

مسیر طی‌شده

ویزیت‌های امروز

Timeline

Performance

Activity history

Create:

«جزئیات مشتری»

Example:

فروشگاه رفاه

کد مشتری:
CUS-1042

آدرس

شخص تماس

شماره تماس

راننده اختصاص‌یافته

آخرین ویزیت

ویزیت بعدی

تعداد ویزیت‌ها

میانگین مدت ویزیت

موقعیت GPS

Geofence:
100 متر

Visit history

Map location

When clicking:

«مشاهده جزئیات ویزیت»

open a modal.

Show:

Customer

Driver

Scheduled time

Actual arrival

Actual departure

Visit duration

Distance from planned route

Visit status

GPS arrival location

GPS departure location

Notes

Activity history

If available:

Photo / proof of visit

Buttons:

«بستن»

«مشاهده روی نقشه»

The prototype must demonstrate these interactions.

FLOW 1:

Manager clicks:

احمد رضایی

Result:

Driver selected
Map centers on driver
Actual route highlighted
Driver detail panel updates
Timeline updates
Current visit updates

FLOW 2:

Manager clicks customer marker.

Result:

Customer popup opens
Customer details appear
Assigned driver appears
Visit status appears
Scheduled time appears
Arrival time appears

FLOW 3:

Driver deviates from route.

Result:

Route deviation becomes visible
Alert appears
Driver status changes
Alert Center updates

FLOW 4:

Driver enters customer geofence.

Result:

Customer changes to «در حال ویزیت»
Current Visit card appears
Timeline updates
Manager receives notification

FLOW 5:

Driver leaves geofence.

Result:

Visit changes to «انجام شد»
Arrival/departure times appear
Visit progress updates
Next visit becomes active

FLOW 6:

Driver becomes offline.

Result:

Driver changes to «آفلاین»
Last known location remains visible
Show:
«آخرین بروزرسانی: ۴ دقیقه قبل»

For prototype purposes, simulate live movement.

Create a simple interaction where:

Driver marker position changes.

Show:

🟢 LIVE

«آخرین بروزرسانی: ۸ ثانیه قبل»

When selected, the manager should feel that the map is monitoring a live fleet.

Do not create a complicated animation.

Keep it subtle and realistic.

Create responsive variants for:

1440px desktop
1280px laptop
1024px tablet

Desktop:

Sidebar + Driver List + Map + Detail Panel

Tablet:

Collapsible sidebar

Driver List becomes drawer

Driver Detail becomes drawer

Map remains the primary component

Tables can become horizontally scrollable or card-based.

Create reusable components and variants.

Components:

Sidebar
Header
KPI Card
Driver Card
Driver Avatar
Status Badge
Alert Card
Visit Card
Visit Timeline
Visit Table
Map Marker
Driver Marker
Customer Marker
Driver Popup
Customer Popup
Filter
Search
Dropdown
Tabs
Progress Bar
Button
Modal
Toast
Notification
Empty State
Loading State

Create variants for:

Default
Hover
Selected
Active
Disabled
Loading
Error
Success

Use consistent tokens.

Typography:

Font:
Vazirmatn

Suggested hierarchy:

Page title:
24–28px

Section title:
18–20px

Card title:
14–16px

Body:
13–14px

Caption:
11–12px

KPI:
28–36px

Use strong contrast and accessibility-friendly text.

Spacing:

Use a consistent 4/8px spacing system.

Make the UI accessible.

Ensure:

High text contrast
Clear status indicators
Status is not communicated by color alone
Buttons have clear labels
Tables are readable
Interactive elements have clear hover/selected states
Font sizes are comfortable for a management dashboard

Create states for:

No drivers

«راننده‌ای یافت نشد»

No visits

«ویزیتی برای این بازه وجود ندارد»

Map loading

«در حال دریافت موقعیت رانندگان...»

GPS unavailable

«موقعیت راننده در دسترس نیست»

Connection lost

«ارتباط با دستگاه راننده قطع شده است»

The visual hierarchy must always prioritize:

Critical alerts
Driver current status
Current location
Current visit
Next visit
Visit progress
Route deviation
Historical information

The manager should never have to open multiple pages to understand what is happening right now.

Create these complete screens:

SCREEN 01:
«داشبورد پایش ویزیت رانندگان»

SCREEN 02:
«لیست و مدیریت رانندگان»

SCREEN 03:
«جزئیات راننده»

SCREEN 04:
«ویزیت‌های امروز»

SCREEN 05:
«جزئیات ویزیت»

SCREEN 06:
«لیست مشتریان»

SCREEN 07:
«جزئیات مشتری»

SCREEN 08:
«عملکرد رانندگان»

SCREEN 09:
«هشدارها»

SCREEN 10:
«گزارش‌ها»

All screens must share the same design system and navigation.

This product should feel like a real Fleet + Field Visit Management System, not a simple delivery tracking page.

The most important screen is the main dashboard.

The main dashboard must visually communicate:

DRIVERS
↓
LIVE LOCATION
↓
CURRENT ROUTE
↓
CUSTOMERS
↓
VISITS
↓
CURRENT VISIT
↓
NEXT VISIT
↓
ALERTS
↓
PERFORMANCE

The manager should be able to select any driver and immediately understand:

where they are
what they are doing
where they have been
which customers they visited
how long they stayed
where they are going next
whether they are late
whether they deviated from the route
how much of their daily plan is completed

Make the final result polished, realistic, highly usable, visually consistent, and suitable for presentation to senior management and eventual implementation by a professional software development team.

Do not create a generic template.

Create a cohesive, connected, production-ready product experience.