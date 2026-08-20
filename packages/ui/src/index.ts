/**
 * @akouo/ui — shared React component library.
 *
 * Components build on tokens from `@akouo/theme`, never the other way around
 * (theme ← ui ← apps).
 */
export const UI_PACKAGE = "@akouo/ui" as const;

export { cn } from "./lib/cn";

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

export { Autocomplete } from "./Autocomplete";
export type { AutocompleteProps, AutocompleteOption } from "./Autocomplete";

export { Calendar } from "./Calendar";
export type { CalendarProps } from "./Calendar";

export { DatePicker } from "./DatePicker";
export type { DatePickerProps } from "./DatePicker";

export { TimePicker } from "./TimePicker";
export type { TimePickerProps } from "./TimePicker";

// Actions & navigation
export { IconButton } from "./IconButton";
export type { IconButtonProps } from "./IconButton";

export { ButtonGroup } from "./ButtonGroup";
export type { ButtonGroupProps } from "./ButtonGroup";

export { Link } from "./Link";
export type { LinkProps } from "./Link";

export { ToggleButton, ToggleGroup, ToggleGroupItem } from "./Toggle";
export type { ToggleButtonProps, ToggleGroupItemProps } from "./Toggle";

export { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";
export type { TabsProps } from "./Tabs";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./Breadcrumb";

export { Pagination } from "./Pagination";
export type { PaginationProps } from "./Pagination";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./DropdownMenu";

export { CommandPalette } from "./CommandPalette";
export type { CommandPaletteProps, Command } from "./CommandPalette";

export {
  Sidebar,
  SidebarSection,
  SidebarItem,
  NavRail,
  NavRailItem,
} from "./Sidebar";
export type {
  SidebarItemProps,
  NavRailItemProps,
} from "./Sidebar";

// Feedback & status
export { Alert, AlertTitle, AlertDescription } from "./Alert";
export type { AlertProps } from "./Alert";

export { ToastProvider, useToast } from "./Toast";
export type { ToastOptions } from "./Toast";

export { Badge } from "./Badge";
export type { BadgeProps } from "./Badge";

export { Spinner } from "./Spinner";
export type { SpinnerProps } from "./Spinner";

export { ProgressBar } from "./ProgressBar";
export type { ProgressBarProps } from "./ProgressBar";

export { Skeleton } from "./Skeleton";
export type { SkeletonProps } from "./Skeleton";

export { RecordingIndicator } from "./RecordingIndicator";
export type { RecordingIndicatorProps } from "./RecordingIndicator";

export { EmptyState } from "./EmptyState";
export type { EmptyStateProps } from "./EmptyState";

// Overlays
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogBody,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./Dialog";
export type { DialogProps } from "./Dialog";

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./Drawer";
export type { DrawerProps } from "./Drawer";

export { ConfirmDialog } from "./ConfirmDialog";
export type { ConfirmDialogProps } from "./ConfirmDialog";

export { Popover, PopoverTrigger, PopoverContent } from "./Popover";

export { Tooltip } from "./Tooltip";
export type { TooltipProps } from "./Tooltip";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "./ContextMenu";

export { HoverCard, HoverCardTrigger, HoverCardContent } from "./HoverCard";

// Layout & structure
export { Container } from "./Container";
export type { ContainerProps } from "./Container";

export { Stack } from "./Stack";
export type { StackProps } from "./Stack";

export { Grid } from "./Grid";
export type { GridProps } from "./Grid";

export { Separator } from "./Separator";
export type { SeparatorProps } from "./Separator";

export { ScrollArea } from "./ScrollArea";
export type { ScrollAreaProps } from "./ScrollArea";

export { AspectRatio } from "./AspectRatio";
export type { AspectRatioProps } from "./AspectRatio";

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./Collapsible";
export type { CollapsibleProps } from "./Collapsible";

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";
export type { AccordionProps } from "./Accordion";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./Table";

// Data display & typography
export { Avatar, AvatarGroup } from "./Avatar";
export type { AvatarProps, AvatarGroupProps } from "./Avatar";

export { Heading } from "./Heading";
export type { HeadingProps } from "./Heading";

export { Text } from "./Text";
export type { TextProps } from "./Text";

export { Prose } from "./Prose";
export type { ProseProps } from "./Prose";

export { Kbd } from "./Kbd";
export type { KbdProps } from "./Kbd";

export { Code, CodeBlock } from "./Code";
export type { CodeProps, CodeBlockProps } from "./Code";

export { List, ListItem } from "./List";
export type { ListProps, ListItemProps } from "./List";

export { Stat } from "./Stat";
export type { StatProps } from "./Stat";
