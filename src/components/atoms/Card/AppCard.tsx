import { Card, type CardProps } from "@mui/material";

export interface IAppCardProps extends CardProps {}

export const AppCard = ({ children, ...props }: IAppCardProps) => {
  return <Card {...props}>{children}</Card>;
};
