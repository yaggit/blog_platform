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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNewQuestion = exports.getCurrentQuestion = void 0;
const questionService_1 = require("../services/questionService");
const getCurrentQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = yield questionService_1.QuestionService.getCurrentQuestion();
        res.json(question);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching question', error });
    }
});
exports.getCurrentQuestion = getCurrentQuestion;
const setNewQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content } = req.body;
        const newQuestion = yield questionService_1.QuestionService.setNewQuestion(content);
        res.status(201).json(newQuestion);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating question', error });
    }
});
exports.setNewQuestion = setNewQuestion;
