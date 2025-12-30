import Dexie, { type Table } from 'dexie';

export interface Document {
  id?: number;
  title: string;
  content: string;
  updatedAt: number;
  opened: boolean
}

export class MarkdownDB extends Dexie {
  docs!: Table<Document>;

  constructor() {
    super('MarkdownDB');
    this.version(1).stores({
      docs: '++id, title, updatedAt'
    });

    this.on('populate', () => {
      this.docs.add({
        id: 1,
        title: 'Welcome Project',
        content: '# Welcome to Lazeymarkdown <3',
        updatedAt: Date.now(),
        opened: true
      });
    });
  }
}

export const db = new MarkdownDB();
