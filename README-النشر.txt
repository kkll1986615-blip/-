المنصة الرياضية — النسخة النهائية لـ GitHub وCloudflare

المحتويات:
- index.html: النسخة النهائية.
- manifest.webmanifest و manifest.json: تثبيت المنصة كتطبيق PWA.
- sw.js: التخزين المؤقت والتحديث/العمل عند ضعف الاتصال.
- icons/: أيقونات التثبيت.
- firebase-database.rules.json: قواعد Firebase المقترحة.
- هذا الملف.

مزامنة Firebase:
هذه النسخة تربط جميع الأجهزة بنفس قاعدة Firebase الحالية لمشروع almanar-sports.
تمت إضافة الأخبار إلى المزامنة، كما أن حفظ بيانات المنصة عبر localStorage يتم التقاطه ومزامنته تلقائياً.
عند وصول تغيير من جهاز آخر يتم تحديث البيانات وإعادة تحميل الصفحة تلقائياً.

مهم جداً:
1) في Firebase Console > Authentication > Sign-in method فعّل Anonymous.
2) في Realtime Database ضع القواعد الموجودة في firebase-database.rules.json.
3) لا تضع أي كلمة مرور أو مفتاح Admin سري داخل index.html.
4) ارفع جميع الملفات كما هي، مع بقاء index.html في الجذر.

GitHub Pages:
ارفع محتويات الحزمة إلى المستودع، وتأكد أن index.html في الجذر، ثم فعّل Pages من Settings > Pages.

Cloudflare:
انشر المجلد نفسه كـ Static Assets/Workers. لا تغيّر أسماء الملفات أو مسارات icons.

بعد النشر:
اختبر جهازين:
- الجهاز الأول: أضف خبراً.
- انتظر ثوانٍ قليلة.
- الجهاز الثاني: افتح/حدّث المنصة.
يجب أن يظهر الخبر نفسه.
جرّب بعدها تعديل الخبر وحذفه.
