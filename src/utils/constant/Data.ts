import {
  CurriculumItem,
  Item,
  RoleBasedRedirects,
  Sentence,
} from '@/types/global';

export type Role = 'Admin' | 'Teacher' | 'Student';
export interface LoginButtonType {
  title: Role;
  route: string;
}

export const USER_FIELD = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const CARDS_DATA = [
  {
    id: 1,
    image: '/assets/png/Img-one.png',
    title: 'Mathica',
  },
  {
    id: 2,
    image: '/assets/png/Img-two.png',
    title: 'Shakespeare',
  },
  {
    id: 3,
    image: '/assets/png/Img-three.png',
    title: 'Newton',
  },
];
export const CHAT_DATA = [
  {
    id: 1,
    image: '/assets/png/Img-one.png',
    title: 'Mathica',
    color: '#F2F4F8',
    dec: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique rerum rem quod officia dolor possimus accusamus officiis tempore repellat eos?',
  },
  {
    id: 2,
    image: '/assets/png/Img-one.png',
    title: 'Mathica',
    color: '#F2F4F8',
    dec: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique rerum rem quod officia dolor possimus accusamus officiis tempore repellat eos?',
  },
  {
    id: 3,
    image: '/assets/png/Img-two.png',
    title: 'Alex',
    color: '#FFFFFF',
    dec: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique rerum rem quod officia dolor possimus accusamus Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique rerum rem quod officia dolor possimus accusamus o officiis tempore repellat eos?',
  },
  {
    id: 4,
    image: '/assets/png/Img-two.png',
    title: 'Alex',
    color: '#F2F4F8',
    dec: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique rerum rem quod officia dolor possimus accusamus Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique rerum rem quod officia dolor possimus accusamus o officiis tempore repellat eos?',
  },
  {
    id: 5,
    image: '/assets/png/Img-one.png',
    title: 'Mathica',
    color: '#F2F4F8',
    dec: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique rerum rem quod officia dolor possimus accusamus Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique rerum rem quod officia dolor possimus accusamus o officiis tempore repellat eos?',
  },
  {
    id: 6,
    image: '/assets/png/Img-two.png',
    title: 'Alex',
    color: '#FFFFFF',
    dec: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique rerum rem quod officia dolor possimus accusamus officiis tempore repellat eos?',
  },
];

export const LOGIN_BTN_TYPE: LoginButtonType[] = [
  {
    title: 'Student',
    route: '/student/dashboard',
  },
  {
    title: 'Teacher',
    route: '/teacher/dashboard',
  },
];

export const DROPDOWN_BTN_TYPE = [
  {
    title: 'Class A',
  },
  {
    title: 'Class B',
  },
  {
    title: 'Class C',
  },
  {
    title: 'Class D',
  },
];

export const FORM_INPUT_TYPE = [
  {
    title: 'Week topic',
    name: 'topic',
  },
  {
    title: 'To-do',
    name: 'heading',
  },
  {
    title: 'Send message to all',
    name: 'description',
  },
];

export const STUDENT_LIST = [
  'Ava',
  'Ethan',
  'Lily',
  'Noah',
  'Sophia',
  'Logan',
  'Mia',
  'Alexander',
  'Isabella',
  'Julian',
  'Emily',
  'Benjamin',
  'Hannah',
  'Caleb',
  'Abigail',
  'Michael',
  'Samantha',
  'Olivia',
  'Daniel',
  'Aiden',
  'Gabriella',
  'Kevin',
  'Rachel',
  'Christopher',
  'Jessica',
  'Matthew',
  'Savannah',
  'Nicolas',
  'Hailey',
  'Tyler',
  'Lauren',
];

export const topstudents = [
  {
    name: 'Sarah',
    marks: 350,
    rank: 1,
    src: '/assets/png/medal.png',
  },
  {
    name: 'John',
    marks: 230,
    rank: 2,
    src: '/assets/png/medal2.png',
  },
  {
    name: 'Chelsey',
    marks: 200,
    rank: 3,
    src: '/assets/png/medal3.png',
  },
  {
    name: 'Vivek',
    marks: 174,
  },
  {
    name: 'Alex',
    marks: 172,
  },
  {
    name: 'Greg',
    marks: 162,
  },
  {
    name: 'Akshay',
    marks: 157,
  },
  {
    name: 'Colleen',
    marks: 142,
  },
  {
    name: 'Mithcel',
    marks: 140,
  },
  {
    name: 'Shane',
    marks: 139,
  },
  {
    name: 'Eduardo',
    marks: 122,
  },
  {
    name: 'Kyle',
    marks: 118,
  },
  {
    name: 'Debra',
    marks: 110,
  },
  {
    name: 'Max',
    marks: 72,
  },
  {
    name: 'Kristin',
    marks: 20,
  },
];

