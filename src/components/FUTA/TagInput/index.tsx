import React from "react";
import { Tag, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface Props {
  defaultTags: string[];
  onChange: (tags: string[]) => void;
  color?: string;
}

export const TagInput: React.FC<Props> = ({ defaultTags, color, onChange }) => {
  const [tags, setTags] = React.useState(defaultTags);
  const [inputValue, setInputValue] = React.useState<string>();
  const [inputVisible, setInputVisible] = React.useState<boolean>(false);
  const input = React.useRef<HTMLInputElement>();

  const showInput = () => {
    setInputVisible(true);
  };

  React.useEffect(() => {
    if (inputVisible) {
      input.current.focus();
    }
  }, [inputVisible]);

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      const arr = [...tags, inputValue];
      setTags(arr);
      onChange(arr);
    }
    setInputValue("");
    setInputVisible(false);
  };

  const handleClose = removedTag => {
    const arr = tags.filter(tag => tag !== removedTag);
    setTags(arr);
    onChange(arr);
  };

  return (
    <>
      {tags.map((tag) => {
        const tagElem = (
          <Tag
            color={color}
            style={{ marginBottom: 8 }}
            key={tag}
            closable={true}
            onClose={() => handleClose(tag)}
          >
            <span>{tag}</span>
          </Tag>
        );

        return tagElem;
      })}

      {inputVisible && (
        <Input
          style={{
            width: 78,
            marginRight: 8,
            verticalAlign: "top",
          }}
          ref={input as any}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}

      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> Cái mới
        </Tag>
      )}
    </>
  )
}
