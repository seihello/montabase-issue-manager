type Props = {
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
};
export default function SidebarResizeHandle({ width, setWidth }: Props) {
  // const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    document.body.style.cursor = "ew-resize";

    const startX = e.clientX;
    const startWidth = width;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      setWidth(startWidth + e.clientX - startX);
    };

    const handleMouseUp = () => {
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="absolute right-0 top-0 h-full w-1 cursor-ew-resize"
      onMouseDown={handleMouseDown}
    ></div>
  );
}
