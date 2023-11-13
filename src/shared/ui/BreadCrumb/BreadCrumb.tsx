import React from "react";
import { Breadcrumb as BootstrapBreadcrumb } from "react-bootstrap";

interface BreadcrumbProps {
  items: { text: string; href?: string; active?: boolean }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <BootstrapBreadcrumb>
      {items.map((item, index) => (
        <BootstrapBreadcrumb.Item
          key={index}
          href={item.href}
          active={item.active}
        >
          {item.text}
        </BootstrapBreadcrumb.Item>
      ))}
    </BootstrapBreadcrumb>
  );
};