export const headers = [
  { name: 'Number', progress: 30 },
  { name: 'Algebra', progress: 40 },
  { name: 'Data', progress: 100 },
  { name: 'Spatial Sense', progress: 80 },
  { name: 'Financial Literacy', progress: 70 },
];

export const rows = [
  [
    [
      {
        name: 'Number Sense',
        progress: 10,
        isCheckbox: true,
        children: [
          {
            name: 'Relational & Irrational Numbers',
            progress: 30,
            isCheckbox: true,
            children: [
              {
                name: 'Numbers & Scientific Notation',
                video: '',
                isCheckbox: false,
                progress: 60,
              },
              {
                name: 'Real Number System',
                video: '',
                isCheckbox: false,
                progress: 0,
              },
              {
                name: 'Square Roots',
                isCheckbox: false,
                progress: 0,
              },
            ],
          },
          {
            name: 'Fractions, Decimals & Percentes',
            isCheckbox: false,
            progress: 60,
          },
        ],
      },
      {
        name: 'Operations',
        isCheckbox: false,
        progress: 40,
        children: [
          {
            name: 'Properties & Relationships',
            isCheckbox: false,
            progress: 100,
          },
          {
            name: 'Math Facts',
            isCheckbox: false,
            progress: 40,
          },
          {
            name: 'Mental math',
            isCheckbox: false,
            progress: 50,
          },
          {
            name: 'Addition & Subtraction',
            isCheckbox: false,
            progress: 75,
            children: [
              {
                name: 'Integers',
                isCheckbox: false,
                progress: 100,
              },
              {
                name: 'Fractions',
                isCheckbox: false,
                progress: 60,
              },
            ],
          },
          {
            name: 'Multiplication & division',
            isCheckbox: false,
            progress: 0,
          },
        ],
      },
    ],
    [
      {
        name: 'Patterns & Relationships',
        isCheckbox: false,
        progress: 70,
        children: [
          {
            name: 'Linear Equations',
            isCheckbox: false,
            progress: 70,
          },
        ],
      },
      {
        name: 'Equations & Inequalities',
        isCheckbox: false,
        progress: 30,
        children: [
          {
            name: 'Linear Equations',
            isCheckbox: false,
            progress: 30,
          },
        ],
      },
      {
        name: 'Coding',
        isCheckbox: false,
        progress: 100,
        children: [
          {
            name: 'Linear Equations',
            isCheckbox: false,
            progress: 100,
          },
        ],
      },
      {
        name: 'Mathematical Modeling',
        isCheckbox: false,
        progress: 0,
        children: [
          {
            name: 'Linear Equations',
            isCheckbox: false,
            progress: 100,
          },
        ],
      },
    ],
    [
      {
        name: 'Data Literacy',
        isCheckbox: false,
        progress: 25,
        children: [
          {
            name: 'Linear Equations',
            isCheckbox: false,
            progress: 25,
          },
        ],
      },
      {
        name: 'Probability',
        isCheckbox: false,
        progress: 10,
        children: [
          {
            name: 'Linear Equations',
            isCheckbox: false,
            progress: 10,
          },
        ],
      },
    ],
    [
      {
        name: 'Geometric & Spatial Reasoning',
        isCheckbox: false,
        progress: 80,
        children: [
          {
            name: 'Linear Equations',
            isCheckbox: false,
            progress: 80,
          },
          {
            name: 'Solving Equations',
            video: '',
            isCheckbox: false,
            progress: 50,
          },
          {
            name: 'Graphing Equations',
            video: '',
            isCheckbox: false,
            progress: 30,
          },
        ],
      },
      {
        name: 'Measurement',
        isCheckbox: false,
        progress: 60,
        children: [
          {
            name: 'Metric System',
            isCheckbox: false,
            progress: 30,
          },
          {
            name: 'Lines and Angels',
            video: '',
            isCheckbox: false,
            progress: 0,
            children: [
              {
                name: 'Recap: Angels & Degrees',
                isCheckbox: false,
                progress: 0,
              },
              {
                name: 'Properties of Angels & Lines',
                video: '',
                isCheckbox: false,
                progress: 0,
              },
              {
                name: 'Angels with Transversals & Parallel Lines',
                video: '',
                isCheckbox: false,
                progress: 0,
              },
              {
                name: 'Interior Angels of Polygons',
                video: '',
                isCheckbox: false,
                progress: 0,
              },
              {
                name: 'Exterior Angels',
                video: '',
                isCheckbox: false,
                progress: 0,
              },
            ],
          },
          {
            name: 'Length, Area, and Volume',
            video: '',
            isCheckbox: false,
            progress: 0,
          },
        ],
      },
    ],
    [
      {
        name: 'Money & Finances',
        isCheckbox: false,
        progress: 0,
        children: [
          {
            name: 'Linear Equations',
            isCheckbox: false,
            progress: 0,
          },
        ],
      },
    ],
  ],
];

