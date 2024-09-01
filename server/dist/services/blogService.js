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
exports.BlogService = void 0;
const BlogPost_1 = __importDefault(require("../models/BlogPost"));
class BlogService {
    static getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return BlogPost_1.default.findAll({ order: [['createdAt', 'DESC']] });
        });
    }
    static getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield BlogPost_1.default.findByPk(id);
            if (!post) {
                throw new Error('Post not found');
            }
            return post;
        });
    }
    static createPost(content) {
        return __awaiter(this, void 0, void 0, function* () {
            return BlogPost_1.default.create({ content });
        });
    }
    static clearAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return BlogPost_1.default.destroy({ where: {} });
        });
    }
}
exports.BlogService = BlogService;
