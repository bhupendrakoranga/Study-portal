import { useRouter } from 'next/router'; // Import from next/router instead of next/navigation

const useNavigate = () => {
  const router = useRouter();

  const handleNavigation = (route: string, query?: Record<string, any>) => {
    const href = {
      pathname: `/student/dashboard/[${route}]`, // Use template literals to create a dynamic route
      query: query || {},
    };

    router.push(href); // Remove the extra argument
  };

  return { handleNavigation };
};

export default useNavigate;
