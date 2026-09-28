import { Skeleton, TableCell, TableRow } from "@mui/material";

import styles from "./ProductSkeleton.module.scss";

export const ProductSkeleton = () => {
  const rows = 5;

  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex} className={styles.row}>
          <TableCell>
            <Skeleton variant="text" width={40} />
          </TableCell>

          <TableCell>
            <div className={styles.product}>
              <Skeleton variant="rounded" width={48} height={48} />

              <div className={styles.productInfo}>
                <Skeleton variant="text" width={180} />

                <Skeleton variant="text" width={100} />
              </div>
            </div>
          </TableCell>

          <TableCell>
            <Skeleton variant="rounded" width={90} height={28} />
          </TableCell>

          <TableCell>
            <Skeleton variant="text" width={70} />
          </TableCell>

          <TableCell>
            <Skeleton variant="text" width={45} />
          </TableCell>

          <TableCell>
            <Skeleton variant="rounded" width={55} height={28} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
