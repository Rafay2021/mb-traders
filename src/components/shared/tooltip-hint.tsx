import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type TooltipHintProps = {
  children: React.ReactElement;
  label: string;
};

export function TooltipHint({ children, label }: TooltipHintProps) {
  return (
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
