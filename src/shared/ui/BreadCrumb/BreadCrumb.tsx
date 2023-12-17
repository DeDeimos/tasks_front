// import React from "react";
// import { Breadcrumb as BootstrapBreadcrumb } from "react-bootstrap";

// interface BreadcrumbProps {
//   items: { text: string; href?: string; active?: boolean }[];
// }

// export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
//   return (
//     <BootstrapBreadcrumb>
//       {items.map((item, index) => (
//         <BootstrapBreadcrumb.Item
//           key={index}
//           href={item.href}
//           active={item.active}
//         >
//           {item.text}
//         </BootstrapBreadcrumb.Item>
//       ))}
//     </BootstrapBreadcrumb>
//   );
// };

import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  items: { text: string; href?: string; active?: boolean }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="breadcrumb">
      {items.map((item, index) => (
        <span key={index} className={item.active ? "active" : ""}>
          {item.href ? (
            <Link to={item.href}>{item.text}</Link>
          ) : (
            <span>{item.text}</span>
          )}
          {index < items.length - 1 && <span className="separator"> / </span>}
        </span>
      ))}
    </div>
  );
};

