import { raleway } from "@/app/ui/fonts";
import { clsx } from "clsx";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs text-2xl">
      <ul>
        {breadcrumbs.map((breadcrumb) => (
          <li key={breadcrumb.href} aria-current={breadcrumb.active}>
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
