/**
 * Button Component
 *
 * This component renders a customizable button.
 *
 * Props:
 * - `children`: React.ReactNode - The content to be displayed inside the button.
 * - `iconOnly`: boolean (optional) - If true, the button will be styled specifically for icons.
 * - `beforeContent`: React.ReactNode (optional) - Content to render before the main children.
 * - `afterContent`: React.ReactNode (optional) - Content to render after the main children.
 * - `size`: "sm" | "md" | "lg" (optional) - The size of the button. Can be 'sm', 'md', or 'lg'.
 * - `active`: boolean (optional) - If true, applies an 'active' style to the button.
 * - `variant`: "primary" | "secondary" (optional) - The style variant of the button. Defaults to 'primary'.
 * - `color`: "primary" | "success" | "info" | "warning" | "error" (optional) - The color theme of the button. Defaults to 'primary'.
 * - `className`: string (optional) - Additional custom class names to apply to the button.
 *
 * The button's class names are dynamically generated based on its props to apply various predefined styles and conditions.
 *
 * Usage:
 * - Import the `Button` component and use it in your project.
 * - Pass in the `children`, `iconOnly`, `beforeContent`, `afterContent`, `size`, `active`, `disabled`, `variant`, and `color` props as needed.
 */

type ButtonProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "info" | "warning" | "error";
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  className = "",
  size,
  color,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const btnSize: string =
    size === "sm"
      ? "w-20 p-2 text-sm"
      : size === "md"
        ? "w-40 p-2"
        : size === "lg"
          ? "w-80"
          : "w-full p-2";

  const btnColor: string =
    color === "primary"
      ? "bg-primary hover:bg-primary-darker text-white"
      : "bg-red-500 text-white";

  return (
    <button
      className={`flex-center gap-2 rounded-lg transition-colors duration-300 ${btnColor} ${btnSize} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
