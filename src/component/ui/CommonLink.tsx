import styled from '@emotion/styled';
import Link from 'next/link';

interface LinkProps {
  href?: string;
  query?: { [key: string]: string };
  children: React.ReactNode;
  onclick?: () => void;
}

const CommonLink: React.FC<LinkProps> = ({
  href,
  query,
  children,
  onclick,
}) => {
  return href ? (
    <StyledLink
      href={{
        pathname: href,
        query,
      }}
    >
      {children}
    </StyledLink>
  ) : (
    <div onClick={onclick}>{children}</div>
  );
};

export default CommonLink;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
