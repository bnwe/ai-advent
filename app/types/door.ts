/**
 * Represents the content for a single advent calendar door
 */
export interface DoorContent {
  /** Day number (1-24) */
  day: number;
  /** Title displayed in the content view */
  title: string;
  /** Text content displayed when door is opened */
  text: string;
  /** Optional image path from /public directory */
  imageUrl?: string;
}
