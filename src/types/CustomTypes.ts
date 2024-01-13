export type AppMode = "light" | "dark";

export interface ExportedStyles {
  lightBackground: string;
  darkBackground: string;
  white: string;
  black: string;
  primaryPurple: string;
  hoverPurple: string;
  primaryRed: string;
  hoverRed: string;
  darkGrey: string;
  mediumGrey: string;
  lightLines: string;
  primaryPurple25: string;
  darkLines: string;
  sidebarWidth: string;
}

export interface Board {
  id: number;
  name: string;
  columns: {
    name: string;
    tasks: {
      title: string;
      description: string;
      status: string;
      subtasks: { title: string; isCompleted: boolean }[];
    }[];
  }[];
}
[];
