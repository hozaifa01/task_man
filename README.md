# 🎯 مدير المهام - Task Manager

نظام إدارة المهام بواجهة عربية أنيقة مبني باستخدام Node.js و Express و SQLite.

## 📋 المتطلبات

- Node.js (الإصدار 14 أو أحدث)
- npm (يأتي مع Node.js)

## 🚀 خطوات التثبيت والتشغيل

### 1. تثبيت Node.js
قم بتنزيل وتثبيت Node.js من الموقع الرسمي:
- [https://nodejs.org](https://nodejs.org)

### 2. إنشاء هيكل المشروع

قم بإنشاء المجلدات والملفات التالية:

```
task-manager/
├── server.js
├── package.json
├── tasks.db (سيتم إنشاؤه تلقائياً)
└── public/
    └── index.html
```

### 3. تثبيت الحزم المطلوبة

افتح Terminal/Command Prompt في مجلد المشروع وقم بتشغيل:

```bash
npm install
```

سيقوم هذا الأمر بتثبيت:
- express (خادم الويب)
- sqlite3 (قاعدة البيانات)
- body-parser (معالجة البيانات)

### 4. تشغيل المشروع

```bash
npm start
```

أو للتطوير مع إعادة التشغيل التلقائي:

```bash
npm run dev
```

### 5. فتح التطبيق

افتح المتصفح واذهب إلى:
```
http://localhost:3000
```

## 📁 بنية الملفات

### server.js
- خادم Node.js الرئيسي
- يحتوي على API endpoints
- يدير قاعدة بيانات SQLite

### public/index.html
- الواجهة الأمامية
- يحتوي على HTML, CSS, و JavaScript
- يتواصل مع الـ API

### tasks.db
- قاعدة بيانات SQLite
- يتم إنشاؤها تلقائياً عند أول تشغيل

## 🔌 API Endpoints

### جلب جميع المهام
```
GET /api/tasks?filter=all
```

### جلب الإحصائيات
```
GET /api/stats
```

### إضافة مهمة جديدة
```
POST /api/tasks
Body: {
  "title": "عنوان المهمة",
  "description": "الوصف",
  "priority": "medium",
  "due_date": "2025-10-16"
}
```

### تحديث حالة المهمة
```
PUT /api/tasks/:id/status
Body: {
  "status": "completed"
}
```

### حذف مهمة
```
DELETE /api/tasks/:id
```

## ✨ المميزات

- ✅ إضافة وحذف وتعديل المهام
- 📊 لوحة إحصائيات شاملة
- 🎨 تصميم عصري وأنيق
- 📱 متجاوب مع جميع الأجهزة
- 🔄 تصفية المهام حسب الحالة
- ⚡ سريع وخفيف
- 🗄️ قاعدة بيانات محلية (SQLite)

## 🛠️ التطوير

### تثبيت nodemon للتطوير
```bash
npm install --save-dev nodemon
```

### تشغيل في وضع التطوير
```bash
npm run dev
```

## 🐛 حل المشاكل الشائعة

### خطأ في تثبيت sqlite3
```bash
npm rebuild sqlite3
```

### المنفذ 3000 مستخدم
غيّر رقم المنفذ في server.js:
```javascript
const PORT = 3001; // غيّر إلى منفذ آخر
```

### قاعدة البيانات تالفة
احذف ملف `tasks.db` وأعد تشغيل المشروع

## 📝 ملاحظات

- قاعدة البيانات محلية (SQLite) - لا تحتاج لخادم MySQL
- جميع البيانات تُحفظ في ملف `tasks.db`
- يمكنك نقل المشروع كاملاً إلى أي مكان
- التطبيق يعمل بدون اتصال بالإنترنت بعد التثبيت

## 👨‍💻 المطور

مع تحياتي hozaifa01

---

**نظمو اوقاتكم تفلحو** ⏰✨