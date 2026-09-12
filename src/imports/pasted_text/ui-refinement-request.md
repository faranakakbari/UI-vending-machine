IMPORTANT:
This is an EDIT / REFINEMENT request for the EXISTING UI.

Do NOT redesign the entire application from scratch.
Do NOT change the existing visual identity, overall layout, navigation structure, typography, spacing system, components, colors, icons, or functionality unless explicitly requested below.

Apply ONLY the changes explicitly listed in this prompt.

Preserve everything else exactly as it currently exists.

The application is a Persian RTL logistics / fleet / visit management dashboard.

All changes must maintain the existing design system and visual consistency.

====================================================
GLOBAL SIDEBAR / HEADER CHANGES
====================================================

1. In the top section of the sidebar:

Current text:
"پخش آریا"

Replace it with:
"شرکت سایه سمن"

2. Remove the text:
"ویز"

that currently appears next to the company name.

The final company identity should simply show:

"شرکت سایه سمن"

3. Remove:
"مدیریت ویزیت"

from the sidebar.

4. There is also a "مدیریت ویزیت" title/name in the upper-left/top area of the application.

Remove that as well.

Do not replace it with another title unless the existing layout requires it.

Keep the rest of the sidebar navigation unchanged.

====================================================
DASHBOARD TAB
====================================================

Apply ONLY the following changes.

1. REMOVE the "فیلتر وضعیت" filter.

Do not replace it with another filter.

2. KPI card:

Current:
"ویزیت عقب‌افتاده"

Replace with:
"ویزیت از دست رفته"

Keep the same KPI card style, position, size and design.

3. REMOVE the search section at the top of the page that allows searching for:

- راننده
- مشتری
- کد مشتری

Remove this search component completely.

Do not replace it with another search field.

4. In the Drivers section, there are status tabs/filters:

"همه / آنلاین / آفلاین / دارای هشدار / ..."

REMOVE only:
"دارای هشدار"

Keep all other existing driver filters exactly as they are.

5. Above the map there are controls:

"نمایش همه رانندگان"
"فقط راننده انتخاب شده"
"مسیر برنامه"
"مسیر طی شده"

REMOVE ALL of these controls from above the map.

Do not add replacement controls.

6. In the driver panel on the left side of the dashboard, there are action icons/buttons:

- مسیر
- پیام
- تماس

REMOVE these three actions.

Keep the driver information itself unchanged.

7. In the driver information section, REMOVE:

"منطقه"

Do not remove other driver information.

8. In the "مشتری بعدی" section:

Current:
"زمان برنامه"

Replace with:
"زمان ورود"

Current:
"ETA"

Replace with:
"زمان تخمینی رسیدن"

Use the full Persian phrase:
"زمان تخمینی رسیدن"

Do NOT use the abbreviation ETA anymore.

9. In the "مشتری بعدی" section:

ACTIVATE / ENABLE the button:
"نمایش روی نقشه"

The button must be visually active and functional in the prototype.

10. Keep the section:
"برنامه ویزیت امروز"

in the lower-left area.

However, REMOVE the separate visit table that currently appears next to it.

Keep "برنامه ویزیت امروز" itself.

11. Inside the map there is a warning:
"انحراف از مسیر"

REMOVE this warning from the map.

12. Because the visit table next to "برنامه ویزیت امروز" has been removed:

Rebalance the existing dashboard layout so that the map becomes significantly larger and clearer.

IMPORTANT:
Do NOT redesign the whole dashboard.

Simply use the freed space from the removed visit table to expand the existing map.

The map should have:
- More width
- More height
- Better visual clarity
- Better visibility of driver locations
- Better visibility of the route

The map should become the primary visual element of the dashboard.

====================================================
DRIVERS TAB
====================================================

1. When clicking:
"+ افزودن راننده"

Open EXACTLY the same driver creation panel/modal/drawer that is currently used in:

"برنامه‌ریزی ویزیت" → "+ افزودن راننده"

Reuse the same component and same fields.

IMPORTANT:
The driver creation experience must be consistent across both pages.

2. In this driver creation panel, REMOVE only:

"منطقه"

Do not remove or modify any other field.

3. In the Drivers table:

REMOVE the column:
"منطقه"

Keep every other existing column unchanged.

4. When clicking:
"جزئیات"

and entering the Driver Details page:

REMOVE:
- منطقه
- نقشه
- نمایش مسیر
- پیام
- تماس

5. Keep:
- آمار امروز
- برنامه ویزیت

6. Any other information currently displayed underneath the driver's name should remain unchanged.

7. Add / preserve a:
"بازگشت"

button so the manager can return to the Drivers page.

Do not remove other existing driver details unless explicitly listed above.

====================================================
CUSTOMERS TAB
====================================================

1. When clicking:
"+ افزودن مشتری"

the customer creation form must become ACTIVE and usable.

The manager must be able to enter customer information.

Do not redesign the customer creation form unless necessary to make it functional.

