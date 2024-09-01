"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const db_1 = __importDefault(require("./utils/db"));
const questionService_1 = require("./services/questionService");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', blogRoutes_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
db_1.default.sync().then(() => {
    console.log('Database synced');
    questionService_1.QuestionService.initScheduler();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
