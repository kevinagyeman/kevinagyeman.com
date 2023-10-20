type DividerProps = {
  title: string;
};

export default function Divider({ title }: DividerProps) {
  return (
    <div className="relative py-4">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          {title}
        </span>
      </div>
    </div>
  );
}
