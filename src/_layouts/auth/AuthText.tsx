import styled from '@emotion/styled';

const AuthText = ({
  isRegistering,
  handleAuth,
}: {
  isRegistering: boolean;
  handleAuth: () => void;
}) => {
  return (
    <Text>
      {isRegistering ? 'Already have an account?' : "Don't have an account?"}
      <Span isRegistering={isRegistering} onClick={handleAuth}>
        {isRegistering ? 'Login' : 'Register'}
      </Span>
    </Text>
  );
};
export default AuthText;

const Text = styled.div`
  font-size: 14px;
  text-align: center;
  padding-bottom: 10px;
  margin-top: -10px;
`;

const Span = styled.span`
  color: ${({ isRegistering }: { isRegistering: boolean }) =>
    isRegistering ? 'green' : 'blue'};
  cursor: pointer;
  margin-left: 2px;
  &:hover {
    text-decoration: underline;
  }
`;
