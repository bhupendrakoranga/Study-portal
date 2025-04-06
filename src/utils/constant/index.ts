import { DataItem } from '@/types/global';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Role, roleid } from './Data';
import { useSearchParams, redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

type TreeNode = {
  id: number;
  title: string;
  children: TreeNode[];
  curriculum?: number;
};

export function notificationsLabel(count: number) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}

export const getImages = (isPlaying: boolean) => {
  return isPlaying ? 'pause.png' : 'circular_play.png';
};

export const playOrPauseVideo = (
  videoElement: HTMLVideoElement | null,
  isPlaying: boolean,
) => {
  if (videoElement) {
    if (isPlaying) {
      videoElement.play().catch((error) => {
        console.error('Error trying to play the video:', error);
      });
    } else {
      videoElement.pause();
    }
  }
};

export const createQueryString = (
  name: string,
  params: URLSearchParams,
  value: string | number,
): string => {
  const newparams = new URLSearchParams(params.toString());
  newparams.set(name, value.toString());
  return newparams.toString();
};

export const handleTabChange = (
  router: AppRouterInstance,
  paramsToRemove: string[],
) => {
  return () => {
    const params = new URLSearchParams(window.location.search);
    const params1 = Object.fromEntries(params.entries());

    // Remove the specified query parameters
    paramsToRemove.forEach(
      (param) => delete (params1 as Record<string, unknown>)[param],
    );

    const newParams = new URLSearchParams({ ...params1 });

    // Navigate to the new URL
    router.push(`?${newParams.toString()}`);
  };
};

export const getRoutes = (name: string) => {
  switch (name) {
    case 'Curriculam Builder':
      return '/admin/unitbuilder';
    case 'School Data Setter':
      return '/admin/add-student-teacher';
    default:
      break;
  }
};

export function getRoleId(role: Role): number {
  return roleid[role];
}

export const transformData = (data: any[]): DataItem[] => {
  const assignIds = (items: any[]): DataItem[] => {
    return items.map((item) => {
      const newItem: DataItem = {
        id: item.id,
        title:
          item.unit ||
          item.chapter ||
          item.subchapter ||
          item.topic ||
          item.subtopic,
        children: [],
        curriculum: '',
      };
      if (item.chapters) newItem.children = assignIds(item.chapters);
      if (item.subchapters) newItem.children = assignIds(item.subchapters);
      if (item.topics) newItem.children = assignIds(item.topics);
      if (item.subtopics) newItem.children = assignIds(item.subtopics);
      return newItem;
    });
  };

  return assignIds(data);
};
export const removeDuplicates = (arr: any[], key: string) => {
  const lookup = arr.reduce(
    (acc: { [x: string]: any }, item: { [x: string]: string | number }) => {
      if (!acc[item[key]]) {
        acc[item[key]] = item;
      }
      return acc;
    },
    {},
  );
  return Object.values(lookup);
};

export function findTopLevelParentId(
  data: TreeNode[],
  targetId: number | string,
): any {
  // Helper function to recursively search for the targetId and return the top-level parentId
  function searchChildren(node: TreeNode, parentId: number): number | null {
    if (node.id === targetId) {
      return parentId; // Return the top-level parent ID when targetId is found
    }
    for (const child of node.children) {
      const result = searchChildren(child, parentId);
      if (result !== null) {
        return result; // Propagate the found parentId up the recursion
      }
    }
    return null; // Return null if targetId is not found in this branch
  }

  for (const item of data) {
    const result = searchChildren(item, item.id);
    if (result !== null) {
      return result; // Return the found parentId
    }
  }

  return null; // Return null if targetId is not found in any top-level node
}

export const generateLabel = (data: {
  name: string;
}) => {
  return `${data?.name}`;
};

export const reGenerateLabel = (data: {
  curriculum_name: string, grade: any, subject_name: string
}) => {
  return `${data?.curriculum_name}, ${data?.grade}, ${data?.subject_name}`;
};

export const useQueryParamWithRedirect = (
  param: string,
  redirectTo: string,
) => {
  const searchParams = useSearchParams();
  const value = searchParams.get(param);

  if (!value) {
    redirect(redirectTo);
  }

  return value;
};

type OutputData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  grade_level: string;
};

export function generateData(input: any): OutputData {
  return {
    first_name: input.first_name,
    last_name: input.last_name,
    email: input.email,
    password: input.password,
    grade_level: input.grade_level
  };
}

export function cleanData(input: any): any {
  const cleanedData = { ...input };

  for (const key in cleanedData) {
    if (
      Array.isArray(cleanedData[key]) &&
      (cleanedData[key].length === 0 ||
        (cleanedData[key].length === 1 && cleanedData[key][0].trim() === ''))
    ) {
      delete cleanedData[key];
    }
  }

  return cleanedData;
}

export function addDetailToId(
  obj: any,
  targetId: number,
  key: string,
  title: string,
): any {
  // Helper function to deep copy an object
  function deepCopy(source: any): any {
    if (source === null || typeof source !== 'object') {
      return source;
    }

    // Create a new object or array depending on the source type
    const copy: any = Array.isArray(source) ? [] : {};

    for (const [key, value] of Object.entries(source)) {
      copy[key] = deepCopy(value); // Recursively copy properties
    }

    return copy;
  }

  // Helper function to update the object with details
  function updateObject(currentObj: any): boolean {
    // If the current object's id matches the targetId, add or update the details key
    if (currentObj.id === targetId) {
      // Initialize details object if it doesn't exist
      if (!currentObj.details) {
        currentObj.details = {
          Video: [],
          Learn: [],
          Test: [],
        };
      }

      // Initialize the key array if it does not exist
      if (!currentObj.details[key]) {
        currentObj.details[key] = [];
      }

      // Check if the title already exists to avoid duplication
      const existingTitles = currentObj.details[key].map(
        (item: any) => item.title,
      );
      if (!existingTitles.includes(title)) {
        // Add the detail to the array
        currentObj.details[key].push({
          title: title,
          id: uuidv4(), // Generates a random id
        });
      }

      return true; // Stop further searching
    }

    // If the current object has children, search recursively in each child
    if (Array.isArray(currentObj.children)) {
      for (const child of currentObj.children) {
        if (updateObject(child)) {
          return true; // Stop searching once the targetId is found and updated
        }
      }
    }

    return false; // Continue searching
  }

  // Make a deep copy of the object to avoid mutating the original
  const updatedObj = deepCopy(obj);

  // Update the copied object
  updateObject(updatedObj);

  return updatedObj;
}

export function findDetailsById(obj: any, targetId: number): any {
  if (obj?.id === targetId) {
    return obj.details || null;
  }

  if (Array.isArray(obj.children)) {
    for (const child of obj.children) {
      const result = findDetailsById(child, targetId);
      if (result) return result;
    }
  }

  return null;
}

export function convertDetailsToSectionsData(details: any): any[] {
  if (!details) return [];

  return Object.keys(details).map((key) => ({
    title: key,
    items: details[key].map((item: any) => ({
      name: item.title || 'Untitled',
      selected: true,
      id: item?.id,
      // Assuming all items should be selected by default
    })),
  }));
}
