import console = require("node:console");

class User {
  private noteBook: NoteBook[] = [];

  constructor(
    public id: number,
    public name: string,
    public email: string,
    private password: string,
    protected phone: string,
    private age: number,
  ) {
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
  public displayInfo(): string {
    return `User Info : Name: ${this.name}, ID: ${this.id}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this.age}`;
  }
  public addNoteBook(noteBook: NoteBook): void {
    this.noteBook.push(noteBook);
  }
  public viewNoteBooks(): void {
    this.noteBook.forEach((nb) => console.log(nb));
  }
}

class Admin extends User {
  private notes: Note[] = [];
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
  ) {
    super(id, name, email, password, phone, age);
  }
  public addNote(note: Note): void {
    this.notes.push(note);
  }
  public deleteNote(noteId: number): void {
    this.notes = this.notes.filter((n) => n.id !== noteId);
  }
  public getNote(noteId: number): Note | undefined {
    return this.notes.find((n) => n.id === noteId);
  }
  public getAllNotes(): void {
    this.notes.forEach((n) => console.log(n.preview()));
  }
}

class Note {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public userId: number,
    public user: User,
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.userId = userId;
    this.user = user;
  }
  public preview(): string {
    return `Note Preview : ${this.content.substring(0, 50)}...`;
  }
}

class NoteBook {
  private notes: Note[] = [];

  public AddNote(note: Note): void {
    this.notes.push(note);
  }
  public removeNote(noteId: number): void {
    this.notes = this.notes.filter((n) => n.id !== noteId);
  }
}

class Storage<T> {
  private items: T[] = [];

  public addItem(item: T): void {
    this.items.push(item);
  }
  public removeItem(item: T): void {
    this.items = this.items.filter((i) => i !== item);
  }
  public getAllItems(): T[] {
    return this.items;
  }
}
//create user
const user1 = new User(
  1,
  "Asmaa",
  "asmaa@gmail.com",
  "pass123",
  "179137918",
  22,
);
console.log(user1.displayInfo());

//create notebook (aggregation)
const nb1 = new NoteBook();
const nb2 = new NoteBook();

user1.addNoteBook(nb1);
user1.addNoteBook(nb2);

console.log("User Notebooks:");
user1.viewNoteBooks();

//create notes (association with user)
const note1 = new Note(1, "Note 1", "This is the content of note 1", user1.id, user1);
const note2 = new Note(2, "Note 2", "This is the content of note 2", user1.id, user1);

//  Admin (Inheritance , manage notes)

const admin1 = new Admin(2, "Admin", "admin@gmail.com", "adminpass", "179137919", 30);
admin1.addNote(note1);
admin1.addNote(note2);
console.log("Admin Notes:" );
admin1.getAllNotes();
admin1.deleteNote(1)
console.log("Admin Notes after deletion:" );
admin1.getAllNotes();

//composition : notebook contains notes
nb1.AddNote(note1);
nb2.AddNote(note2);

//generic storage
const storage = new Storage<number>();
storage.addItem(100);
storage.addItem(200);
console.log(storage.getAllItems());
storage.removeItem(100);
console.log(storage.getAllItems());

const storage2 = new Storage<Note>();
storage2.addItem(note1);
storage2.addItem(note2);
console.log(storage2.getAllItems());
storage2.removeItem(note1 );
console.log(storage2.getAllItems());
