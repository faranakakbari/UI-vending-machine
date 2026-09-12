🚨 CRITICAL — COMPLETE REDESIGN REQUIRED

Redesign the existing "برنامه‌ریزی ویزیت" page from the ground up.

DO NOT simply modify the current layout.
DO NOT preserve the current timeline-heavy structure.
DO NOT create another crowded dashboard.

The current Planning page is visually cluttered, has weak boundaries between sections, and makes it difficult for a manager to understand and edit a driver's visit list.

Replace the current Planning experience with a professional:

"DRIVER-CENTRIC VISIT PLANNING & VISIT LIST MANAGEMENT SYSTEM"

The core workflow MUST be:

رانندگان
↓
انتخاب راننده
↓
مشاهده ویزیت‌لیست همان راننده
↓
افزودن / حذف / ویرایش / جابه‌جایی ویزیت‌ها
↓
سیستم بررسی امکان‌پذیری
↓
ذخیره تغییرات
↓
انتشار برنامه

The manager must have full manual control over the visit list while the system acts as an intelligent assistant that validates changes and provides suggestions.

==================================================
1. PRODUCT GOAL
==================================================

This system is used by a Visit Manager / Operations Manager to manage daily visits of multiple drivers.

The manager must be able to:

• View all active drivers
• See each driver's daily visit count
• See driver availability and online/offline status
• Open a specific driver's daily visit list
• See the exact sequence of visits
• Add a customer to a driver's visit list
• Remove a customer from today's visit list
• Edit a visit
• Change visit time
• Change visit duration
• Reorder visits
• Move a visit to another driver
• Move a visit to another date
• Lock a visit
• Add a new driver
• Edit driver information
• Activate/deactivate a driver
• Add a new customer
• Edit customer information
• Activate/deactivate a customer
• Generate an automatic initial schedule
• Manually modify the generated schedule
• See whether changes are feasible
• See warnings and conflicts
• Receive system suggestions
• Save changes
• Review change history
• Publish the final schedule
• View the driver's route on a map
• Track driver location and visit progress when live tracking data is available

The manager should always remain in control.

The system should:

MANAGER DECIDES
SYSTEM VALIDATES
SYSTEM WARNS
SYSTEM SUGGESTS
MANAGER CONFIRMS

==================================================
2. IMPORTANT PRODUCT CONCEPT
==================================================

The primary concept is NOT:

"Complex Gantt Scheduling Dashboard"

The primary concept IS:

"Driver → Daily Visit List → Manual Editing"

The manager should think:

"امروز احمد رضایی چه مشتری‌هایی دارد؟"

Then:

"اگر بخواهم یکی را حذف کنم، اضافه کنم، جابه‌جا کنم یا زمانش را تغییر بدهم، به راحتی می‌توانم."

This should be the central UX principle.

==================================================
3. INFORMATION ARCHITECTURE
==================================================

Create these main modules:

1. داشبورد
2. رانندگان
3. برنامه ویزیت
4. مشتریان
5. مسیرها
6. عملکرد
7. هشدارها
8. تنظیمات

The primary operational module is:

📅 برنامه ویزیت

==================================================
4. SIDEBAR
==================================================

Keep the application fully RTL.

Sidebar:

🏠 داشبورد

🚚 رانندگان

📅 برنامه ویزیت

👥 مشتریان

🗺️ مسیرها

📊 عملکرد

⚠️ هشدارها

⚙️ تنظیمات

Highlight:

📅 برنامه ویزیت

Use a professional dark navy sidebar.

Do not make the sidebar excessively wide.

==================================================
5. PLANNING LANDING PAGE
==================================================

When the manager opens:

"برنامه ویزیت"

DO NOT immediately show a complicated timeline.

First show:

"رانندگان امروز"

The main content should be a clean grid/list of drivers.

Header:

برنامه ویزیت

مدیریت و اصلاح برنامه روزانه رانندگان

Controls:

📅 تاریخ
شنبه ۲۴ مرداد ۱۴۰۵

منطقه
همه مناطق

جستجو
جستجوی راننده یا مشتری...

Main actions:

✨ تولید خودکار برنامه

ذخیره تغییرات

انتشار برنامه

==================================================
6. DRIVER OVERVIEW
==================================================

Show driver cards.

Each driver card should contain only operationally important information.

