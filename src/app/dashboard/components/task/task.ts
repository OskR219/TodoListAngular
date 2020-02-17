export class Task {
  id: string;
  title: string;
  description: string;
  subtasks?: string[];
  status: string;
  date: firebase.firestore.Timestamp|null;
  uid: string;
}