export const unitrows = [
  [
    [
      {
        name: 'Number',
        isCheckbox: false,
        children: [
          {
            name: 'Intro',
            isCheckbox: false,
          },
          {
            name: 'Don’ts',
            isCheckbox: false,
          },
          {
            name: 'Conclusion',
            isCheckbox: false,
          },
        ],
      },
    ],
    [
      {
        name: 'Algebra',
        isCheckbox: false,
        children: [
          {
            name: 'Intro',
            isCheckbox: false,
          },
          {
            name: 'Don’ts',
            isCheckbox: false,
          },
          {
            name: 'Conclusion',
            isCheckbox: false,
          },
        ],
      },
    ],
    [
      {
        name: 'Data',
        isCheckbox: false,
        children: [
          {
            name: 'Intro',
            isCheckbox: false,
          },
          {
            name: 'Don’ts',
            isCheckbox: false,
          },
          {
            name: 'Conclusion',
            isCheckbox: false,
          },
        ],
      },
    ],
    [
      {
        name: 'Spatial Sense',
        isCheckbox: false,
        children: [
          {
            name: 'Intro',
            isCheckbox: false,
          },
          {
            name: 'Don’ts',
            isCheckbox: false,
          },
          {
            name: 'Conclusion',
            isCheckbox: false,
          },
        ],
      },
    ],
    [
      {
        name: 'Financial Literacy',
        isCheckbox: false,
        children: [
          {
            name: 'Intro',
            isCheckbox: false,
          },
          {
            name: 'Don’ts',
            isCheckbox: false,
          },
          {
            name: 'Conclusion',
            isCheckbox: false,
          },
        ],
      },
    ],
  ],
];

export const topicslists = [
  {
    name: 'Intro',
    star: 25,
  },
  {
    name: 'Don’ts in scientific notation',
    star: 30,
  },
  {
    name: 'Small numbers',
    star: 30,
  },
  {
    name: 'Conclusion',
    star: 35,
  },
];

export const Teachertopicslists = [
  {
    name: 'Intro',
    total: 15,
    actual: 15,
  },
  {
    name: 'Don’ts in scientific notation',
    total: 15,
    actual: 12,
  },
  {
    name: 'Small numbers',
    total: 15,
    actual: 11,
  },
  {
    name: 'Conclusion',
    total: 15,
    actual: 13,
  },
];

export const AdminRoutes = [
  {
    name: 'School Data Setter',
    route: '/admin/school-data-setter',
  },
  {
    name: 'Add Student & Teacher',
    route: '/admin/add-student-teacher',
  },
  {
    name: 'Class Creator',
    route: '/admin/class-creator',
  },
];

export const sentences: Sentence[] = [
  {
    text: 'Mathica',
    image: '/assets/png/Img-one.png',
    duration: 3000, // milliseconds
  },
  {
    text: 'Shakespeare',
    image: '/assets/png/Img-two.png',
    duration: 2000, // milliseconds
  },
  {
    text: 'Newton',
    image: '/assets/png/Img-two.png',
    duration: 1000, // milliseconds
  },
];

