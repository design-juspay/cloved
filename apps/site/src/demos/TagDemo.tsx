import { Tag, TagColor } from "blend-v1";
import { Hash } from "lucide-react";

const TagDemo = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-wrap gap-2 w-full">
        <Tag
          text="Neutral"
          color={TagColor.NEUTRAL}
          leftSlot={<Hash size={12} />}
        />
        <Tag
          text="Primary"
          color={TagColor.PRIMARY}
          leftSlot={<Hash size={12} />}
        />
        <Tag
          text="Purple"
          color={TagColor.PURPLE}
          leftSlot={<Hash size={12} />}
        />
        <Tag
          text="Green"
          color={TagColor.SUCCESS}
          leftSlot={<Hash size={12} />}
        />
        <Tag text="Red" color={TagColor.ERROR} leftSlot={<Hash size={12} />} />
      </div>
    </div>
  );
};

export default TagDemo;
