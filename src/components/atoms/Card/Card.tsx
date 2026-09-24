import { Card as MuiCard, type CardProps } from "@mui/material";

export type TAppCardProps = CardProps 

export const Card = ({ children, ...props }: TAppCardProps) => (
  <MuiCard {...props}>{children}</MuiCard>
);
