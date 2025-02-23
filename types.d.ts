interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  createdAt: Date | null;
  // borrowRecords related
  isLoanedBook?: boolean;
  borrowDate?: string;
  dueDate?: string;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  universityId: number;
  universityCard: string;
  createdAt: Date | null;
  booksBorrowed?: number;
}

interface BorrowBookListProps {
  id: string;
  bookTitle: string;
  userRequested: string;
  borrowDate?: string | Date;
  returnDate: string | null;
  dueDate: string;
  status: string;
  coverUrl: string;
  coverColor?: string;
}
