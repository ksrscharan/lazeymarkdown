import Dexie, { type Table } from 'dexie';

export interface DocMetadata {
  id?: number;
  title: string;
  updatedAt: number;
}

export interface DocContent {
  id: number;
  content: string;
}

export class MarkdownDB extends Dexie {
  metadata!: Table<DocMetadata>;
  contents!: Table<DocContent>;

  constructor() {
    super('MarkdownDB');
    this.version(1).stores({
      metadata: '++id, title, updatedAt, currentlyOpen',
      contents: 'id'
    });
  }
}

export const db = new MarkdownDB();
