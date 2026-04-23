"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console = require("node:console");
class User {
    id;
    name;
    email;
    password;
    phone;
    age;
    noteBook = [];
    constructor(id, name, email, password, phone, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60");
        }
        this.age = age;
    }
    displayInfo() {
        return `User Info : Name: ${this.name}, ID: ${this.id}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this.age}`;
    }
    addNoteBook(noteBook) {
        this.noteBook.push(noteBook);
    }
    viewNoteBooks() {
        this.noteBook.forEach((nb) => console.log(nb));
    }
}
class Admin extends User {
    notes = [];
    constructor(id, name, email, password, phone, age) {
        super(id, name, email, password, phone, age);
    }
    addNote(note) {
        this.notes.push(note);
    }
    deleteNote(noteId) {
        this.notes = this.notes.filter((n) => n.id !== noteId);
    }
    getNote(noteId) {
        return this.notes.find((n) => n.id === noteId);
    }
    getAllNotes() {
        this.notes.forEach((n) => console.log(n.preview()));
    }
}
class Note {
    id;
    title;
    content;
    userId;
    user;
    constructor(id, title, content, userId, user) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.user = user;
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.user = user;
    }
    preview() {
        return `Note Preview : ${this.content.substring(0, 50)}...`;
    }
}
class NoteBook {
    notes = [];
    AddNote(note) {
        this.notes.push(note);
    }
    removeNote(noteId) {
        this.notes = this.notes.filter((n) => n.id !== noteId);
    }
}
class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        this.items = this.items.filter((i) => i !== item);
    }
    getAllItems() {
        return this.items;
    }
}
const user1 = new User(1, "Asmaa", "asmaa@gmail.com", "pass123", "179137918", 22);
console.log(user1.displayInfo());
const nb1 = new NoteBook();
const nb2 = new NoteBook();
user1.addNoteBook(nb1);
user1.addNoteBook(nb2);
console.log("User Notebooks:");
user1.viewNoteBooks();
const note1 = new Note(1, "Note 1", "This is the content of note 1", user1.id, user1);
const note2 = new Note(2, "Note 2", "This is the content of note 2", user1.id, user1);
const admin1 = new Admin(2, "Admin", "admin@gmail.com", "adminpass", "179137919", 30);
admin1.addNote(note1);
admin1.addNote(note2);
console.log("Admin Notes:");
admin1.getAllNotes();
admin1.deleteNote(1);
console.log("Admin Notes after deletion:");
admin1.getAllNotes();
nb1.AddNote(note1);
nb2.AddNote(note2);
const storage = new Storage();
storage.addItem(100);
storage.addItem(200);
console.log(storage.getAllItems());
storage.removeItem(100);
console.log(storage.getAllItems());
const storage2 = new Storage();
storage2.addItem(note1);
storage2.addItem(note2);
console.log(storage2.getAllItems());
storage2.removeItem(note1);
console.log(storage2.getAllItems());
