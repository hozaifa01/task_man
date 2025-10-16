const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// إعداد Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// إعداد قاعدة البيانات
const db = new sqlite3.Database('./tasks.db', (err) => {
    if (err) {
        console.error('خطأ في الاتصال بقاعدة البيانات:', err.message);
    } else {
        console.log('✅ تم الاتصال بقاعدة البيانات بنجاح');
    }
});

// إنشاء جدول المهام
db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending',
    priority TEXT DEFAULT 'medium',
    due_date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
    if (err) {
        console.error('خطأ في إنشاء الجدول:', err.message);
    }
});

// API: جلب جميع المهام
app.get('/api/tasks', (req, res) => {
    const filter = req.query.filter || 'all';
    let query = 'SELECT * FROM tasks ORDER BY created_at DESC';
    let params = [];

    if (filter !== 'all') {
        query = 'SELECT * FROM tasks WHERE status = ? ORDER BY created_at DESC';
        params = [filter];
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ tasks: rows });
    });
});

// API: جلب الإحصائيات
app.get('/api/stats', (req, res) => {
    const stats = {};

    db.get('SELECT COUNT(*) as total FROM tasks', (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        stats.total = row.total;

        db.get('SELECT COUNT(*) as completed FROM tasks WHERE status = "completed"', (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            stats.completed = row.completed;

            db.get('SELECT COUNT(*) as pending FROM tasks WHERE status = "pending"', (err, row) => {
                if (err) return res.status(500).json({ error: err.message });
                stats.pending = row.pending;

                db.get('SELECT COUNT(*) as in_progress FROM tasks WHERE status = "in_progress"', (err, row) => {
                    if (err) return res.status(500).json({ error: err.message });
                    stats.in_progress = row.in_progress;
                    res.json(stats);
                });
            });
        });
    });
});

// API: إضافة مهمة جديدة
app.post('/api/tasks', (req, res) => {
    const { title, description, priority, due_date } = req.body;

    if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'العنوان مطلوب' });
    }

    const query = `INSERT INTO tasks (title, description, priority, due_date) VALUES (?, ?, ?, ?)`;
    const params = [title.trim(), description || '', priority || 'medium', due_date || null];

    db.run(query, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ 
            message: 'تمت الإضافة بنجاح!',
            id: this.lastID 
        });
    });
});

// API: تحديث حالة المهمة
app.put('/api/tasks/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'in_progress', 'completed'].includes(status)) {
        return res.status(400).json({ error: 'حالة غير صالحة' });
    }

    const query = 'UPDATE tasks SET status = ? WHERE id = ?';
    db.run(query, [status, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'تم تحديث الحالة بنجاح!' });
    });
});

// API: حذف مهمة
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM tasks WHERE id = ?';
    db.run(query, [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'تم الحذف بنجاح!' });
    });
});

// تقديم صفحة HTML الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`🚀 الخادم يعمل على http://localhost:${PORT}`);
});

// إغلاق قاعدة البيانات عند إيقاف الخادم
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('تم إغلاق قاعدة البيانات');
        process.exit(0);
    });
});