Example:

----------------------------------------
🚚 احمد رضایی

🟢 آنلاین

وانت 12

8 ویزیت
6 انجام شده
2 باقی مانده

7h 20m برنامه‌ریزی شده

🟢 برنامه قابل اجرا

[مشاهده ویزیت‌لیست]
----------------------------------------

Another example:

----------------------------------------
🚚 سعید مرادی

🟢 آنلاین

وانت 21

10 ویزیت
3 انجام شده
7 باقی مانده

9h 35m برنامه‌ریزی شده

🔴 بیش از ظرفیت

[مشاهده ویزیت‌لیست]
----------------------------------------

Use compact progress indicators.

Do not turn driver cards into huge KPI cards.

==================================================
7. DRIVER FILTERS
==================================================

Above driver cards provide filters:

همه

🟢 آنلاین

⚪ آفلاین

⚠️ دارای هشدار

🟢 برنامه قابل اجرا

🔴 دارای مشکل

Also provide:

منطقه

وضعیت

ظرفیت

==================================================
8. DRIVER DETAIL — MOST IMPORTANT SCREEN
==================================================

When manager clicks:

"مشاهده ویزیت‌لیست"

Open a dedicated driver detail workspace.

This is the MOST IMPORTANT SCREEN of the Planning module.

Header:

← بازگشت به رانندگان

🚚 احمد رضایی

برنامه ویزیت امروز

🟢 آنلاین

Actions:

ویرایش راننده

تعویض راننده

نمایش مسیر روی نقشه

==================================================
9. DRIVER SUMMARY
==================================================

Show a compact summary:

8 / 8 ویزیت

6 انجام شده

2 باقی مانده

7h 20m زمان برنامه

1h 10m زمان سفر

🟢 برنامه قابل اجرا

Capacity:

██████████████████░░

88%

Do not use oversized KPI cards.

Keep the information compact.

==================================================
10. VISIT LIST — PRIMARY COMPONENT
==================================================

The visit list must be the dominant element on the screen.

Use a vertical ordered list.

DO NOT use a large Gantt chart as the primary interface.

Example:

01

🟢 07:30 – 08:00

بیمارستان انصاری

Terminal:
15422210

⏱ 30 دقیقه
🚗 8 دقیقه تا مقصد بعدی

[ویرایش] [جابجایی] [حذف] ⋮


02

🟢 08:10 – 08:40

بیمارستان انصاری 2

Terminal:
15475866

⏱ 30 دقیقه
🚗 5 دقیقه تا مقصد بعدی

[ویرایش] [جابجایی] [حذف] ⋮


03

🟡 09:00 – 09:30

انصاری 3

Terminal:
15446594

⏱ 30 دقیقه

[ویرایش] [جابجایی] [حذف] ⋮

Each visit must have:

• Sequence number
• Drag handle
• Status
• Start time
• End time
• Customer name
• Terminal ID
• Service duration
• Travel time
• Actions

==================================================
11. VISIT STATUS
==================================================

Use clear status states:

🟢 انجام شده

🔵 در حال انجام

🟡 برنامه‌ریزی شده

🟠 تأخیر

🔴 مشکل

⚪ لغو شده

🔒 قفل شده

The status should be visually clear but not overly colorful.

==================================================
12. ADD CUSTOMER TO VISIT LIST
==================================================

Add a highly visible primary button:

"+ افزودن مشتری به ویزیت‌لیست"

When clicked, open a clean modal.

Title:

افزودن مشتری به ویزیت‌لیست

Fields:

مشتری

تاریخ

زمان پیشنهادی

مدت ویزیت

اولویت

یادداشت

After selecting customer show:

نام مشتری

کد مشتری

Terminal ID

Frequency

Working hours

Time window

Service duration

Location

Then calculate:

زمان سفر

زمان ورود

زمان پایان

ظرفیت راننده

Feasibility

Example:

🟢 این مشتری قابل اضافه شدن است

زمان سفر: 12 دقیقه

ظرفیت راننده:

7h 10m / 9h

Buttons:

لغو

افزودن به برنامه

==================================================
13. REMOVE VISIT
==================================================

The manager must be able to remove a visit from the driver's daily schedule.

IMPORTANT:

"حذف از ویزیت‌لیست"

MUST NOT mean:

