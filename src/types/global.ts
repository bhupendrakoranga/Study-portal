export interface LayoutProps {
  children: React.ReactNode;
}

export interface RoleBasedRedirects {
  [key: string]: string;
}

export interface Sentence {
  text: string;
  image: any;
  duration: number;
}

export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date | null;
  phone_number: string;
  role: number;
  school: string | null;
  is_active: boolean;
  last_login: Date | null;
}

export interface IAuth {
  isLoggedIn: boolean;
  role: string;
  setRole: any;
}

export interface IGlobal {
  activeTab: number;
  setActiveTab: (arg: number) => void;
  setActiveAdminTab: (arg: string) => void;
  setAadmintopicModal: (arg: any) => void;
  setLoading: (arg: boolean) => void;
  admintopicmodal: any;
  isTeacher: boolean;
  pathname: string;
  role: any;
  drawerTitle: string;
  setDrawerTitle: (arg: string) => void;
  activeadminTab: string;
}

export interface IGAdmin {
  activeadminTab: string;
  setActiveAdminTab: (arg: string) => void;
}

export interface TypingOptions {
  autoStart: boolean;
  loop: boolean;
  delay: number;
  deleteSpeed: number;
}

export interface MessageProp {
  heading: string;
  description: string;
  date?: string;
}

export interface AddStudentFormValues {
  credentials: string;
  mathica: boolean;
  newton: boolean;
  dataset: string;
  class: string;
}

export interface CurriculumItem {
  name: keyof AddStudentFormValues; // This ensures the name is one of the keys in FormValues
  label: string;
}

export interface Item {
  [x: string]: any;
  name: string;
  selected: boolean;
}

export interface DataItem {
  id: number | string;
  title: string;
  children: DataItem[];
  curriculum: string;
}
