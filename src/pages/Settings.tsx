import Header from "../components/Header";

export default function Settings() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50">
      <Header title="تنظیمات" subtitle="پیکربندی سامانه مدیریت ویزیت" />
      <div className="flex-1 overflow-auto hide-scroll p-6">
        <div className="max-w-2xl space-y-5">
          {[
            { title: "تنظیمات جئوفنس", fields: [["شعاع پیش‌فرض جئوفنس (متر)", "100"], ["حداقل زمان ویزیت (دقیقه)", "5"]] },
            { title: "تنظیمات هشدار", fields: [["حد آستانه تأخیر (دقیقه)", "10"], ["حد انحراف از مسیر (متر)", "300"]] },
            { title: "تنظیمات نمایش", fields: [["بازه بروزرسانی GPS (ثانیه)", "10"], ["تعداد ردیف‌های جدول", "20"]] },
          ].map((section) => (
            <div key={section.title} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-sm font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">{section.title}</h3>
              <div className="space-y-3">
                {section.fields.map(([label, defaultVal]) => (
                  <div key={label} className="flex items-center justify-between gap-4">
                    <label className="text-sm text-slate-600 flex-1">{label}</label>
                    <input
                      type="text"
                      defaultValue={defaultVal}
                      className="text-sm border border-slate-200 rounded-lg px-3 py-2 w-28 text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex gap-3">
            <button className="bg-blue-600 text-white text-sm px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors font-medium">ذخیره تنظیمات</button>
            <button className="bg-slate-100 text-slate-700 text-sm px-6 py-2.5 rounded-xl hover:bg-slate-200 transition-colors">بازگردانی</button>
          </div>
        </div>
      </div>
    </div>
  );
}