"حذف مشتری از سیستم"

These are completely different operations.

When manager clicks حذف:

Show confirmation:

حذف از ویزیت‌لیست

آیا می‌خواهید:

بیمارستان آرش

از برنامه امروز احمد رضایی حذف شود؟

If the customer has a mandatory visit:

⚠️ این مشتری امروز در برنامه قرار دارد.

Buttons:

انصراف

حذف از برنامه

After deletion automatically recalculate the schedule.

==================================================
14. EDIT VISIT
==================================================

Allow manager to edit:

Customer

Driver

Date

Start time

End time

Service duration

Priority

Notes

After editing show:

🟢 تغییر قابل اجراست

OR

🟡 این تغییر باعث فشرده شدن برنامه می‌شود.

OR

🔴 این تغییر باعث تداخل با ویزیت بعدی می‌شود.

==================================================
15. REORDER VISITS
==================================================

Every visit must have a drag handle:

☷

Allow manager to reorder visits.

Example:

Before:

01 بیمارستان انصاری
02 انصاری 2
03 بیمارستان آرش
04 گرم آرش

After dragging:

01 بیمارستان آرش
02 بیمارستان انصاری
03 انصاری 2
04 گرم آرش

After reordering automatically recalculate:

• Travel time
• Arrival time
• Departure time
• Total route duration
• Driver workload
• Feasibility

Show:

"برنامه به‌روزرسانی شد"

🟢 برنامه همچنان قابل اجراست

==================================================
16. MOVE VISIT TO ANOTHER DRIVER
==================================================

Allow:

"انتقال به راننده دیگر"

Example:

بیمارستان آرش

احمد رضایی → محمد کریمی

Show before / after:

احمد رضایی

8 → 7 ویزیت

7h 20m → 6h 40m


محمد کریمی

7 → 8 ویزیت

7h 10m → 7h 55m

🟢 قابل اجرا

Button:

انتقال ویزیت

==================================================
17. MOVE VISIT TO ANOTHER DATE
==================================================

Allow:

"انتقال به روز دیگر"

Show calendar.

Before confirming, validate:

• Visit frequency
• Working hours
• Time window
• Driver capacity
• Existing visits
• Travel time

==================================================
18. LOCK VISIT
==================================================

Manager can lock a visit.

Example:

🔒 بیمارستان انصاری

Tooltip:

"این ویزیت توسط مدیر قفل شده است و در تولید مجدد برنامه جابه‌جا نمی‌شود."

Automatic schedule generation MUST respect locked visits.

==================================================
19. DRIVER MANAGEMENT MODULE
==================================================

Create a separate page:

"مدیریت رانندگان"

Header:

مدیریت رانندگان

[+ افزودن راننده]

Table:

نام راننده

وضعیت

شماره تماس

خودرو

پلاک

منطقه

ویزیت امروز

وضعیت برنامه

عملیات

Actions:

ویرایش

مشاهده برنامه

فعال / غیرفعال

تعویض

==================================================
20. ADD DRIVER
==================================================

Modal:

افزودن راننده

Fields:

نام و نام خانوادگی

شماره موبایل

کد راننده

نوع خودرو

پلاک

منطقه

ساعت کاری

وضعیت

Button:

ایجاد راننده

==================================================
21. EDIT DRIVER
==================================================

Allow manager to edit:

Name

Phone

Driver Code

Vehicle

Plate

Region

Working Hours

Status

If driver has active visits and manager tries to deactivate:

Show:

⚠️ این راننده 8 ویزیت فعال دارد.

Options:

انتقال ویزیت‌ها

انصراف

==================================================
22. CUSTOMER MANAGEMENT MODULE
==================================================

Create a separate page:

"مدیریت مشتریان"

Header:

مدیریت مشتریان

[+ افزودن مشتری]

Search and filters:

جستجو

منطقه

Frequency

وضعیت

محدودیت زمانی

Customer table:

نام مشتری

کد مشتری

Terminal ID

Frequency

ساعت کاری

Time Window

Service Time

منطقه

وضعیت

عملیات

==================================================
23. ADD CUSTOMER
==================================================

Modal:

افزودن مشتری

Fields:

نام مشتری

کد مشتری

شماره ترمینال

شماره تماس

آدرس

منطقه

Latitude

Longitude

دفعات مراجعه

