function FormItem({
  id,
  className = "",
  label,
  children,
}: {
  id?: string;
  className?: string;
  label: string;
  children?: any;
}) {
  return (
    <div className={"flex my-1 h-[2.5em] items-center" + className} id={id}>
      <p className="w-[15em] font-semibold">{label}</p>
      <div className="w-[15em]">{children}</div>
    </div>
  );
}

export default FormItem;
