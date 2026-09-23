import { Card as MuiCard, type CardProps } from "@mui/material";

export interface IAppCardProps extends CardProps {}

export const Card = ({ children, ...props }: IAppCardProps) => (
  <MuiCard {...props}>{children}</MuiCard>
);