ساعت کاری

محدودیت زمانی

حداقل زمان خدمت

حداکثر زمان خدمت

اولویت

Status

Button:

ایجاد مشتری

After creation offer:

"افزودن به برنامه امروز"

==================================================
24. CUSTOMER EDIT
==================================================

Allow manager to edit all operational fields.

Again:

Removing a customer from a visit list

MUST NOT delete the customer from Customer Master Data.

==================================================
25. AUTOMATIC SCHEDULE GENERATION
==================================================

Keep:

✨ تولید خودکار برنامه

But treat this as an INITIAL SCHEDULE GENERATOR.

The manager should be able to manually modify the generated schedule afterward.

The automatic scheduler should consider:

• Customer frequency
• Working hours
• Time windows
• Service duration
• Travel time
• Geographic proximity
• Driver working hours
• Driver capacity
• Priority
• Locked visits
• Buffer time

==================================================
26. HYBRID PLANNING WORKFLOW
==================================================

The product should support:

AUTOMATIC

SYSTEM GENERATES INITIAL PLAN

↓

MANAGER REVIEW

↓

MANAGER EDITS VISITS

↓

SYSTEM VALIDATES

↓

MANAGER ACCEPTS

↓

SAVE

↓

PUBLISH

This hybrid approach is essential.

==================================================
27. FEASIBILITY ENGINE
==================================================

Every manual modification must be automatically validated.

Check:

• Driver working hours
• Customer working hours
• Time window
• Driver capacity
• Travel time
• Service duration
• Visit overlap
• Route duration
• Frequency
• Locked visits

Show clear states:

🟢 قابل اجرا

🟡 نیازمند بررسی

🔴 غیرقابل اجرا

Never silently create an invalid schedule.

==================================================
28. SMART SUGGESTIONS
==================================================

When an edit creates a problem, provide suggestions.

Example:

🔴 برنامه 35 دقیقه بیش از ظرفیت راننده است.

پیشنهاد سیستم:

1. انتقال بیمارستان آرش به محمد کریمی

2. انتقال ویزیت به روز دیگر

3. تغییر ساعت ویزیت

4. تغییر ترتیب ویزیت‌ها

Each suggestion should show expected impact.

Example:

انتقال به محمد کریمی

احمد:
8 → 7 ویزیت

محمد:
7 → 8 ویزیت

🟢 برنامه قابل اجرا

Button:

اعمال پیشنهاد

==================================================
29. MAP VIEW
==================================================

Add:

"نمایش مسیر روی نقشه"

This should be a secondary view, not the primary planning interface.

Map should show:

• Driver current location
• Customer locations
• Planned route
• Actual route
• Completed visits
• Current visit
• Next visit
• Route sequence
• Travel time

Clicking a visit highlights its location on the map.

Clicking a customer highlights its visit.

The map and visit list must remain synchronized.

==================================================
30. LIVE DRIVER TRACKING
==================================================

If real-time GPS data is available, show:

🟢 آنلاین

آخرین موقعیت:
2 دقیقه پیش

Current location

Current visit

Next visit

Progress

Example:

احمد رضایی

🟢 آنلاین

در حال حرکت به:
بیمارستان آرش

ETA:
09:18

Last update:
09:16

Do NOT make tracking the main focus of the Planning page.

Tracking belongs primarily in:

"مسیرها"

or the driver detail map view.

==================================================
31. UNSAVED CHANGES
==================================================

Whenever manager changes the schedule:

Show a persistent but compact status:

🟡 3 تغییر ذخیره نشده

Actions:

بازگردانی

ذخیره تغییرات

انتشار برنامه

If manager tries to leave:

Show confirmation:

⚠️ شما تغییرات ذخیره نشده دارید.

آیا می‌خواهید قبل از خروج ذخیره کنید؟

==================================================
32. CHANGE HISTORY
==================================================

Add:

"تاریخچه تغییرات"

Example:

08:42
علی محمدی

بیمارستان آرش به احمد رضایی اضافه شد.

08:35
علی محمدی

بیمارستان X از احمد رضایی به محمد کریمی منتقل شد.

08:20
سیستم

برنامه خودکار ایجاد شد.

==================================================
33. PUBLISH WORKFLOW
==================================================

When manager clicks:

انتشار برنامه

Show:

