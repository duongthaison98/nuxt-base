import { useToast } from '@/components/ui/toast/use-toast';

const { toast } = useToast();

export const useNotify = (title: string | any, varient: 'default' | 'destructive' | 'success' | 'info' | null) => {
  return toast({
    title: title,
    variant: varient,
    duration: 2000
  });
}