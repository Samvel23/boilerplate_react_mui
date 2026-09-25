import { TableCell, TableRow, Skeleton } from "@mui/material";

export const ProductSkeleton = () => {
  const count = 6;
  return (
    <>
      <TableRow>
        {[...Array(count)].map(() => (
          <TableCell>
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={210}
              height={60}
            />
          </TableCell>
        ))}
      </TableRow>
    </>
  );
};
