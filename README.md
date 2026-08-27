# المنصة الرياضية — حزمة النشر

هذه الحزمة تعتمد النسخة النهائية المصححة من المنصة، مع إضافة PWA وبرنامج تثبيت.

## الملفات
- `index.html` — المنصة الرئيسية.
- `installer.html` — صفحة تثبيت المنصة على الهاتف.
- `manifest.webmanifest` — تعريف التطبيق.
- `sw.js` — تشغيل PWA والتخزين المؤقت.
- `icons/` — أيقونات التثبيت.
- `.github/workflows/pages.yml` — نشر تلقائي إلى GitHub Pages.
- `.nojekyll` — منع معالجة Jekyll.

## GitHub Pages
1. أنشئ مستودعًا جديدًا على GitHub.
2. ارفع جميع محتويات هذه الحزمة إلى الفرع `main`.
3. من Settings → Pages اختر GitHub Actions إذا لم يتم التفعيل تلقائيًا.
4. سيتم نشر الموقع عبر GitHub Pages.

## Cloudflare Pages
لأن المشروع HTML/CSS/JavaScript ثابت، استخدم Cloudflare Pages:
- Production branch: `main`
- Build command: `exit 0`
- Build output directory: `.`
ثم اربط مستودع GitHub بالمشروع.

## التثبيت على الهاتف
بعد نشر الموقع عبر HTTPS:
افتح `installer.html` ثم اضغط «تثبيت المنصة».
إذا لم يظهر مربع التثبيت، استخدم قائمة المتصفح واختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».

ملاحظة: هذا برنامج ويب قابل للتثبيت (PWA)، وليس ملف APK أندرويد. لا يحتاج إلى متجر Google Play.
