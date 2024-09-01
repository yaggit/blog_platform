"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const adminAuth = (req, res, next) => {
    const adminToken = req.headers['admin-token'];
    if (adminToken === process.env.ADMIN_TOKEN) {
        next();
    }
    else {
        res.status(403).json({ message: 'Unauthorized' });
    }
};
exports.adminAuth = adminAuth;
