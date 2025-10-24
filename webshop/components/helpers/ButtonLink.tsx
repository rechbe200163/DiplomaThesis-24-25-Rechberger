import Link from 'next/link';
import { Button } from '../ui/button';

export const ButtonLink = ({
  href,
  disabled,
  children,
}: {
  href: string;
  disabled?: boolean;
  children: React.ReactNode;
}) => {
  if (disabled) {
    return (
      <Button aria-disabled='true' disabled>
        {children}
      </Button>
    );
  }

  return (
    <Link href={href} passHref>
      <Button>{children}</Button>
    </Link>
  );
};