export const urls = [
  {
    id: 0,
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 1,
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
];

export const messageData = {
  heading: 'Complete before Thursday class',
  description:
    'I have marked the modules for you to complete prior to our Thursday class. Happy learning!',
  date: '21.02.24 - 10:05',
};

export const roleBasedRedirects: RoleBasedRedirects = {
  Student: '/student',
  Teacher: '/teacher',
  Admin: '/admin',
};

export const adminselector = [
  [
    {
      name: 'Number',
      isCheckbox: false,
      children: [
        {
          name: 'Intro',
          isCheckbox: false,
        },
        {
          name: 'Don’ts',
          isCheckbox: false,
        },
        {
          name: 'Conclusion',
          isCheckbox: false,
        },
      ],
    },
  ],
  [
    {
      name: 'Algebra',
      isCheckbox: false,
      children: [
        {
          name: 'Intro',
          isCheckbox: false,
        },
        {
          name: 'Don’ts',
          isCheckbox: false,
        },
        {
          name: 'Conclusion',
          isCheckbox: false,
        },
      ],
    },
  ],
  [
    {
      name: 'Data',
      isCheckbox: false,
      children: [
        {
          name: 'Intro',
          isCheckbox: false,
        },
        {
          name: 'Don’ts',
          isCheckbox: false,
        },
        {
          name: 'Conclusion',
          isCheckbox: false,
        },
      ],
    },
  ],
  [
    {
      name: 'Spatial Sense',
      isCheckbox: false,
      children: [
        {
          name: 'Intro',
          isCheckbox: false,
        },
        {
          name: 'Don’ts',
          isCheckbox: false,
        },
        {
          name: 'Conclusion',
          isCheckbox: false,
        },
      ],
    },
  ],
  [
    {
      name: 'Financial Literacy',
      isCheckbox: false,
      children: [
        {
          name: 'Intro',
          isCheckbox: false,
        },
        {
          name: 'Don’ts',
          isCheckbox: false,
        },
        {
          name: 'Conclusion',
          isCheckbox: false,
        },
      ],
    },
  ],
];

export const datasetOptions = [
  { value: 'mathica', label: 'OSSD, G8, Mathica' },
  { value: 'mathica2', label: 'OSSD, G8, Mathica2' },
];

export const classOptions = [
  { value: 'Jardin', label: 'Section B with Jardin' },
  { value: 'Jardin2', label: 'Section B with Jardin2' },
];

export const StdOptions = [
  { value: 'Nithil', label: 'Nithil' },
  { value: 'Nithil1', label: 'Nithil1' },
  { value: 'Nithil2', label: 'Nithil2' },
  { value: 'Nithil3', label: 'Nithil3' },
  { value: 'Nithil4', label: 'Nithil4' },
];
export const TeacherOptions = [
  { value: 'Mr. Jarding', label: 'Mr. Jarding' },
  { value: 'Mr. Jarding1', label: 'Mr. Jarding1' },
  { value: 'Mr. Jarding2', label: 'Mr. Jarding2' },
  { value: 'Mr. Jarding3', label: 'Mr. Jarding3' },
  { value: 'Mr. Jarding4', label: 'Mr. Jarding4' },
];

export const lists: CurriculumItem[] = [
  { name: 'mathica', label: 'Mathica' },
  { name: 'newton', label: 'Newton' },
];

export const initialStudents: Item[] = [
  { name: 'Nithil', selected: false },
  { name: 'Vivek', selected: false },
  { name: 'Nathan', selected: false },
  { name: 'Floyd', selected: false },
  { name: 'Cameron', selected: false },
  { name: 'Wade', selected: false },
  { name: 'Jacob', selected: false },
  { name: 'Calvin', selected: false },
];

export const initialTeachers: Item[] = [
  { name: 'Harold', selected: false },
  { name: 'Ronald', selected: false },
  { name: 'Jorge', selected: false },
  { name: 'Vivek', selected: false },
  { name: 'Brandon', selected: false },
  { name: 'Lee', selected: false },
  { name: 'Leslie', selected: false },
  { name: 'Soham', selected: false },
];

export const exoptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

export const sectionsdata = [
  {
    title: 'Video',
    items: [
      { name: 'Intro', selected: true },
      { name: "Don'ts", selected: false },
    ],
  },
  {
    title: 'Learn',
    items: [{ name: 'Intro', selected: true }],
  },
  {
    title: 'Test',
    items: [{ name: 'Intro', selected: true }],
  },
];

export const roleid: Record<Role, number> = {
  Admin: 1,
  Teacher: 3,
  Student: 4,
};

export const videoName: Record<number, string> = {
  1: 'Video',
  2: 'Learn',
  3: 'Test',
};
