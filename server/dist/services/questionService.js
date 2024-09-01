"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const Question_1 = __importDefault(require("../models/Question"));
const db_1 = __importDefault(require("../utils/db"));
const node_cron_1 = __importDefault(require("node-cron"));
const sequelize_1 = require("sequelize");
class QuestionService {
    static getCurrentQuestion() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.currentQuestion) {
                yield this.setDailyQuestion();
            }
            return this.currentQuestion;
        });
    }
    static setNewQuestion(content) {
        return __awaiter(this, void 0, void 0, function* () {
            return Question_1.default.create({ content });
        });
    }
    static setDailyQuestion() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      SELECT content FROM questions 
      ORDER BY RANDOM() 
      LIMIT 1
    `;
            try {
                const results = yield db_1.default.query(query, {
                    type: sequelize_1.QueryTypes.SELECT
                });
                console.log('Query results:', results); // Log the results
                if (results.length > 0) {
                    this.currentQuestion = results[0];
                    console.log('Current question set:', this.currentQuestion); // Log the current question
                }
                else {
                    console.log('No questions found');
                }
            }
            catch (error) {
                console.error('Error fetching daily question:', error);
            }
        });
    }
    //This is for consistent question for the day
    static generateSeed(date) {
        let hash = 0;
        for (let i = 0; i < date.length; i++) {
            const char = date.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }
    static initScheduler() {
        // Schedule the task to run every day at midnight
        node_cron_1.default.schedule('0 0 * * *', () => __awaiter(this, void 0, void 0, function* () {
            console.log('Setting new daily question');
            yield this.setDailyQuestion();
        }));
        // Set the initial question
        this.setDailyQuestion();
    }
}
exports.QuestionService = QuestionService;
QuestionService.currentQuestion = null;
