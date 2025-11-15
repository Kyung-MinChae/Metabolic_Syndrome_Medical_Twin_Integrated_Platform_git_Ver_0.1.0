import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess } from "@/utils/toast";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "이름은 2자 이상이어야 합니다." }),
  organization: z.string().min(2, { message: "기관명은 2자 이상이어야 합니다." }),
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  message: z.string().min(10, { message: "메시지는 10자 이상이어야 합니다." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      organization: "",
      email: "",
      message: "",
    },
  });

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = form;

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    console.log("Form submitted:", data);
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    showSuccess("문의가 성공적으로 제출되었습니다.");
    reset();
  };

  const getError = (field: keyof ContactFormValues) => errors[field]?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">이름</Label>
          <Input id="name" {...register("name")} className={cn(getError('name') && "border-destructive")} />
          {getError('name') && <p className="text-sm text-destructive mt-1">{getError('name')}</p>}
        </div>
        <div>
          <Label htmlFor="organization">기관</Label>
          <Input id="organization" {...register("organization")} className={cn(getError('organization') && "border-destructive")} />
          {getError('organization') && <p className="text-sm text-destructive mt-1">{getError('organization')}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="email">이메일</Label>
        <Input id="email" type="email" {...register("email")} className={cn(getError('email') && "border-destructive")} />
        {getError('email') && <p className="text-sm text-destructive mt-1">{getError('email')}</p>}
      </div>
      <div>
        <Label htmlFor="message">메시지</Label>
        <Textarea id="message" {...register("message")} className={cn(getError('message') && "border-destructive")} />
        {getError('message') && <p className="text-sm text-destructive mt-1">{getError('message')}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "제출 중..." : "제출"}
      </Button>
    </form>
  );
}