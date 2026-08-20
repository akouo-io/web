/**
 * @akouo/ui — shared React component library.
 *
 * Components build on tokens from `@akouo/theme`, never the other way around
 * (theme ← ui ← apps).
 */
export const UI_PACKAGE = "@akouo/ui" as const;

export { cn } from "./cn";

export { Button } from "./Button";
export type { ButtonProps } from "./Button";

export { Input } from "./Input";
export type { InputProps } from "./Input";

export { Textarea } from "./Textarea";
export type { TextareaProps } from "./Textarea";

export { PasswordInput } from "./PasswordInput";
export type { PasswordInputProps } from "./PasswordInput";

export { Checkbox } from "./Checkbox";
export type { CheckboxProps } from "./Checkbox";

export { Radio } from "./Radio";
export type { RadioProps } from "./Radio";

export { Switch } from "./Switch";
export type { SwitchProps } from "./Switch";

export { Slider } from "./Slider";
export type { SliderProps } from "./Slider";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";

export { Label } from "./Label";
export type { LabelProps } from "./Label";

export { FormField } from "./FormField";
export type { FormFieldProps, FormFieldRenderProps } from "./FormField";

export { Select } from "./Select";
export type { SelectProps } from "./Select";

export { NumberInput } from "./NumberInput";
export type { NumberInputProps } from "./NumberInput";

export { InputGroup } from "./InputGroup";
export type { InputGroupProps } from "./InputGroup";

export { SearchInput } from "./SearchInput";
export type { SearchInputProps } from "./SearchInput";

export { TagInput } from "./TagInput";
export type { TagInputProps } from "./TagInput";

export { PinInput } from "./PinInput";
export type { PinInputProps } from "./PinInput";

export { FileUpload } from "./FileUpload";
export type { FileUploadProps } from "./FileUpload";
