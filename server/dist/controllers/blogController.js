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
exports.clearAllPosts = exports.createPost = exports.getPostById = exports.getAllPosts = void 0;
const blogService_1 = require("../services/blogService");
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield blogService_1.BlogService.getAllPosts();
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
});
exports.getAllPosts = getAllPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const post = yield blogService_1.BlogService.getPostById(id);
        res.json(post);
    }
    catch (error) {
        if (error.message === 'Post not found') {
            res.status(404).json({ message: 'Post not found' });
        }
        else {
            res.status(500).json({ message: 'Error fetching post', error });
        }
    }
});
exports.getPostById = getPostById;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content } = req.body;
        const newPost = yield blogService_1.BlogService.createPost(content);
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
});
exports.createPost = createPost;
const clearAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield blogService_1.BlogService.clearAllPosts();
        res.json({ message: 'All posts cleared' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error clearing posts', error });
    }
});
exports.clearAllPosts = clearAllPosts;