2. In the Customers table:

Current column:
"جئوفس"

Replace it with:

"میانگین مدت ویزیت"

Use this exact Persian label.

3. REMOVE the entire:
"عملیات"

column.

Do not replace it with another operations column.

Keep all other customer table columns unchanged.

====================================================
VISITS TAB
====================================================

Apply only these changes:

1. REMOVE the KPI card:
"برنامه‌ریزی شده"

2. In the "وضعیت" column:

REMOVE the status:
"برنامه‌ریزی شده"

Keep the other visit statuses unchanged.

3. REMOVE the column:
"زمان برنامه"

4. REMOVE the column:
"عملیات"

Do not change other columns.

Do not add replacement columns.

====================================================
ALERTS TAB
====================================================

There is currently an action/button next to:
"خواندم"

with the label:
"اقدام"

REMOVE the "اقدام" option/button.

Keep:
"خواندم"

Do not change the rest of the Alerts page.

====================================================
REPORTS TAB
====================================================

1. REMOVE the filter:
"همه مناطق"

Do not replace it with another region filter.

2. KPI card:

Current:
"عقب افتاده"

Replace with:
"از دست رفته"

Keep the same KPI card style and position.

3. Section:
"روند ویزیت‌ها"

currently shows:
"هفته جاری"

Redesign ONLY this section into a clear weekly chart.

The chart must show the six working days:

شنبه
یکشنبه
دوشنبه
سه‌شنبه
چهارشنبه
پنجشنبه

Use a professional enterprise dashboard chart.

Prefer a clean line chart or column chart depending on which better matches the existing dashboard visual language.

The X-axis must explicitly show:

شنبه | یکشنبه | دوشنبه | سه‌شنبه | چهارشنبه | پنجشنبه

The chart should visualize the visit trend across the current week.

Do not change other report sections.

====================================================
VISIT PLANNING TAB — IMPORTANT
====================================================

The "برنامه‌ریزی ویزیت" page must continue to use the previously defined professional weekly planning concept.

Do NOT revert it to a simple daily visit list.

The page should remain a weekly planning workspace where the manager can:

- View the system's "پیشنهاد برنامه"
- View Saturday through Thursday
- View each driver's schedule
- Open a specific driver's schedule
- Open a specific day
- View the detailed visit list
- Add customers
- Remove customers
- Edit visits
- Move visits between days
- Move visits between drivers
- Drag & drop visits
- Define daily visits
- Define every-other-day visits
- Define specific-day visits
- Define weekly recurrence
- Create one-time exceptions
- Choose whether a change applies only to one day or from that date onward
- Lock visits
- Change priorities
- Use bulk actions
- Copy schedules
- Swap visits
- Detect scheduling conflicts
- Show capacity problems
- Show smart suggestions
- Save changes
- Undo changes
- Review changes
- Publish the final schedule

The main workflow remains:

"پیشنهاد برنامه"
→
"بررسی"
→
"ویرایش"
→
"اعتبارسنجی"
→
"ذخیره تغییرات"
→
"انتشار برنامه"

IMPORTANT:
Do NOT use the phrase:
"تولید خودکار"

The correct term is:
"پیشنهاد برنامه"

====================================================
WEEKLY VISIT PLANNING STRUCTURE
====================================================

The default planning view should remain:

"نمای هفتگی"

with drivers as rows and days as columns.

Days:

شنبه
یکشنبه
دوشنبه
سه‌شنبه
چهارشنبه
پنجشنبه

Each driver/day cell should show:

- Number of visits
- Estimated schedule duration
- Capacity status
- Warning if necessary

Example:

احمد رضایی
شنبه

8 ویزیت
5 ساعت و 20 دقیقه
🟢 قابل اجرا

Use statuses:

🟢 قابل اجرا
🟡 فشرده
🟠 نیازمند بررسی
🔴 غیرقابل اجرا

====================================================
DRIVER VISIT EDITING
====================================================

When the manager selects a driver and a day, show the detailed visit list.

Example:

احمد رضایی
شنبه ۱۷ مرداد

8 ویزیت
5 ساعت و 20 دقیقه
42 کیلومتر

[+ افزودن مشتری]

Each visit should support:

- Drag & drop
- Edit
- Delete
- Move
- Transfer to another driver
- Move to another day
- Lock
- View customer information

====================================================
RECURRENCE
====================================================

When adding or editing a visit, allow:

"الگوی مراجعه"

Options:

○ فقط این روز
○ روزانه
○ یک روز در میان
○ هفتگی
○ روزهای مشخص

For specific days:

☑ شنبه
☐ یکشنبه
☑ دوشنبه
☐ سه‌شنبه
☑ چهارشنبه
☐ پنجشنبه

====================================================
CHANGE SCOPE
====================================================

When changing a recurring visit, allow the manager to choose:

● فقط این روز
○ تمام روزهای این هفته
○ از این تاریخ به بعد
○ تا تاریخ مشخص

