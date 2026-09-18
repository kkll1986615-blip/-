# المنصة الرياضية — نسخة النشر

هذه الحزمة مجهزة للنشر كصفحة ثابتة على:
- GitHub Pages
- Netlify

## الملفات
- index.html: النسخة المرفوعة دون تغيير في منطق المنصة.
- manifest.webmanifest: تثبيت المنصة باسم «المنصة الرياضية».
- sw.js: دعم PWA والعمل من خلال HTTPS مع إبقاء بيانات Firebase مباشرة من الشبكة.
- icons/: أيقونات التثبيت والمتصفح.
- netlify.toml: إعدادات Netlify.
- .nojekyll: مناسب لـ GitHub Pages.

## GitHub Pages
1. أنشئ مستودعًا جديدًا في GitHub.
2. ارفع جميع محتويات هذه الحزمة إلى جذر المستودع.
3. من Settings > Pages اختر Deploy from a branch.
4. اختر الفرع الرئيسي ومجلد / (root).
5. افتح رابط GitHub Pages الناتج.

## Netlify
1. أنشئ موقعًا جديدًا في Netlify.
2. ارفع مجلد الحزمة أو اربطه بمستودع GitHub.
3. إعداد النشر هو publish directory = .
4. بعد النشر افتح الموقع عبر HTTPS.

## Firebase
الملف الحالي يحتوي على إعداد Firebase ومزامنة Realtime Database بالفعل.
لعمل الموقعين مع نفس البيانات، يجب أن يكون نطاقا GitHub Pages وNetlify مضافين إلى Authorized domains في Firebase Authentication، وأن تسمح قواعد Realtime Database بالقراءة العامة/الكتابة للحساب المصرح له كما هو مقصود في المنصة.

لا تضع كلمة مرور Firebase داخل الملفات.