خلاصه تغییرات

+ 2 مشتری اضافه شد

− 1 مشتری حذف شد

↔ 1 ویزیت منتقل شد

↕ 2 ویزیت جابه‌جا شد

🔒 1 ویزیت قفل شده

Status:

🟢 برنامه قابل اجرا

Then:

[بازگشت]

[انتشار برنامه]

After publishing:

🟢 منتشر شده

آخرین انتشار:
08:42

==================================================
34. DAILY DATA EXAMPLE
==================================================

Use realistic sample data based on the following operational data.

Customer examples:

بیمارستان انصاری
Frequency: روزانه
Terminal: 15422210
Working Hours: 07:00–16:00
Service Time: 20–30 دقیقه

بیمارستان انصاری 2
Frequency: روزانه
Terminal: 15475866
Working Hours: 07:00–16:00
Service Time: 20–30 دقیقه

انصاری 3
Frequency: روزانه
Terminal: 15446594
Working Hours: 07:00–16:00
Service Time: 20–30 دقیقه

بیمارستان آرش
Frequency: یک روز در میان
Terminal: 15418272
Working Hours: 07:00–16:00
Service Time: 20–30 دقیقه

گرم آرش
Frequency: یک روز در میان
Terminal: 15422211
Working Hours: 07:00–16:00
Service Time: 20–30 دقیقه

درمانگاه خاتم الانبیا
Frequency: یک روز در میان
Terminal: 15475865
Working Hours: 07:00–16:00
Service Time: 20–30 دقیقه

اورژانس بیمارستان بعثت
Frequency: روزانه
Terminal: 15418273
Working Hours: 07:00–16:00
Service Time: 20–30 دقیقه

لابی بیمارستان بعثت
Frequency: روزانه
Terminal: 15447317
Working Hours: 07:00–16:00
Service Time: 20–30 دقیقه

بیمارستان رجایی آزمایشگاه
Frequency: روزانه
Terminal: 15443150
Working Hours: 07:00–16:00
Service Time: 20–30 دقیقه

بیمارستان رجایی طبقه اول
Frequency: روزانه
Terminal: 15418310
Working Hours: 07:00–16:00
Service Time: 20–30 دقیقه

بیمارستان اورژانس بهرامی
Frequency: یک روز در میان
Terminal: 15443173
Working Hours: 07:00–16:00
Service Time: 20–30 دقیقه

بیمارستان درمانگاه بهرامی
Frequency: یک روز در میان
Terminal: 15418276
Working Hours: 07:00–16:00
Service Time: 20–30 دقیقه

اسنپ
Frequency: یک روز در میان
Terminal: 15418278
Working Hours: 07:00–16:00
Service Time: 20–30 دقیقه

درمانگاه قصر فیروزه
Frequency: یک روز در میان
Terminal: 15418304
Working Hours: 07:00–16:00
Service Time: 20–30 دقیقه

Use this data as realistic demo content.

==================================================
35. VISIT LIST ACTION MENU
==================================================

Each visit should have a compact "⋮" menu.

Options:

ویرایش

جابجایی

انتقال به راننده دیگر

انتقال به روز دیگر

قفل کردن

حذف از برنامه

Do not display all actions permanently.

Keep the interface clean.

==================================================
36. VISUAL HIERARCHY
==================================================

The visual hierarchy must be:

1. Page title
2. Date and filters
3. Main actions
4. Driver selection
5. Selected driver's visit list
6. Schedule validation
7. Secondary information

Do NOT prioritize KPI cards over the visit list.

Do NOT make analytics dominate the Planning module.

==================================================
37. VISUAL BOUNDARIES
==================================================

The current design has weak boundaries.

Fix this explicitly.

Use:

• clear section containers
• subtle borders
• consistent padding
• clear headers
• whitespace
• independent scrolling where appropriate

Avoid:

• random floating cards
• excessive shadows
• overlapping elements
• excessive borders
• huge rounded containers
• cramped sections

The selected driver's visit list must have a strong visual container.

==================================================
38. DESIGN SYSTEM
==================================================

Style:

Premium enterprise

Professional

Operational

Modern

Minimal

High information density

But highly organized.

Colors:

Dark navy:
navigation / structural elements

Blue:
primary actions / selected states

Green:
success / feasible / completed

Orange:
warning / delayed