This must be visually clear.

Do not accidentally change the recurring rule when the manager intends to change only one visit.

====================================================
EXCEPTIONS
====================================================

Support one-time exceptions.

Example:

Recurring rule:
بیمارستان آرش
احمد رضایی
یک روز در میان

One-time exception:

پنجشنبه
🚫 لغو این نوبت

The recurring rule remains unchanged.

====================================================
VALIDATION
====================================================

Whenever the manager modifies the plan, recalculate and validate:

- Service time
- Travel time
- Arrival time
- Departure time
- Total route duration
- Working hours
- Time windows
- Driver capacity

If a problem occurs, clearly show:

🔴 غیرقابل اجرا

or:

🟠 نیازمند بررسی

Do not allow critical conflicts to be hidden.

====================================================
SMART SUGGESTIONS
====================================================

When a manager's edit creates a scheduling problem, show suggestions.

Example:

"افزودن بیمارستان آرش باعث 25 دقیقه اضافه‌کاری می‌شود."

Suggested options:

- تغییر ترتیب ویزیت‌ها
- انتقال به راننده دیگر
- انتقال به روز دیگر
- ادامه با اضافه‌کاری

====================================================
ADD DRIVER / ADD CUSTOMER
====================================================

The manager must be able to add a driver and customer from the appropriate pages.

For driver creation:
Reuse the existing driver creation component from Visit Planning.

For customer creation:
Make the existing customer creation form functional.

Do not create completely different forms for the same entity.

====================================================
DESIGN CONSISTENCY
====================================================

Maintain the existing application design system.

Use:

- RTL layout
- Existing Persian typography
- Existing color system
- Existing cards
- Existing buttons
- Existing spacing
- Existing borders
- Existing icons
- Existing navigation
- Existing component styles

Do not introduce a new unrelated visual style.

The result should feel like the same application, only more polished and operationally useful.

====================================================
STRICT "DO NOT CHANGE" RULE
====================================================

DO NOT modify anything that is not explicitly requested in this prompt.

Do NOT:

- Redesign unrelated pages
- Rename unrelated labels
- Change sidebar navigation items other than specified
- Change colors unnecessarily
- Change fonts unnecessarily
- Change existing page structure unnecessarily
- Add new filters that were not requested
- Add new KPIs that were not requested
- Remove functionality that was not explicitly mentioned
- Replace existing components with unrelated components
- Change business logic outside the specified requirements

The goal is to make precise UI/UX improvements while preserving the existing application.

====================================================
FINAL ACCEPTANCE CHECKLIST
====================================================

Before finishing, verify that:

GLOBAL:
✓ "پخش آریا" → "شرکت سایه سمن"
✓ "ویز" removed
✓ "مدیریت ویزیت" removed from sidebar
✓ "مدیریت ویزیت" removed from upper-left header

DASHBOARD:
✓ وضعیت filter removed
✓ "ویزیت عقب‌افتاده" → "ویزیت از دست رفته"
✓ Search driver/customer/code removed
✓ "دارای هشدار" removed
✓ Map top controls removed
✓ مسیر / پیام / تماس removed from driver panel
✓ منطقه removed from driver information
✓ زمان برنامه → زمان ورود
✓ ETA → زمان تخمینی رسیدن
✓ نمایش روی نقشه enabled
✓ برنامه ویزیت امروز preserved
✓ Visit table next to it removed
✓ انحراف از مسیر warning removed
✓ Map enlarged using freed space

DRIVERS:
✓ Add Driver uses same panel as Visit Planning
✓ منطقه removed from Add Driver panel
✓ منطقه column removed
✓ Driver details: منطقه removed
✓ Driver details: map removed
✓ نمایش مسیر removed
✓ پیام removed
✓ تماس removed
✓ آمار امروز preserved
✓ برنامه ویزیت preserved
✓ Other existing information preserved
✓ بازگشت button available

CUSTOMERS:
✓ Add Customer form functional
✓ جئوفس → میانگین مدت ویزیت
✓ عملیات column removed

VISITS:
✓ برنامه‌ریزی شده KPI removed
✓ برنامه‌ریزی شده status removed
✓ زمان برنامه column removed
✓ عملیات column removed

ALERTS:
✓ اقدام removed
✓ خواندم preserved

REPORTS:
✓ همه مناطق removed
✓ عقب افتاده → از دست رفته
✓ روند ویزیت‌ها converted to weekly chart
✓ Saturday through Thursday displayed

VISIT PLANNING:
✓ Weekly planning preserved
✓ Saturday–Thursday preserved
✓ Driver-based planning preserved
✓ "پیشنهاد برنامه" used
✓ Manager can edit visits
✓ Add/remove customers
✓ Move visits
✓ Change driver
✓ Recurring patterns
✓ One-time exceptions
✓ Validation
✓ Conflict detection
✓ Save / Undo / Publish

Most importantly:
PRESERVE EVERYTHING ELSE.
Only make the requested changes.