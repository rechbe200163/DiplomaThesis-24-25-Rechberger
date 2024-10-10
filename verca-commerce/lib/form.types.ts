export type FormState = {
  success: boolean;
  message?: string;
  errors?: {
    title: string[];
  };
};