Red:
error / conflict

Gray:
inactive / neutral

Use subtle borders.

Use minimal shadows.

Avoid gradients.

Avoid decorative illustrations.

Use 8–12px corner radius.

==================================================
39. TYPOGRAPHY
==================================================

Use:

Vazirmatn

or another professional Persian RTL font.

Use clear hierarchy:

Page title:
24–28px

Section title:
16–18px

Body:
13–14px

Secondary:
12px

Avoid oversized typography.

==================================================
40. RTL
==================================================

The entire application must be fully RTL.

All layouts, tables, menus, forms and cards must respect Persian RTL conventions.

Numbers and IDs can remain LTR where appropriate.

Terminal IDs must remain readable.

==================================================
41. RESPONSIVE
==================================================

Desktop-first.

At 1440px:

Use full driver overview and driver detail layouts.

At 1280px:

Reduce card widths and spacing.

At 1024px:

Convert secondary panels to drawers.

The visit list must remain the primary workspace.

Map becomes a drawer or secondary view.

==================================================
42. IMPORTANT UX PRINCIPLE
==================================================

The manager must NEVER feel that the system controls the schedule without permission.

The system should not silently move or delete visits.

The manager must explicitly confirm important changes.

Every change should show its operational impact.

Example:

"اگر این مشتری اضافه شود، زمان پایان برنامه از 15:10 به 15:42 تغییر می‌کند."

Then:

🟢 قابل اجرا

or

🔴 غیرقابل اجرا

==================================================
43. FINAL PLANNING EXPERIENCE
==================================================

The final Planning module should work like this:

SCREEN 1:

برنامه ویزیت

↓

رانندگان امروز

↓

Select:

احمد رضایی

↓

SCREEN 2:

احمد رضایی
🟢 آنلاین

8 ویزیت
6 انجام شده
2 باقی مانده

↓

ویزیت‌لیست:

01 بیمارستان انصاری
02 بیمارستان انصاری 2
03 انصاری 3
04 بیمارستان آرش
...

↓

Manager can:

+ Add customer
Edit
Delete
Reorder
Move
Change time
Change driver
Change date
Lock

↓

System validates

↓

🟢 Feasible

↓

Manager saves

↓

Manager publishes

==================================================
44. WHAT NOT TO DO
==================================================

❌ Do NOT preserve the current crowded Planning layout.

❌ Do NOT make a large Gantt chart the main interface.

❌ Do NOT show every driver and every customer simultaneously in one dense screen.

❌ Do NOT mix Driver Management, Customer Management and Visit Editing into one page.

❌ Do NOT use oversized KPI cards.

❌ Do NOT use too many floating cards.

❌ Do NOT make the map the primary planning interface.

❌ Do NOT remove manual manager controls.

❌ Do NOT automatically modify the manager's schedule without confirmation.

==================================================
45. FINAL PRODUCT FEEL
==================================================

The final interface should feel like:

"یک اتاق کنترل حرفه‌ای برای مدیریت ویزیت روزانه رانندگان"

The manager should be able to understand within seconds:

امروز چند راننده فعال هستند؟

هر راننده چند ویزیت دارد؟

کدام راننده مشکل دارد؟

روی یک راننده کلیک کنم، چه مشتری‌هایی دارد؟

ترتیب ویزیت‌ها چیست؟

چطور یک مشتری اضافه کنم؟

چطور یک مشتری را حذف کنم؟

چطور ترتیب را تغییر بدهم؟

چطور مشتری را به راننده دیگری منتقل کنم؟

چطور زمان ویزیت را تغییر بدهم؟

چطور راننده جدید اضافه کنم؟

چطور مشتری جدید اضافه کنم؟

آیا تغییر من برنامه را خراب می‌کند؟

سیستم چه پیشنهادی دارد؟

چطور برنامه را ذخیره کنم؟

چطور برنامه را منتشر کنم؟

The UI must answer these questions clearly and intuitively.

FINAL INSTRUCTION:

Do not make a cosmetic update to the existing Planning page.

REPLACE THE CURRENT PLANNING STRUCTURE WITH THE NEW DRIVER-CENTRIC VISIT LIST MANAGEMENT EXPERIENCE DESCRIBED ABOVE.

The final result must be clean, professional, RTL, enterprise-grade and operationally realistic.